import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, ListView, AsyncStorage, TouchableHighlight} from 'react-native';

import Container from '../screws/Container';
import Button from '../screws/Button';
import Label from '../screws/Label';
import LabelTitle from '../screws/LabelTitle';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { MKButton, MKColor, getTheme, MKIconToggle } from 'react-native-material-kit';
import Constants from '../Constants.js';
import firebaseApp  from '../db/firebaseconfig';
import Firebase     from  '../services/Firebase';
import FireApi      from  '../utils/FireApi';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} = FBSDK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  scroll: {
    padding: 20
  },
  label: {
    color: '#0d8898',
    fontSize: 12
  },
  alignRight: {
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  alignLeft: {
    alignSelf : 'flex-start',
    flex: 0.5,
  },
  buttonLabel : {
    color: "white",
  },
  buttonCustom : {
    backgroundColor : "crimson",
    opacity : 0.7
  },
  paddingZero : {
    padding: 0 ,
  },
  paddingTop : {
    paddingTop: 10
  }, 
  widthHalf : {
    flex: 0.5
  },
  backgroundImg: {
    flex: 1,
    width: null,
    height: null
  }, 
  slide     : {
    //  backgroundColor: '#f7fafc',
    backgroundColor: '#fff',
    width          : 250,
    height         : 250
  },

  title : { marginTop : 30, fontSize  : 25,  color  : Constants.COLOR.MAIN_TITLE  },
  desc  : { marginTop : 20, fontSize  : 17,  color  : Constants.COLOR.DESC_TITLE  },
  btnLogin: { padding : 20  },
  slideContainer: { flex: 1 , alignItems: 'center', paddingTop: 40,},
  submit:{
  marginRight  : 40,
  marginLeft   : 40,
  marginTop    : 20,
  paddingTop   : 15,
  paddingBottom: 15,
  borderRadius : 30,
  borderWidth  : 0.5,
  borderColor: Constants.COLOR.PRIMARY
 },

 submitText:{
  color            : Constants.COLOR.PRIMARY,
  backgroundColor  : Constants.COLOR.TRANSPARENT,
 },

 center:{ textAlign : 'center' }
});

class LoginScreen extends React.Component {
  constructor (props) {
    super(props);
    console.log('login screen');
    this.userLogin = this.userLogin.bind(this);
    this.toLogin = this.toLogin.bind(this);
  }
  componentWillMount(){
    this.state = {
        isFinish: false,
        isLogin: false,
    }
  }
  componentDidMount() {
    let currentState = this;
    Firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("User is signed in.");
        currentState.setState({
          isFinish: true,
          isLogin: true,
        })
      } else {
        console.log("No user is signed in");
        currentState.setState({
          isFinish: true,
          isLogin: false,
        })
      }
    });
  }
  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    console.log(nextProps);
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('shouldComponentUpdate');
    console.log(nextProps);
    console.log(nextState);
    if (nextProps.navigation.state.routeName == 'Login') {
      return true;
    } 
    return false;
  }
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  userLogin (props) {
    const {navigation} = this.props;
    this.props.onLogin(this.state.email, this.state.password);
    if (this.state.email === 'q' && this.state.password === 'q') {
      navigation.dispatch({ type: 'Main' });
    } else {
      alert('password gg');
    }
  }
  toLogin = (props) => {
    const {navigation} = this.props;
    LoginManager
    .logInWithReadPermissions(['public_profile', 'email'])
    .then(
      function(result) {
          if (result.isCancelled) {
              alert('Login cancelled');
              console.log('Login cancelled');
          } else {
              AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const credential = Firebase.auth.FacebookAuthProvider.credential(data.accessToken); // token present on object
                    AsyncStorage.setItem('credential', JSON.stringify(credential));

                    const infoRequest = new GraphRequest(
                      '/me',
                      null,
                      (error, result) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(result);
                          let fbID = result.id;
                          Firebase
                               .auth()
                               .signInWithCredential(credential)
                               .then(function(currentUser) {
                                 // Create a graph request asking for user information with a callback to handle the response.
                                 let providerData = currentUser.providerData;
                                 let user_data    = providerData[0];
                                 user_data.fbID   = fbID;
                                 user_data.fbImageUrl = "http://graph.facebook.com/"+fbID+"/picture?type=large";
                                 FireApi.saveUser(user_data);
                                  navigation.dispatch({ type: 'Main' });
                                //  console.warn(JSON.stringify(currentUser.toJSON()));
                               })
                               .catch(error => console.error(error));
                        }
                      },
                    );
                   new GraphRequestManager().addRequest(infoRequest).start();
                   }
              );
          }
      },
      function(error) {
        // alert('Login fail with error: ' + error);
        console.log('Login fail with error: ' + error);
      });
  };
  render() {
    console.log('render');
    const { navigation } = this.props;
    const signInButton = (
      <FontAwesomeIcon.Button name="id-card" color="black"
                   backgroundColor="transparent" 
                   style = {{backgroundColor: '#a9ceca', flexDirection: 'row', justifyContent: 'center' }}
                   onPress={() => this.userLogin()}
      > Sign In </FontAwesomeIcon.Button>
    );
    const signUpButton = (
      <FontAwesomeIcon.Button name="user-plus" color="black"
                   backgroundColor="transparent"  
                   style = {{ flexDirection: 'row', justifyContent: 'center' }}
                   onPress={() => alert('sign up')}
      > Join NOW! </FontAwesomeIcon.Button>
    );
    if (this.state.isLogin) {
      const {navigation} = this.props;
    } else {
      return (
          <Image source={ {uri: "http://i.imgur.com/IGlBYaC.jpg" } } style={ styles.backgroundImg } >
          <ScrollView>  
            <LabelTitle text="Or sign in with your account" />
            <Button 
            label="Forgot Login/Pass"
            styles={{button: styles.alignRight, label: [styles.paddingZero, styles.label]}} 
                />
            <View style={{flex :1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'transparent'}}>
              <Fumi
              label={'email'}
              labelStyle={{ color: '#a3a3a3' }}
              inputStyle={{ color: '#f95a25' }}
              iconClass={FontAwesomeIcon}
              iconName={'user'}
              iconColor={'#f95a25'}
              onChangeText={(text) => this.state.email = text} 
              />
              <Fumi
              label={'Password'}
              labelStyle={{ color: '#a3a3a3' }}
              inputStyle={{ color: '#f95a25' }}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              iconColor={'#f95a25'}
              onChangeText={(text) => this.state.password = text } 
              secureTextEntry={true}
              />
            </View>
            <View>
              <View style={[{flex :1}, styles.paddingTop]}>
              { signInButton }
              </View>
              <View style={[{flex :1}, styles.paddingTop]}>
              { signUpButton }
              </View>
            </View>
            <View style={{ flex:0.2, }} >
              <TouchableHighlight
                style         = {styles.submit}
                activeOpacity = {1.0}
                underlayColor = '#00CB9D'
                onPress={this.toLogin}>
                <Text
                  style={[styles.submitText, styles.center]}>
                  FACEBOOK LOGIN
                </Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
          </Image>
      )
    }
    }
  }

  LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
  });

  const mapDispatchToProps = (dispatch) => {
    return {
      onLogin: (email, password) => { dispatch(login(email, password)); },
      onSignUp: (email, password) => { dispatch(signup(email, password)); }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
