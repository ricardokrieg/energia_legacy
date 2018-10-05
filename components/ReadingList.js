import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';


export default class ReadingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  render() {
    return (
      <View style={styles.container}></View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'green'
  }
});
