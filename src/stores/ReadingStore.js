import { AsyncStorage } from 'react-native';
import Reflux from 'reflux';
import _ from 'lodash';
import Moment from 'moment';
import 'moment/locale/pt-br';

import { ReadingActions } from '../actions/ReadingActions';


export default class ReadingStore extends Reflux.Store {
  constructor() {
    super();

    // DEBUG
    // AsyncStorage.removeItem('@Energia:readings');
    // AsyncStorage.removeItem('@Energia:billDates');
    // this.state.billDates = [{timestamp: Moment().subtract(15, 'days')}, {timestamp: Moment().subtract(45, 'days')}];
    // this.saveBillDates();
    // DEBUG

    this.listenables = [ReadingActions];

    this.state = { allReadings: [], readings: [], billDates: [] };

    this.loadBillDates().then((billDates) => {
      this.setState({
        billDates: _.map(billDates, (b) => { return {...b, timestamp: new Date(b.timestamp)} }),
      });

      this.loadReadings().then((readings) => {
        this.setState({
          allReadings: _.map(readings, (r) => { return {...r, timestamp: new Date(r.timestamp)} }),
          readings: this.filterReadings(readings),
        });
      });
    });
  }

  filterReadings(readings) {
    if (_.isEmpty(this.state.billDates)) return readings;

    const lastBillDate = _.last(_.sortBy(this.state.billDates, (b) => { return Moment(b.timestamp) }));

    return _.filter(readings, (r) => { return Moment(r.timestamp) > Moment(lastBillDate.timestamp) });
  }

  onAdd(reading) {
    reading = {...reading, value: parseInt(reading.value)};

    console.log('ADD');
    console.log(reading);

    const index = _.findIndex(this.state.readings, (r) => { return r.id === reading.id });

    if (index >= 0) {
      // replace existing Reading
      this.setState({ readings: [
        ..._.slice(this.state.readings, 0, index),
        {...this.state.readings[index], ...reading},
        ..._.slice(this.state.readings, index+1),
      ] });
    } else {
      this.setState({ readings: [...this.state.readings, {...reading, id: new Date().getTime()}] });
    }

    this.save();
  }

  onDelete(reading) {
    console.log('DELETE');
    console.log(reading);

    this.setState({ readings: _.filter(this.state.readings, (r) => { return r.id !== reading.id }) });

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

  onAddBillDate(billDate) {
    console.log('ADD BILL DATE');
    console.log(billDate);

    const index = _.findIndex(this.state.billDates, (b) => { return b.id === billDate.id });

    if (index >= 0) {
      // replace existing BillDate
      this.setState({ billDates: [
        ..._.slice(this.state.billDates, 0, index),
        {...this.state.billDates[index], ...billDate},
        ..._.slice(this.state.billDates, index+1),
      ] });
    } else {
      this.setState({ billDates: [...this.state.billDates, {...billDate, id: new Date().getTime()}] });
    }

    this.saveBillDates();
  }

  onDeleteBillDate(billDate) {
    console.log('DELETE BILL DATE');
    console.log(billDate);

    this.setState({ billDates: _.filter(this.state.billDates, (b) => { return b.id !== billDate.id }) });

    this.saveBillDates();
  }

  async saveBillDates() {
    console.log('SAVE BILL DATES');
    console.log(this.state.billDates);

    try {
      await AsyncStorage.setItem('@Energia:billDates', JSON.stringify(this.state.billDates));
    } catch (error) {
      console.log('ReadingStore#saveBillDates error');
      console.log(error);
    }
  }

  async loadReadings() {
    try {
      const value = await AsyncStorage.getItem('@Energia:readings');

      console.log('LOAD READINGS');
      console.log(value);

      return value !== null ? JSON.parse(value) : [];
    } catch (error) {
      console.log('ReadingStore#loadReadings error');
      console.log(error);

      return [];
    }
  }

  async loadBillDates() {
    try {
      const value = await AsyncStorage.getItem('@Energia:billDates');

      console.log('LOAD BILL DATES');
      console.log(value);

      return value !== null ? JSON.parse(value) : [];
    } catch (error) {
      console.log('ReadingStore#loadBillDates error');
      console.log(error);

      return [];
    }
  }
}