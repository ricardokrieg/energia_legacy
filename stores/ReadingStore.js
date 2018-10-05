var Actions = Reflux.createActions(['add']);

class ReadingStore extends Reflux.Store {
  constructor() {
    super();
    this.state = { readings: [] };
    this.listenables = [Actions];
  }

  onAdd(reading) {
    console.log('BEFORE');
    console.log(this.state.readings);

    this.setState({ readings: [...this.state.readings, reading] });

    console.log('AFTER');
    console.log(this.state.readings);
  }
}