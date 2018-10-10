import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import Reflux from 'reflux';
import Moment from 'moment';
import 'moment/locale/pt-br';

import ReadingStore from '../stores/ReadingStore';


export default class ReadingGroup extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = ReadingStore;

    this.state = { readings: [], currentDateGroupIndex: 0 };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.readings.length < this.state.readings.length) {
      this.setState({ currentDateGroupIndex: this.getDateGroups().length - 1 })
    }
  }

  moveLeft() {
    if (this.canMoveLeft()) {
      this.setState({ currentDateGroupIndex: this.state.currentDateGroupIndex - 1 });
    }
  }

  moveRight(dateGroups) {
    if (this.canMoveRight(dateGroups)) {
      this.setState({ currentDateGroupIndex: this.state.currentDateGroupIndex + 1 });
    }
  }

  canMoveLeft() {
    return this.state.currentDateGroupIndex > 0;
  }

  canMoveRight(dateGroups) {
    return this.state.currentDateGroupIndex < dateGroups.length - 1;
  }

  getDateGroups() {
    const readings = _.sortBy(this.state.readings, (r) => { return Moment(r.timestamp) });
    const timestamps = _.map(readings, 'timestamp');

    return _.uniq(_.map(timestamps, (t) => Moment(t).format('MMMM YYYY')));
  }

  render() {
    const dateGroups = this.getDateGroups();
    const currentDateGroup = _.isEmpty(dateGroups) ?
      Moment(new Date()).format('MMMM YYYY') :
      dateGroups[this.state.currentDateGroupIndex];

    return (
      <View style={styles.container}>
        <Icon
          name='chevron-left'
          type='feather'
          color={this.canMoveLeft() ? global.primaryColor : global.disabledColor}
          size={32}
          onPress={() => this.moveLeft()}
        />

        <Text style={styles.text}>{currentDateGroup.toUpperCase()}</Text>

        <Icon
          name='chevron-right'
          type='feather'
          color={this.canMoveRight(dateGroups) ? global.primaryColor : global.disabledColor}
          size={32}
          onPress={() => this.moveRight(dateGroups)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: global.primaryColor,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    flexGrow: 1,
  },
});
