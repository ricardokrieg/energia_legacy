import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Reflux from 'reflux';

import './global'

import Actions from './actions'

import CurrentDatetime from './components/CurrentDatetime'
import Graph from './components/Graph'
import AddReading from './components/AddReading'


export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{ text: 'Conta de Energia', style: { color: '#fff' } }}
          backgroundColor={global.primaryColor}
        />

        <CurrentDatetime />
        <Graph />

        <View style={{ flexGrow: 1, backgroundColor: 'green' }}></View>

        <AddReading />
      </View>
    );
  }
}
