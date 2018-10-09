import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Reflux from 'reflux';
import _ from 'lodash';
import Moment from 'moment';
import 'moment/locale/pt-br';

import ReadingStore from '../stores/ReadingStore';
import { ReadingActions } from '../actions/ReadingActions';


export default class AddReadingScreen extends Reflux.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: navigation.getParam('reading', false) ? 'Editar Leitura' : 'Adicionar Leitura',
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
    this.state = {
      reading: { value: '', timestamp: new Date(), ...this.props.navigation.getParam('reading', {}) },
      isDateTimePickerVisible: false,
      isFormDirty: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ onPress: this.save });
  };

  save = () => {
    ReadingActions.add(this.state.reading);
    this.props.navigation.goBack();
  };

  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  _handleDatePicked = (datetime) => {
    this.setState({ reading: { ...this.state.reading, timestamp: datetime } });
    this._hideDateTimePicker();
  };

  formErrorMessages() {
    if (!this.state.isFormDirty) return;

    if (_.isEmpty(this.state.reading.value)) {
      return <FormValidationMessage>Valor é obrigatório</FormValidationMessage>;
    }

    if (_.parseInt(this.state.reading.value) < 0) {
      return <FormValidationMessage>Valor não pode ser negativo</FormValidationMessage>;
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Button
          raised
          icon={{name: 'calendar', type: 'feather', color: global.primaryColor}}
          backgroundColor='white'
          color={global.textColor}
          title={Moment(this.state.reading.timestamp).format('LLLL')}
          onPress={this._showDateTimePicker}
        />
        <DateTimePicker
          mode='datetime'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

        <FormLabel>Valor</FormLabel>
        <FormInput
          value={this.state.reading.value.toString()}
          autoFocus={true}
          keyboardType='phone-pad'
          onChangeText={(text) => this.setState({ reading: { ...this.state.reading, value: text }, isFormDirty: true })}
        />
        {this.formErrorMessages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
});