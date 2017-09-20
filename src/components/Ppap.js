import React , {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';
import Items from '../containers/Items';
import ShoppingCart from '../containers/ShoppingCart';

export default class Ppap extends Component {
	render () {
		return (
			<ScrollView>
				<Items />
				<ShoppingCart />
			</ScrollView>
		)	
	}
}