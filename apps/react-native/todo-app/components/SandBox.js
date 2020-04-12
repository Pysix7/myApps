import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textOne}>Text One</Text>
            <Text style={styles.textTwo}>Text Two</Text>
            <Text style={styles.textThree}>Text Three</Text>
            <Text style={styles.textFour}>Text Four</Text>
            <Text style={styles.textFive}>Text Five</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        flexDirection:'row',
        backgroundColor: '#b3b3b3',
        justifyContent:'space-around'
    },
    textOne: {
        padding: 10,
        backgroundColor: 'red',
        flex:1,
    },
    textTwo: {
        padding: 10,
        backgroundColor: 'green',
        flex:1,
    },
    textThree: {
        padding: 10,
        backgroundColor: 'skyblue',
        flex:2
    },
    textFour: {
        padding: 10,
        backgroundColor: 'coral',
        flex:1,
    },
    textFive: {
        padding: 10,
        backgroundColor: 'blue',
        flex:1,
    },
})