import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';
import 'moment/locale/pt-br';


export default class CurrentDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentTime: new Date() };
  }

  componentDidMount() {
    setInterval( () => {
      this.setState({
        currentTime: new Date()
      })
    }, 1000);
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>{Moment(this.state.currentTime).format('LLLL')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'right',
    marginRight: 4,
    color: global.textColor
  },
});
