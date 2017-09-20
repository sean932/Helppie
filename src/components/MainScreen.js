import React, { Component , propTypes} from 'react';
import { StyleSheet, ScrollView, View , Button, Image, Text, AsyncStorage, TouchableHighlight, Alert} from 'react-native';

import Constants from '../Constants.js';
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import DrawerButton from './DrawerButton'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  MKButton, MKColor, getTheme, MKIconToggle } from 'react-native-material-kit';
import { NavigationActions } from 'react-navigation'

import firebaseApp  from '../db/firebaseconfig';
import Firebase     from  '../services/Firebase';
import FireApi      from  '../utils/FireApi';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} = FBSDK;
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  icon: {
    width: 24,
    height: 24,
  },
  navTitle: {
    color: 'white', // changing navbar title color
  },
  submitText:{
     color            : Constants.COLOR.PRIMARY,
     backgroundColor  : Constants.COLOR.TRANSPARENT,
  },
  center:{ textAlign : 'center' }
}); 

const theme = getTheme();

const myButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998" onClick={this.loginWithFacebook}>
    Login with Facebook
  </Icon.Button>
);

const AddToOrderButton = MKButton.coloredFlatButton()
  .withText('BUTTON')
  .build();

const B2 = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();

const AccentColoredRaisedButton = MKButton.accentColoredButton()
    .build();

const customTextButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998">
    <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
  </Icon.Button>
);

class MainScreen extends React.Component {
  constructor (props) {
    super(props);
    this.toLogout = this.toLogout.bind(this);
  }
  toLogout = () => {
    const {navigation} = this.props;
    Alert.alert(
      'Are you sure you want to log out?',
      'Logging out may restrict you from using Helppie featues. Simply login again to access Helppie.',
      [
        {text: 'CANCEL', onPress: () => console.log('Good Choice'), style: 'cancel'},
        {text: 'PROCEED', onPress: () => {
            AsyncStorage.removeItem('credential',(err) => {
              FireApi.logOut();
              const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Login'})
              ]
            })
              navigation.dispatch(resetAction);
            });
        }
      },
      ],
      { cancelable: false }
    )
  }
  render() {
    var menu = (
       <MKIconToggle
        checked={true}
        onCheckedChange={this._onIconChecked}
        onPress={this._onIconClicked}
        >
        <Text pointerEvents="none"
              style={styles.toggleTextOff}>Off</Text>
        <Text state_checked={true}
              pointerEvents="none"
              style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
      </MKIconToggle>
    );
   
    const { navigation } = this.props;
    return (
      <ScrollView style={theme.cardStyle}>
        <Image source={require('../img/a.jpg')} style={theme.cardImageStyle} />
        <Text style={theme.cardTitleStyle}>Welcome</Text>
        <Text style={theme.cardContentStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Mauris sagittis pellentesque lacus eleifend lacinia...
        </Text>
        <View style={theme.cardMenuStyle}>{menu}</View>
        <Text style={theme.cardActionStyle}>
        </Text>
        <View>            
          <TouchableHighlight
            activeOpacity = {1.0}
            underlayColor = '#00CB9D'
            onPress={this.toLogout}>
            <Text
              style={[styles.submitText, styles.center,styles.logout]}>
              LOGOUT 
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}

MainScreen.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerRight: (
      <DrawerButton navigation={ navigation } />
    ),
    headerLeft: (
      <DrawerButton navigation={ navigation } />
    ),
    title: (
      <Text style={styles.title }> Sekinchan.xyz </Text>
    ),
    drawerIcon: ({ tintColor }) => (
      <Image
        source={{uri : 'http://www.colgate.com/CP15/en/us/oc/products/toothpaste/images/kids-cavity-protection-toothpaste-outofpack-02.png'}}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
};

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);