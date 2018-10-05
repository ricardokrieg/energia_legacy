import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import CurrentDatetime from '../components/CurrentDatetime'
import Graph from '../components/Graph'
import ReadingList from '../components/ReadingList'


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Conta de Energia',
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CurrentDatetime />
        <Graph />
        <ReadingList />

        <View style={styles.addContainer}>
          <Icon
            raised
            name='plus'
            type='feather'
            color={global.primaryColor}
            size={32}
            onPress={() => this.props.navigation.navigate('AddReading')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40
  }
});