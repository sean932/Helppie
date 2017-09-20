import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import ConnectedAppWithNavigation from './navigators/AppNavigator';

let store = createStore(rootReducer);

class Helppie extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedAppWithNavigation />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Helppie', () => Helppie);
