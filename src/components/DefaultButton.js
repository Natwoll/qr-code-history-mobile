import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function DefaultButton({ onPress, text, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} activeOpacity={.7} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2ff595',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});