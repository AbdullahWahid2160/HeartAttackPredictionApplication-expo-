import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';

export default class Logo extends Component{
	render(){
		return(
			<View style={Styles.Container}>
				<Image 
				style={Styles.tinyLogo} 
				source={require('../Images/tiny_logo.png')}
				/>
			</View>
		)
	}
}
const Styles=StyleSheet.create({
	tinyLogo: {
		width: 80,
		height: 80,
	},
	Container: {
		marginTop:130,
		backgroundColor: '#455a64',
		alignItems: 'center',
		justifyContent: 'center'
		
	},
});