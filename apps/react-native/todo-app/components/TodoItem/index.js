import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item.key)}>
            <View style={styles.item}>
                <MaterialIcons name="delete" size={18} color="#555" />
                <Text style={styles.text}>
                    {item.text}
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row'
    },
    text: {
        marginLeft: 10,
    }
})