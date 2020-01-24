import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function DefaultInput(
    { style, placeholder, keyboardType, autoCapitalize, autoCorrect, value, setValue, secureTextEntry = false, multiline = false, numberOfLines = 4 }
) {
    return <TextInput
        style={[styles.input, multiline ? styles.textArea : styles.height, style]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={setValue}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
    />
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
    },

    height: {
        height: 50,
    },

    textArea: {
        padding: 20,
    }
})