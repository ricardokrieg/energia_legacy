import React from 'react';
import { View } from 'react-native';
import { Icon, FormLabel, FormInput } from 'react-native-elements';


export default class AddReadingScreen extends React.Component {
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

  componentDidMount() {
    this.props.navigation.setParams({ onPress: this.save });
  };

  save = () => {
    console.log('Save');
    // refluxSaveAction(this.state.reading);
    //   \
    //    --> store.readings << reading
  };

  render() {
    return (
      <View>
        <FormLabel>Valor</FormLabel>
        <FormInput />
      </View>
    );
  }
}
