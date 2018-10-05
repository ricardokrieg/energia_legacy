import Reflux from 'reflux';

import { ReadingActions } from '../actions/ReadingActions';


export default class ReadingStore extends Reflux.Store {
  constructor() {
    super();
    this.state = { readings: [] };
    this.listenables = [ReadingActions];
  }

  onAdd(reading) {
    this.setState({ readings: [...this.state.readings, reading] });
  }
}