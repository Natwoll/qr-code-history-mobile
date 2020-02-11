import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

import { select, insert } from '../services/api'

export default function RegisterMachine() {

    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState('');
    const [kind, setKind] = useState('');
    const [model, setModel] = useState('');
    const [identifier, setIdentifier] = useState('');

    async function handleRegister() {
        const FbDocReferenceSerialMachines = 'serial/machines';

        const { initials, times } = await select(FbDocReferenceSerialMachines);
        const FbDocReferenceMachines = `machines/${initials + times}`;
        
        insert(FbDocReferenceMachines, {
            brand,
            capacity,
            category,
            identifier,
            kind,
            model
        });

        insert(FbDocReferenceSerialMachines , {
            initials,
            times: times + 1,
        });

    }

    return (
        <View style={styles.container}>
            <View style={styles.registerForm}>
                <DefaultInput
                    placeholder="Marca"
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={brand}
                    setValue={setBrand}
                />
                <DefaultInput
                    placeholder="Categoria"
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={category}
                    setValue={setCategory}
                />
                <DefaultInput
                    placeholder="Capacidade"
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={capacity}
                    setValue={setCapacity}
                />
                <DefaultInput
                    placeholder="Tipo"
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={kind}
                    setValue={setKind}
                />
                <DefaultInput
                    placeholder="Modelo"
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={model}
                    setValue={setModel}
                />
                <DefaultInput
                    placeholder="Identificador"
                    autoCapitalize='words'
                    autoCorrect={true}
                    value={identifier}
                    setValue={setIdentifier}
                />
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
    }

});