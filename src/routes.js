import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Main from './pages/Main';
import NewHistory from './pages/NewHistory';
import RegisterMachine from './pages/RegisterMachine';
import RegisterClient from './pages/RegisterClient';
import QrCode from './pages/QrCode';

export default function Routes() {
    const { Navigator, Screen } = createStackNavigator();

    const screenOptions = {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#2ff595'
        },
    };

    return (
        <NavigationContainer>
            <Navigator
                screenOptions={screenOptions}
            >
                <Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Login' }}
                />
                <Screen
                    name="Main"
                    component={Main}
                    options={{ title: '' }}
                />
                <Screen
                    name="NewHistory"
                    component={NewHistory}
                    options={{ title: 'Cadastrar Histórico' }}
                />
                <Screen
                    name="RegisterClient"
                    component={RegisterClient}
                    options={{ title: 'Cliente' }}
                />
                <Screen
                    name="RegisterMachine"
                    component={RegisterMachine}
                    options={{ title: 'Máquina' }}
                />
                <Screen
                    name="QrCode"
                    component={QrCode}
                    options={{ title: 'QR Code' }}
                />
            </Navigator>
        </NavigationContainer>
    );
}