import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Reflux from 'reflux';


export default class AddReading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onPress = () => {
    console.log('OK');
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          raised
          name='plus'
          type='feather'
          color={global.primaryColor}
          size={32}
          onPress={this.onPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40
  }
});
