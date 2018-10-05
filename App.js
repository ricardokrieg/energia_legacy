import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import './global'

import HomeScreen from './screens/HomeScreen'
import AddReadingScreen from './screens/AddReadingScreen'


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
