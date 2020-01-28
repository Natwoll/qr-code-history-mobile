import React, { useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import * as GoogleSignIn from 'expo-google-sign-in';

import DefaultButton from '../components/DefaultButton';

import { login } from '../services/auth';

export default function Login({ navigation }) {

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
                <DefaultButton text="Entrar Google" onPress={signIn} />
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