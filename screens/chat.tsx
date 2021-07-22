import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/style';
import { TouchableButton } from '../constants/Components';
import { touchable_styles } from '../styles/touchable_styles';

const client = new WebSocket('ws://157.245.176.240:8020');

export const chat = () => {
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            client.send(JSON.stringify({'type':'CONNECTION', 'message': {id: 1, partner: 2}}))
        };
        client.onmessage = (message) => {
            console.log(message);
        };
        return(() => {
            client.close();
        });
    }, [update]);
    return (
        <Fragment>
            <SafeAreaView style={styles.background} />
            <SafeAreaView style={[styles.individualListingContainer, { flex: 1 }]}>
                <TouchableOpacity
                    style={[touchable_styles.halfButtonDark]}
                    onPress={() => setUpdate(update + 1)}
                >
                    <Text style={touchable_styles.lightText}>Filter</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Fragment >
    );
}