import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import MyProfile from '../components/Profile/MyProfile';
import Ppap from '../components/Ppap';
import Firebase from '../components/Firebase';

export const MainNavigator = DrawerNavigator({
  Main: { screen: MainScreen },
  MyProfile: { screen: MyProfile },
  Profile: { screen: ProfileScreen },
  Ppap : { screen: Ppap},
  Firebase : { screen: Firebase }
},{
  initialRouteName: 'Main',
  contentOptions: {
    activeTintColor: '#e91e63',
  },
  title: 'Sekinchan'
});

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainNavigator },
}, {
  initialRouteName: 'Login',
  headerMode: 'screen',
}
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
