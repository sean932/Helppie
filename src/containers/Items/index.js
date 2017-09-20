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
import { addToCart } from '../../actions';

export class Items extends Component {
  	constructor(props) {
	    super(props);    
	}
	_renderRow (rowData) {
		const { addToCartAction } = this.props;
	    return (
	    	<View>
		    	<Text >{rowData.id} </Text>
		    	<TouchableHighlight onPress = {() => addToCartAction(rowData)} >
		    	<Image
		          style={{width: 50, height: 50}}
	          	  source={{uri: rowData.link}}
		        />
		        </TouchableHighlight>
	        </View>
    	)
	}
  	render() {
		const { items, addToCartAction } = this.props;
		return (
          <ListView
            dataSource={ items } 
            renderRow={this._renderRow.bind(this)}
          />
		)
	}
} 

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

const mapStateToProps = (reduxState) => ({
  items: ds.cloneWithRows(reduxState.items),
})

const mapDispatchToProps = (dispatch) => ({
	addToCartAction : (item) => dispatch(addToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)
