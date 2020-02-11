import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

import { select, insert } from '../services/api'

export default function RegisterClient({ navigation }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [machine, setMachine] = useState(0);

    async function handleRegister() {
        const FbDocReferenceSerialClients = 'serial/clients';

        const { initials, times } = await select(FbDocReferenceSerialClients);
        const FbDocReferenceClients = `clients/${initials + times}`;
        
        insert(FbDocReferenceClients, {
            name,
            address,
            complement,
        });

        insert(FbDocReferenceSerialClients , {
            initials,
            times: times + 1,
        });

        navigation.navigate('QrCode', { value: 123 })
    }

    useEffect(() => {
        async function loadMachines() {
            //search from api all machines
        }

        loadMachines();
    })

    return (
        <View style={styles.container}>
            <View style={styles.registerForm}>
                <DefaultInput
                    placeholder="Nome"
                    autoCapitalize='words'
                    autoCorrect={true}
                    value={name}
                    setValue={setName}
                    style={{ marginTop: 20 }}
                />
                <DefaultInput
                    placeholder="Endereço"
                    autoCapitalize='words'
                    autoCorrect={true}
                    value={address}
                    setValue={setAddress}
                />
                <View style={styles.inputGroup}>
                    <DefaultInput
                        placeholder="Número"
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        value={number}
                        setValue={setNumber}
                        style={{ width: '28%' }}
                    />
                    <DefaultInput
                        placeholder="Complemento"
                        autoCapitalize='words'
                        autoCorrect={true}
                        value={complement}
                        setValue={setComplement}
                        style={{ width: '67%' }}
                    />
                </View>

                <DefaultButton text="Cadastrar" onPress={handleRegister} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    registerForm: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
