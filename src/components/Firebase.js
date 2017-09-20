import React, { Component } from 'react';import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  Kaede,
  Hoshi,
  Jiro,
  Isao,
  Madoka,
  Akira,
  Hideo,
  Kohana,
  Makiko,
  Sae,
  Fumi,
} from 'react-native-textinput-effects';

const firebaseDbh = require ( '../db/firebaseconfig');
import authRef from '../db/firebaseconfig';
import firebaseApp from '../db/firebaseconfig';

export default class Firebase extends Component {
  constructor(props) {
    super(props);
    console.log(firebaseApp);
    this.state = {loading: true, dbh: firebaseDbh, fba: authRef, navigation: this.props.navigation};
  }
  render() {
    console.log(this.state);
    let email = 'js.js_733@hotmail.com';
    let password = 'asd';
    var provider = new firebaseApp.auth.FacebookAuthProvider();
    console.log(provider);
     // firebaseApp.auth().signInWithEmailAndPassword(email, password)
     //  .catch(error => {
     //    this.setState({
     //      toast: error.message
     //    });
     //  });
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});

Firebase.navigationOptions = {
  title: 'Firebase',
};
