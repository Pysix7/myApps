import { createStackNavigator } from 'react-navigation-stack';
import About from '../screens/About';
import Header from '../shared/Header';
import React from 'react';

const screens = {
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="About" />
            }
        }
    }
};

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            headerTintColor: '#444',
            backgroundColor: '#7fcced',
            height: 60
        }
    }
});

export default AboutStack;