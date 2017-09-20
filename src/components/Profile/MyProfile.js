import React, { Component , propTypes} from 'react';
import { StyleSheet, ScrollView, View , Button, Image, Text, AsyncStorage, TouchableHighlight} from 'react-native';

import DrawerButton from '../DrawerButton'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  MKButton, MKColor, getTheme, MKIconToggle } from 'react-native-material-kit';
import t from 'tcomb-form-native';

import firebaseApp  from '../../db/firebaseconfig';
import Firebase     from  '../../services/Firebase';
import FireApi      from  '../../utils/FireApi';


var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

var options = {
  label: 'My Profile',
  fields: {
    gender: {
      nullOption: {value: '', text: 'Choose your gender'},
    },
    aboutMe: {
      type: 'textarea',
      placeholder: 'Tell Something About Yourself..',
    },
    displayName: {
      placeholder: 'Your Name..'
    },
    phone: {
      placeholder: 'Your Contact..'
    },
    location: {
      placeholder: 'Your Location..'
    }
  }
};
const Form = t.form.Form;

// here we are: define your domain model
const Person = t.struct({
  displayName: t.String,
  gender: Gender,
  phone: t.maybe(t.Number),
  age: t.maybe(t.Number),
  birthDate: t.Date,
  location: t.maybe(t.String),
  aboutMe: t.maybe(t.String)
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5'
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

class MyProfile extends React.Component {
  constructor (props) {
    super(props);
    let user = FireApi.getUser();
    this.state = {user: user};
    this.onPress = this.onPress.bind(this);
  }
  componentDidMount() {
    let currentState = this;
    FireApi.getUserFromDatabase(currentState.state.user.uid, function(result){
      currentState.state.user.photoURL = result.photoURL;
      currentState.setState({
        user : currentState.state.user
      })
    });
  }
  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }
  render() {
    var menu = (
       <MKIconToggle
        checked={true}
        onCheckedChange={this._onIconChecked}
        onPress={this._onIconClicked}
        >
        <Image style={styles.image} source={{uri: 'http://placehold.it/100x100'}}/>
        <Text pointerEvents="none"
              style={styles.toggleTextOff}>Off</Text>
        <Text state_checked={true}
              pointerEvents="none"
              style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
      </MKIconToggle>
    );
   
    const { navigation } = this.props;
    if (this.state.user.displayName) {
        return (
          <ScrollView>
            <View style={styles.container}>
              <Form
                ref="form"
                type={Person}
                options={options}
                value={this.state.user}
              />
              <TouchableHighlight onPress={this.onPress} underlayColor='#99d9f4'>
                <Text >Save</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        )
    } else {
      return (<Text>Loading ...</Text>);
    }
  }
}

MyProfile.navigationOptions = props => {
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
      <Text style={styles.title }> Profile </Text>
    ),
    drawerIcon: ({ tintColor }) => (
      <Image
        source={{uri : 'http://www.colgate.com/CP15/en/us/oc/products/toothpaste/images/kids-cavity-protection-toothpaste-outofpack-02.png'}}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
};

export default MyProfile;