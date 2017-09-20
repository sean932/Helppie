import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
} from 'react-native';
 
const LabelTitle = (props) => {
    return (
        <Text style={styles.textLabelTitle}>
            {props.text}
        </Text>
    );
}
 
const styles = StyleSheet.create({
    textLabelTitle: {
        fontSize: 18,
        fontFamily: 'Verdana',
        paddingBottom: 30,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
});
 
export default LabelTitle;