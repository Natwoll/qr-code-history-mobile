import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

export default function NewHistory() {

    const [history, setHistory] = useState('');

    function handleSave() {
        console.log(history)
    }

    return (
        <View style={styles.container}>
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
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});