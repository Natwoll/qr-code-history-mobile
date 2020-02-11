import React, { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import DefaultButton from '../components/DefaultButton';

import { isAuthenticated } from '../services/auth';

const { width } = Dimensions.get('window');

export default function Main({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        async function requestPermissions() {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        }

        requestPermissions();
    }, []);

    function handleBarCodeScanned({ type, data }) {
        setScanned(true);
        navigation.navigate('NewHistory', { qrCodeData: 'asd134' });
    }

    if (hasPermission === null)
        return <Text>Solicitando permissões de acesso à câmera</Text>;
    if (hasPermission === false)
        return <Text>Acesso à câmera não garantido</Text>;

    return (
        <View style={styles.container}>
            {
                scanned ? (
                    <>
                        <DefaultButton text="Escanear" onPress={() => setScanned(false)} style={{ marginTop: 20 }} />
                        { 
                            isAuthenticated() && 
                            <>
                                <DefaultButton text="Cadastrar Máquina" onPress={() => navigation.navigate('RegisterMachine')} style={{ marginTop: 20 }} />
                                <DefaultButton text="Cadastrar Cliente" onPress={() => navigation.navigate('RegisterClient')} style={{ marginTop: 20 }} />
                            </>
                        }
                    </>
                ) : (
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={[StyleSheet.absoluteFillObject, styles.scanner]}
                    >
                        <View style={styles.opacity}>
                            <Text style={styles.text}>Escaneie o QR Code</Text>
                        </View>
                        <View style={styles.layerCenter}>
                            <View style={styles.opacity} />
                            <View style={styles.focused} />
                            <View style={styles.opacity} />
                        </View>
                        <View style={styles.opacity}>
                            <TouchableOpacity activeOpacity={.7} onPress={() => setScanned(true)}>
                                <Text style={styles.text}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </BarCodeScanner >
                )
            }

        </View >
    );
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },

    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    scanner: {
        flex: 1,
        flexDirection: 'column',
    },

    opacity: {
        flex: 1,
        backgroundColor: opacity,
        justifyContent: 'center',
        alignItems: 'center'
    },

    layerCenter: {
        flex: 1.8,
        flexDirection: 'row',
    },

    focused: {
        flex: 10,
        width: width * 0.7
    },
});