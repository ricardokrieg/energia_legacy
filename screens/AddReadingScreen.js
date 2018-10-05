import React from 'react';
import { View } from 'react-native';
import { Icon, FormLabel, FormInput } from 'react-native-elements';
import Reflux from 'reflux';

import ReadingStore from '../stores/ReadingStore';
import { ReadingActions } from '../actions/ReadingActions';


export default class AddReadingScreen extends Reflux.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Adicionar Leitura',
      headerRight: (<Icon
        name='check'
        type='feather'
        color='white'
        size={32}
        onPress={params.onPress}
      />)
    };
  };

  constructor(props) {
    super(props);

    this.store = ReadingStore;
    this.state = { value: '' };
  }

  componentDidMount() {
    this.props.navigation.setParams({ onPress: this.save });
  };

  save = () => {
    ReadingActions.add(this.state.value);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View>
        <FormLabel>Valor</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ value: text })} />
      </View>
    );
  }
}
