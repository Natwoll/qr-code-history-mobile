import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

//Marca, Categoria, Capacidade, Tipo, Modelo

export default function RegisterMachine() {

    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState('');
    const [type, setType] = useState('');
    const [model, setModel] = useState('');

    function handleRegister() {

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
                    value={type}
                    setValue={setType}
                />
                <DefaultInput
                    placeholder="Modelo"
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={model}
                    setValue={setModel}
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