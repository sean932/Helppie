import Firebase     from '../services/Firebase'
import { alphaID, sortTimes }  from '../utils/Utils'
import moment       from 'moment'
import Constants    from '../Constants'
import {
  AsyncStorage
} from 'react-native';
// reference https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a
var value = 'value'; // array
var child_added = 'child_added';

var FireApi = {
  //USERS
  logOut:function(){
    Firebase.auth().signOut()
    .then(() => {
        console.log('User signed out successfully');
    })
    .catch();
  },
  saveUser:function( providerData ){
    let email        = providerData.email;
    let photoURL     = providerData.photoURL;
    let displayName  = providerData.displayName;
    let uid          = providerData.uid;
    let lastLogin    = new Date();
    console.log("saveUser:"+email);

    Firebase.messaging().getToken()
    .then((token) => {
      Firebase.database()
        .ref(Constants.TABLES.users)
        .child(uid)
        .update({
            deviceToken: token,
            email,
            photoURL,
            displayName,
            lastLogin
      });
      console.log('Device FCM Token: ', token);
    });
  },
  saveUserProfile : function (data) {
    let phone       = data.phone;
    let age         = data.age;
    let dob         = data.dob;
    let location    = data.location;
    let aboutme     = data.aboutme;

    Firebase.messaging().getToken()
    .then((token) => {
      Firebase.database()
      .ref(Constants.TABLES.profile)
      .child(uid)
    })
  },
  getUser: function(){
    return Firebase.auth().currentUser.providerData[0];
  },
  getUserFromDatabase: function(userID, result) {
    Firebase.database()
      .ref(Constants.TABLES.users)
      .orderByKey()
      .equalTo(userID)
      .once(child_added, (user)=>{
          result( user.val() );
      });
  },
  //USERS
  getInitialNotification: function(){
      Firebase.messaging().getInitialNotification()
      .then((notification) => {
        console.log('Notification which opened the app: ', notification);
      });
  },
  getToken:function(){
    Firebase.messaging().getToken()
    .then((token) => {
      console.log('Device FCM Token: ', token);
    });
  }
}
module.exports = FireApi;
