import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Logo from '../Components/Logo';

export default class InitialPage extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={Styles.Container}>

				<Logo />

				<View style={Styles.ButtonContainer}>
					<TouchableOpacity style={Styles.UserLoginButton} >
						<Text
							style={Styles.ButtonText}
							onPress={() => this.props.navigation.navigate('Login')}>
							User Mode
					</Text>
					</TouchableOpacity>

					<TouchableOpacity style={Styles.DoctorLoginButton}>
						<Text
							style={Styles.ButtonText}
							onPress={() => this.props.navigation.navigate('DoctorLogin')}>
							Doctor's Mode
					</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const Styles = StyleSheet.create({
	Container: {
		backgroundColor: '#455a64',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	UserLoginButton: {
		backgroundColor: "#1c313a",
		borderRadius: 25,
		marginVertical: 50,
		paddingVertical: 10,
		alignSelf: 'center',
	},
	DoctorLoginButton: {
		backgroundColor: "#1c313a",
		borderRadius: 25,
		marginVertical: 50,
		paddingVertical: 10,
		alignSelf: 'center',
		width: 200
	},
	ButtonText: {
		fontSize: 20,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.9)',
		textAlign: 'center',
		paddingHorizontal: 20,
		paddingBottom: 5
	},
	ButtonContainer:{
		backgroundColor: '#455a64',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});