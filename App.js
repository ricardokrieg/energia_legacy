import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import './src/global'

import HomeScreen from './src/screens/HomeScreen'
import AddReadingScreen from './src/screens/AddReadingScreen'


const Root = createStackNavigator(
  {
    Home: HomeScreen,
    AddReading: AddReadingScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: global.primaryColor,
      },
      headerTintColor: 'white',
    },
  },
);

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}
