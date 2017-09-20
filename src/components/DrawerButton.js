import React, { PropTypes, Component } from 'react';
import { StyleSheet, View , Button, Image, Text} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  MKButton, MKColor, getTheme, MKIconToggle } from 'react-native-material-kit';

const styles = StyleSheet.create({
  navBtn: {
    color: "black",
  },
  navImg: {
    width: 30,
    height: 30
  }
});

const B2 = MKButton.coloredButton()
.withText('BUTTON')
.withBackgroundColor(MKColor.Transparent)
.withOnPress(() => {
  console.log("Hi, it's a colored button!");
})
.withStyle(styles.navBtn)
.build();

class DrawerButton extends React.Component{
  render() {
    const { navigation } = this.props;
    const customTextButton = (
      <Icon.Button name="align-right" color="black" backgroundColor="transparent" onPress= { () => navigation.navigate('DrawerOpen') }>
      </Icon.Button>
    );
    return (
      // <B2 onPress= { () => navigation.navigate('DrawerOpen') } />
    <View>
      {customTextButton}
    </View>
    )
  }
}

export default DrawerButton;