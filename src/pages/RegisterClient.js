import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Picker } from 'react-native';

import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

export default function RegisterClient({ navigation }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [machine, setMachine] = useState(0);

    function handleRegister() {
        console.log(name, address, number, complement, machine)
        const value = 'ksjkdsjf31la19djaksjd1092039123';

        navigation.navigate('QrCode', { value })
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

                <Picker 
                    selectedValue={machine}
                    onValueChange={value => setMachine(value)}
                    style={styles.dropdown}
                    itemStyle={styles.dropdownItem}
                >
                    <Picker.Item label="Selecione uma Maquina" value={0}/>
                    <Picker.Item label="Maquina 1" value={1}/>
                    <Picker.Item label="Maquina 2" value={2}/>
                </Picker>

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

    dropdown: {
        marginBottom: 50,
        width: '100%',
        backgroundColor: '#fff',
    },
})
