import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Reflux from 'reflux';


export default class CurrentDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentTime: this.getCurrentTime() };
  }

  componentDidMount() {
    setInterval( () => {
      this.setState({
        currentTime: this.getCurrentTime()
      })
    }, 1000);
  }

  getCurrentTime() {
    return new Date().toLocaleString();
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>{this.state.currentTime}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'right',
    marginRight: 4
  },
});
