import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import Logo from '../Components/Logo';

var DoctorAppConfig = {
	apiKey: "AIzaSyDnWNv8QYwPtyedAGa8HU3smyI5D2cnjeE",
	authDomain: "doctorapp-706d8.firebaseapp.com",
	databaseURL: "https://doctorapp-706d8.firebaseio.com",
	projectId: "doctorapp-706d8",
	storageBucket: "doctorapp-706d8.appspot.com",
	messagingSenderId: "786155551508",
	appId: "1:786155551508:web:71432d3c3d894b9b782001",
	measurementId: "G-VHY5GLK3C7"
};

// Initialize Firebase

var DoctorApp = firebase.initializeApp(DoctorAppConfig, "Doctors");

export default class LoadingScreen extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		DoctorApp.auth().onAuthStateChanged(Doctor => {
			if (Doctor) {
				this.props.navigation.navigate("Home")
			}
			else {
				firebase.auth().onAuthStateChanged(User => {
					this.props.navigation.navigate(User ? "Home" : "InitialPage")
				});
			}
		});
	}

	render() {
		return (
			<View style={Styles.Container}>
				<Logo />
				<Text style={Styles.LogoText}>
					Welcome to my App!
				</Text>
				<View style={Styles.LoadingContainer}>
					<Text style={Styles.LoadingText}>Loading...</Text>
					<ActivityIndicator color="skyblue" size="large"></ActivityIndicator>
				</View>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	Container: {
		backgroundColor: '#455a64',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	LogoText: {
		fontSize: 29,
		color: 'rgba(255,255,255,0.8)'
	},
	LoadingText: {
		fontSize: 36,
		fontWeight: "600",
		color: 'rgba(255,255,255,0.8)'
	},
	LoadingContainer: {
		flexGrow: 2,
		justifyContent: 'center'
	}
});