import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import Reflux from 'reflux';

import ReadingStore from '../stores/ReadingStore';


export default class ReadingList extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = ReadingStore;
  };
  // <Text style={styles.text}>Nenhuma leitura. Clique no ➕ para adicionar.</Text>

  render() {
    noReading = (
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

    readingList = (
      <ScrollView style={styles.container}>
        <List containerStyle={styles.list}>
          {
            this.state.readings.map((reading, index) => (
              <ListItem
                key={index}
                title={reading}
              />
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
  }
});
