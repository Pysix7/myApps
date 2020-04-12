import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Todo App</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: 'coral'
    },
    title: {
        textAlign: 'center',
        color: '#fafafa',
        fontSize: 20,
        fontWeight: 'bold'
    }
})