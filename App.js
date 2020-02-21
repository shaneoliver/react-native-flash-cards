import React, {Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import styles from './assets/styles'
import AppNavigator from './navigation/AppNavigator';
import { setLocalNotification } from './utils/helpers';

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
    )
  }
}