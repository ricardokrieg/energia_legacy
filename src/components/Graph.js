import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import _ from 'lodash';
import Reflux from 'reflux';
import Moment from 'moment';
import 'moment/locale/pt-br';

import ReadingStore from '../stores/ReadingStore';


export default class Graph extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = ReadingStore;
  }

  dateFormat() {
    const timestamps = _.map(this.state.readings);

    const firstDate = Moment(_.min(timestamps));
    const lastDate = Moment(_.max(timestamps));

    const diff = Math.abs(lastDate.diff(firstDate, 'days'));

    if (diff <= 10) {
      return 'D';
    } else {
      return 'D';
    }
  }

  render() {
    if (this.state.readings && this.state.readings.length > 1) {
      const readings = _.sortBy(this.state.readings, (r) => { return Moment(r.timestamp) });

      const labels = _.map(readings, (r) => { return Moment(r.timestamp).format(this.dateFormat()) });
      const data = _.map(readings, 'value');

      return (
        <LineChart
          data={{
            labels: labels,
            datasets: [{
              data: data
            }]
          }}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 0,
            color: (opacity = 1) => global.primaryColor,
            style: {
              borderRadius: 0
            }
          }}
          bezier
          style={{
            marginVertical: 4,
            borderRadius: 0
          }}
        />);
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>São necessárias pelo menos duas leituras</Text>
          <Text style={styles.text}>para exibir o gráfico.</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 200
  },
  text: {
    alignSelf: 'center'
  }
});
