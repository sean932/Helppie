import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, ListView } from 'react-native';

const firebaseDbh = require ( '../../../db/firebaseconfig');
import authRef      from '../../../db/firebaseconfig';
import firebaseApp  from '../../../db/firebaseconfig';
import Firebase     from  '../../../services/Firebase';
import FireApi      from  '../../../utils/FireApi';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} = FBSDK;
   
class FbLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, dbh: firebaseDbh, firebase: firebaseApp, navigation: this.props.navigation, now : new Date()};
  }
  render() {
    return (
      <View>
        <LoginButton          
          // publishPermissions={["publish_actions"]}
          readPermissions={["public_profile", "email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                var userRef = this.state.dbh.ref('User');
                var datetime = new Date();
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    AsyncStorage.clear();
                    const credential = Firebase.auth.FacebookAuthProvider.credential(data.accessToken); // token present on object
                    AsyncStorage.setItem('credential', JSON.stringify(credential));
                    Firebase
                         .auth()
                         .signInWithCredential(credential)
                         .then(function(currentUser) {

                           let providerData = currentUser.providerData;
                           let user_data    = providerData[0];

                           console.log("providerDataGET"+JSON.stringify(user_data));
                           FireApi.saveUser(user_data);
                            this.state.navigation.dispatch({ type: 'Main' });
                         })
                         .catch(error => console.error(error));
                  }
                )
              }
            }
          }
          onLogoutFinished={() => {
            alert("User logged out");
            let keys = ['userId', 'email'];
            AsyncStorage.multiRemove(keys);
            }
          }
        />
      </View>
    );
  }
};

export default FbLogin;

