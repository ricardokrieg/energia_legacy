import React from 'react';
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Reflux from 'reflux';
import Moment from 'moment';
import 'moment/locale/pt-br';

import ReadingStore from '../stores/ReadingStore';
import { ReadingActions } from '../actions/ReadingActions';


export default class ReadingList extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = ReadingStore;
  }

  onPress(reading) {
    this.props.navigation.navigate('AddReading', { reading: reading });
  }

  onPressDelete(reading) {
    Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir essa leitura?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => ReadingActions.delete(reading)},
      ]
    )
  }

  buttonFor(reading) {
    return [
      {
        backgroundColor: 'tomato',
        component: (
          <View style={styles.swipeIconContainer}>
            <Icon name='trash' type='feather' color='white' size={32} />
          </View>
        ),
        type: 'delete',
        onPress: () => { this.onPressDelete(reading) }
      }
    ];
  }

  render() {
    const noReading = (
      <View style={[styles.container, styles.textContainer]}>
        <Text style={styles.text}>Nenhuma leitura. Clique no</Text>
        <Icon
          name='plus'
          type='feather'
          color={global.primaryColor}
          size={16}
          containerStyle={styles.icon}
        />
        <Text style={styles.text}>para adicionar.</Text>
      </View>
    );

    const readingList = (
      <ScrollView style={styles.container}>
        <List containerStyle={styles.list}>
          {
            this.state.readings.map((reading, index) => (
              <Swipeout right={this.buttonFor(reading)} key={index} autoClose={true} backgroundColor='white'>
                <ListItem
                  title={reading.value}
                  subtitle={Moment(reading.timestamp).format('LLLL')}
                  onPress={() => this.onPress(reading)}
                />
              </Swipeout>
            ))
          }
        </List>
      </ScrollView>
    );

    return this.state.readings.length > 0 ? readingList : noReading;
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  textContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20
  },
  text: {
    color: global.textColor
  },
  icon: {
    paddingTop: 2,
    marginLeft: 2,
    marginRight: 2
  },
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  swipeIconContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
