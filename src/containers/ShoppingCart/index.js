import React , { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ListView,
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { removeFromCart } from '../../actions';

export class ShoppingCart extends Component {
  	constructor(props) {
	    super(props);    
	}
	_renderRow (rowData) {
		const { removeFromCartDispatch } = this.props;
	    return (
	    	<View>
		    	<Text >{rowData.id} </Text>
		    	<TouchableHighlight onPress = { () => removeFromCartDispatch(rowData.id)} >
		    	<Image
		          style={{width: 50, height: 50}}
	          	  source={{uri: rowData.link}}
		        />
		        </TouchableHighlight>
	        </View>
    	)
	}
  	render() {
		const { shoppingCart } = this.props;
		return (
          <ListView
            dataSource={ shoppingCart } 
            renderRow={this._renderRow.bind(this)}
          />
		)
	}
} 

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

//make props
const mapStateToProps = (reduxState) => ({
  shoppingCart: ds.cloneWithRows(reduxState.shoppingCart),
})

const mapDispatchToProps = (dispatch) => ({
	removeFromCartDispatch : (id) => dispatch(removeFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
