import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/Card';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from './ReviewForm';

export default function Home({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [reviews, setReviews] = useState([
        { title: "Grand Theft Auto V", body: "Open World Crazy", rating: 5, key: '1' },
        { title: "Player Unknwn's BattleGround", body: "Best Battle Royale", rating: 4, key: '2' },
        { title: "Fortnite", body: "Kids game", rating: 3, key: '3' },
    ])

    const addReview = review => {
        review.key = Math.random().toString();
        setReviews(currentReviews => {
            return [
                review,
                ...currentReviews
            ]
        })
        setModalVisible(false)
    }

    return (
        <View style={globalStyles.container}>
            <Modal
                visible={modalVisible}
                animationType="slide"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons
                            name="close"
                            size={24}
                            style={{
                                ...styles.modalToggle,
                                ...styles.modalClose
                            }}
                            onPress={() => setModalVisible(false)}
                        />
                        <ReviewForm addReview={addReview} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <MaterialIcons
                name="add"
                size={24}
                style={styles.modalToggle}
                onPress={() => setModalVisible(true)}
            />
            <FlatList
                data={reviews}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                        <Card>
                            <Text style={globalStyles.titleText}>{item.title} </Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0
    },
    modalContent: {
        flex: 1
    }
})