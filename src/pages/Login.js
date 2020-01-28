import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import * as GoogleSignIn from 'expo-google-sign-in';

import DefaultButton from '../components/DefaultButton';
import DefaultInput from '../components/DefaultInput';

import { login } from '../services/auth';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        console.log(username, password)
        setUsername('');
        setPassword('');

        navigation.navigate('Main')
    }

    async function syncUser() {
        const user = await GoogleSignIn.signInSilentlyAsync();
        await login(user);
        navigation.navigate('Main')
    };

    async function signOut() {
        await GoogleSignIn.signOutAsync();
        //set user state to null
    }

    async function signIn() {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                syncUser();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    useEffect(() => {
        async function init() {
            await GoogleSignIn.initAsync({
                clientId: '1074835362322-ae15qqvujadevvc45ldf400cb3csukj1.apps.googleusercontent.com'
            });

            _syncUserWithState();
        }

        async function _syncUserWithState() {
            const user = await GoogleSignIn.signInSilentlyAsync();
            await login(user);
            navigation.navigate('Main')
        };

        init();
    }, []);

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} style={styles.container}>
            <View style={styles.loginForm}>
                <DefaultInput
                    placeholder="Seu usuário"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={username}
                    setValue={setUsername}
                />
                <DefaultInput
                    placeholder="Sua senha"
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={password}
                    setValue={setPassword}
                />
                <DefaultButton text="Entrar" onPress={handleLogin} />
                <DefaultButton text="Entrar Google" onPress={signIn} style={{ marginTop: 20 }} />
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