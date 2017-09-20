import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import {
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

function mapStateToProps(state) { return {user : state.userReducers.user}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions,dispatch); }

class Login extends React.Component {
	  constructor(props) {
	  	console.log(props);
	    super(props);
	    this.state = {
	      loggedIn: false
	    };
	  }
	onLoginButtonPress() {
		this.props.login({
			userName : 'test',
			password : '12345'
		})
	}
	render() {
		return (
			<View>
			{
				!this.props.user.loggedIn && 
					<TouchableHighlight onPress={this.onLoginButtonPress}>
						<Text>Log In</Text>
					</TouchableHighlight>
			}
			</View>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)

