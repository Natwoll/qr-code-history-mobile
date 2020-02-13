import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Picker, Text, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';

import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

import AnimatedLoader from "react-native-animated-loader";

import { isAuthenticated } from '../services/auth';
import { select, insert, getAll } from '../services/api';
import getFormatedDate from '../utils/getFormatedDate';

export default function NewHistory() {

    const [hasAdminPermission, setHasAdminPermission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qrCode, setQrCode] = useState({});
    const [hasHistory, setHasHistory] = useState(false);
    const [history, setHistory] = useState('');
    const [clients, setClients] = useState([]);
    const [machines, setMachines] = useState([]);
    const [client, setClient] = useState(0);
    const [machine, setMachine] = useState(0);
    const [location, setLocation] = useState('');
    const [observation, setObservation] = useState('');

    const [historyClient, setHistoryClient] = useState({});
    const [historyMachine, setHistoryMachine] = useState({});
    const [histories, setHistories] = useState([]);

    const route = useRoute();

    async function handleSave() {
        const historyLocation = `${qrCode.machine}/history`;

        const { times } = await select(`${historyLocation}/serial`);

        const historyId = `${getFormatedDate()}-${times}`
        const historyContent = {
            content: history,
            date: getFormatedDate(),
        };

        insert(`${historyLocation}/${historyId}`, historyContent);

        insert(`${historyLocation}/serial`, {
            date: getFormatedDate(),
            times: times + 1,
        });

        setHistories([...histories, { id: historyId, data: historyContent }]);
        setHistory('');

        Alert.alert('Histórico salvo com sucesso!');
    }

    async function handleSaveNewHistory() {
        const clientLocationData = `clients/${client}`;

        const machinesOwnedLocationData = `clients/${client}/machinesOwned/${machine}-${(Math.random() * 10000).toPrecision(4)}`;

        insert(machinesOwnedLocationData, {
            location,
            observation
        })

        setQrCode(oldQrCode => ({ ...oldQrCode, client: clientLocationData, machine: machinesOwnedLocationData }));

        insert(`${machinesOwnedLocationData}/history/serial`, {
            date: '',
            times: 0,
        })

        insert(`qrcodes/${qrCode.id}`, {
            client: clientLocationData,
            machine: machinesOwnedLocationData,
        });

        const machineSplit = machinesOwnedLocationData.split('/');
        const machineId = machineSplit[machineSplit.length - 1].split('-')[0];

        let machineData = await select(`machines/${machineId}`);
        const clientData = await select(clientLocationData);

        machineData = { ...machineData, location, observation };

        setHistoryMachine(machineData);
        setHistoryClient(clientData);

        setHasHistory(true);
        Alert.alert('Novo QrCode cadastrado e vinculado!');
    }

    useEffect(() => {
        async function loadQrCodeData() {
            const { qrCodeData } = route.params;

            const { client, machine } = await select(`qrcodes/${qrCodeData}`);

            if (!client && !machine) {
                if(!hasAdminPermission){
                    setLoading(false);
                    return;
                }
                setHasHistory(false);
                setQrCode(oldQrCode => ({ ...oldQrCode, id: qrCodeData }));
                loadData();
            }
            else {
                setHasHistory(true);
                setQrCode(oldQrCode => ({ ...oldQrCode, id: qrCodeData, client, machine }));
                loadHistoryData(client, machine);
            }
        }

        async function loadData() {
            setLoading(true);
            const clientsData = await getAll('clients');
            const machinesData = await getAll('machines');

            setClients(clientsData);
            setMachines(machinesData);
            setLoading(false);
        }

        async function loadHistoryData(client, machine) {
            setLoading(true);
            const clientData = await select(client);
            const historyData = (await getAll(`${machine}/history`)).filter(item => item.id !== 'serial');
            const { location, observation } = await select(machine);

            const machineSplit = machine.split('/');
            const machineId = machineSplit[machineSplit.length - 1].split('-')[0];

            let machineDocument = await select(`machines/${machineId}`);

            machineDocument = { ...machineDocument, location, observation };

            setHistoryClient(clientData);
            setHistoryMachine(machineDocument);
            setHistories(historyData);
            setLoading(false);
        }

        loadQrCodeData();

    }, [hasAdminPermission]);

    useEffect(() => {
        async function loadAdminPermissions() {
            const has = await isAuthenticated();

            setHasAdminPermission(has);
        }

        loadAdminPermissions();
    }, [])

    if (loading)
        return (
            <AnimatedLoader
                visible={loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../assets/default-loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            />
        )

    if (!hasAdminPermission && histories.length <= 0)
        return (
            <>
                <Text>O histórico desta máquina ainda não foi cadastrado =/</Text>
                <Text>Assim que o instalador registrar algo, será possível visualizar através do QrCode!</Text>
            </>
        )

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={useHeaderHeight() + 20}>
            {
                hasHistory ? (
                    <>
                        <ScrollView>
                            <Text style={styles.headerText}>Cliente</Text>
                            <View style={styles.dataContainer}>
                                <Text style={styles.mainText}>{historyClient.name}</Text>

                                <Text>Contato: {historyClient.contact}</Text>
                                <Text>Rua: {historyClient.street}</Text>
                                <Text>Número: {historyClient.number}</Text>
                            </View>

                            <Text style={styles.headerText}>Máquina</Text>
                            <View style={styles.dataContainer}>
                                <Text style={styles.mainText}>{historyMachine.identifier}</Text>

                                <Text>Marca: {historyMachine.brand}</Text>
                                <Text>Categoria: {historyMachine.category}</Text>
                                <Text>Capacidade: {historyMachine.capacity}</Text>
                                <Text>Tipo: {historyMachine.kind}</Text>
                                <Text>Modelo: {historyMachine.model}</Text>
                                <Text>Local Instalado: {historyMachine.location}</Text>
                                <Text>Observações: {historyMachine.observation}</Text>
                            </View>

                            <Text style={styles.headerText}>Histórico</Text>
                            <View style={styles.dataContainer}>
                                {
                                    histories.map(history => (
                                        <View key={history.id}>
                                            <Text style={styles.mainText}>{history.data.date}</Text>

                                            <Text>{history.data.content}</Text>
                                        </View>
                                    ))
                                }

                            </View>
                        </ScrollView>
                        {
                            hasAdminPermission && (
                                <>
                                    <DefaultInput
                                        placeholder="Detalhes do histórico"
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        multiline={true}
                                        style={{ marginTop: 20 }}
                                        value={history}
                                        setValue={setHistory}
                                    />
                                    <DefaultButton text="Salvar" onPress={handleSave} />
                                </>
                            )
                        }        
                    </>
                ) : (
                        <>
                            <Text style={styles.text}>Novo QrCode Escaneado!</Text>
                            <Text style={styles.text}>Preencha as Informações para cadastrar um novo histórico!</Text>
                            <Picker
                                style={styles.dropdown}
                                selectedValue={client}
                                onValueChange={value => setClient(value)}
                            >
                                <Picker.Item label="Selecione um Cliente" value={0} />
                                {
                                    clients.map(client => (
                                        <Picker.Item key={client.id} label={client.data.name} value={client.id} />
                                    ))
                                }
                            </Picker>

                            <Picker
                                style={styles.dropdown}
                                selectedValue={machine}
                                onValueChange={value => setMachine(value)}
                            >
                                <Picker.Item label="Selecione uma Maquina" value={0} />
                                {
                                    machines.map(machine => (
                                        <Picker.Item key={machine.id} label={machine.data.identifier} value={machine.id} />
                                    ))
                                }
                            </Picker>
                            {
                                machine !== 0 && (
                                    <>
                                        <DefaultInput
                                            placeholder="Local de Instalação"
                                            autoCapitalize='words'
                                            autoCorrect={false}
                                            style={{ marginBottom: 20 }}
                                            value={location}
                                            setValue={setLocation}
                                        />
                                        <DefaultInput
                                            placeholder="Obervação"
                                            autoCapitalize='none'
                                            autoCorrect={true}
                                            style={{ marginBottom: 20 }}
                                            value={observation}
                                            setValue={setObservation}
                                        />
                                    </>
                                )
                            }
                            {
                                client !== 0 && machine !== 0 && <DefaultButton text="Salvar" onPress={handleSaveNewHistory} />
                            }
                        </>
                    )
            }
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    dropdown: {
        marginBottom: 50,
        width: '100%',
        backgroundColor: '#fff',
    },

    text: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 15
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#2ff595',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    dataContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderTopColor: '#eee',
        borderColor: '#2ff595',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },

    mainText: {
        fontSize: 18,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },

    lottie: {
        width: 100,
        height: 100
    }
});