import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

export default function QrCode({ navigation }) {

    const [value, setValue] = useState('');

    useEffect(() => {
    }, [])

    return (
        <View>
            <QRCode value="a" />
        </View>
    );
}
