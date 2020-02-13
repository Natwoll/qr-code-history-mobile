import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { View, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';

import DefaultButton from '../components/DefaultButton';
import DefaultInput from '../components/DefaultInput';

import { login, logout, isAuthenticated } from '../services/auth';

import { select } from '../services/api';

export default function Login({ navigation }) {

    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (password) {
            const { key } = await select('auth/admin');

            if (key === password)
                await login(key);
            else {
                Alert.alert('Senha incorreta.', 'A senha de administrador está incorreta!');
                setPassword('');
                return;
            }
        }

        navigation.navigate('Main');
    }

    useFocusEffect(
        useCallback(() => {
            async function onFocus() {
                await logout();
            }

            onFocus();

            return () => {
                setPassword('');
            }
        }, [])
    );
    

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={useHeaderHeight() + 20}>
            <View style={styles.loginForm}>
                <DefaultInput
                    placeholder="Senha do administrador"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                    autoCorrect={false}
                />
                <DefaultButton text="Entrar" onPress={handleLogin} />
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

    loginForm: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },
});