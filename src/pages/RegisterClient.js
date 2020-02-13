import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, StyleSheet, Alert } from 'react-native';

import { useHeaderHeight } from '@react-navigation/stack';

import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

import { select, insert } from '../services/api'

export default function RegisterClient({ navigation }) {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [contact, setContact] = useState('');

    async function handleRegister() {
        const FbDocReferenceSerialClients = 'serial/clients';

        const { initials, times } = await select(FbDocReferenceSerialClients);
        const FbDocReferenceClients = `clients/${initials + times}`;

        insert(FbDocReferenceClients, {
            name,
            street,
            number,
            contact,
        });

        insert(FbDocReferenceSerialClients, {
            initials,
            times: times + 1,
        });

        Alert.alert('Cliente cadastrado com sucesso!');

        setName('');
        setStreet('');
        setNumber('');
        setContact('');

        navigation.navigate('Main');
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={useHeaderHeight() + 20}>
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
                    placeholder="Contato"
                    autoCapitalize='words'
                    autoCorrect={true}
                    value={contact}
                    setValue={setContact}

                />

                <View style={styles.inputGroup}>
                    <DefaultInput
                        placeholder="Rua"
                        autoCapitalize='words'
                        autoCorrect={true}
                        value={street}
                        setValue={setStreet}
                        style={{ width: '67%' }}
                    />
                    <DefaultInput
                        placeholder="Número"
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        value={number}
                        setValue={setNumber}
                        style={{ width: '28%' }}
                    />

                </View>

                <DefaultButton text="Cadastrar" onPress={handleRegister} />
            </View>
        </KeyboardAvoidingView>
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
