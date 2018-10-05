import React from 'react';
import { StyleSheet, View } from 'react-native';


export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'tomato',
    height: 250
  },
});
