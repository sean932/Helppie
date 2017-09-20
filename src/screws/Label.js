import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
} from 'react-native';
 
const Label = (props) => {
    return (
        <Text style={styles.textLabel}>
            {props.text}
        </Text>
    );
}
 
const styles = StyleSheet.create({
    textLabel: {
        fontSize: 12,
        fontFamily: 'Verdana',
        marginBottom: 10,
        color: '#fff',
        'flex': 0.3
    },
});
 
export default Label;