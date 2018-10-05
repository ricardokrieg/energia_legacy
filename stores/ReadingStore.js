import { AsyncStorage } from 'react-native';
import Reflux from 'reflux';
import _ from 'lodash';

import { ReadingActions } from '../actions/ReadingActions';


export default class ReadingStore extends Reflux.Store {
  constructor() {
    super();

    this.listenables = [ReadingActions];

    this.state = { readings: [] };
    this.load().then((readings) => {
      this.setState({ readings: _.map(readings, (r) => { return {...r, timestamp: new Date(r.timestamp)} }) });
    });
  }

  onAdd(reading) {
    console.log('ADD');
    console.log(reading);

    this.setState({ readings: [reading, ...this.state.readings] });

    this.save();
  }

  onDelete(reading) {
    console.log('DELETE');
    console.log(reading);

    this.setState({ readings: _.filter(this.state.readings, (r) => { return r.timestamp.getTime() != reading.timestamp.getTime() }) });

    this.save();
  }

  async save() {
    console.log('SAVE');
    console.log(this.state.readings);

    try {
      await AsyncStorage.setItem('@Energia:readings', JSON.stringify(this.state.readings));
    } catch (error) {
      console.log('ReadingStore#save error');
      console.log(error);
    }
  }

  async load() {
    try {
      const value = await AsyncStorage.getItem('@Energia:readings');

      console.log('LOAD');
      console.log(value);

      return value !== null ? JSON.parse(value) : [];
    } catch (error) {
      console.log('ReadingStore#load error');
      console.log(error);

      return [];
    }
  }
}