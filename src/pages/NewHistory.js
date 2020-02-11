import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Picker, Text } from 'react-native';

import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

import { select, insert, getAll } from '../services/api';
import getFormatedDate from '../utils/getFormatedDate';

export default function NewHistory({ navigation }) {

    const [qrCode, setQrCode] = useState({});
    const [hasHistory, setHasHistory] = useState(false);
    const [history, setHistory] = useState('');
    const [clients, setClients] = useState([]);
    const [machines, setMachines] = useState([]);
    const [client, setClient] = useState(0);
    const [machine, setMachine] = useState(0);
    const [location, setLocation] = useState('');

    async function handleSave() {
        const historyLocation = `${qrCode.machine}/history`;

        const { date, times } = await select(`${historyLocation}/serial`);

        insert(`${historyLocation}/${getFormatedDate()}-${times}`, {
            content: history,
            date: getFormatedDate(),
        });

        insert(`${historyLocation}/serial`, {
            date: getFormatedDate(),
            times: times + 1,
        });
    }

    function handleSaveNewHistory() {
        const clientLocationData = `clients/${client}`;

        const machineIdentifier = machines.filter(machineDoc => machineDoc.id === machine)[0].data.identifier;

        const machineLocationData = `clients/${client}/machinesOwned/${machineIdentifier}`;

        setQrCode(oldQrCode => ({ ...oldQrCode, client: clientLocationData, machine: machineLocationData }));

        insert(machineLocationData, {
            location,
        });

        insert(`${machineLocationData}/history/serial`, {
            date: getFormatedDate(),
            times: 1,
        })

        insert(`qrcodes/${qrCode.id}`, {
            client: clientLocationData,
            machine: machineLocationData,
        });

        setHasHistory(true);
    }

    useEffect(() => {
        async function loadQrCodeData() {
            const qrCodeData = navigation.getParam('qrCodeData');

            const { client, machine } = await select(`qrcodes/${qrCodeData}`);

            if (!client && !machine) {
                setHasHistory(false);
                loadData();
            }
            else {
                setHasHistory(true);
                setQrCode(oldQrCode => ({ ...oldQrCode, id: qrCodeData, client, machine }));
            }

        }

        async function loadData() {
            const clientsData = await getAll('clients');
            const machinesData = await getAll('machines');

            setClients(clientsData);
            setMachines(machinesData);
        }

        loadQrCodeData();
    }, []);

    return (
        <View style={styles.container}>
            {
                hasHistory ? (
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
                                        <Picker.Item label={client.data.name} value={client.id} />
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
                                        <Picker.Item label={machine.data.identifier} value={machine.id} />
                                    ))
                                }
                            </Picker>
                            {
                                machine !== 0 && <DefaultInput
                                    placeholder="Local de Instalação"
                                    autoCapitalize='words'
                                    autoCorrect={false}
                                    style={{ marginBottom: 20 }}
                                    value={location}
                                    setValue={setLocation}
                                />
                            }
                            {
                                client !== 0 && machine !== 0 && <DefaultButton text="Salvar" onPress={handleSaveNewHistory} />
                            }
                        </>
                    )
            }


        </View>
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
    }
});