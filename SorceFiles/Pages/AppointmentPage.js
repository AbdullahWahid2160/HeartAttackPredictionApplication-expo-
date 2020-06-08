import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class AppointmentPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			FullName: "",
			User: firebase.auth().currentUser.uid
		};
	}

	componentDidMount() {
		firebase
			.database()
			.ref('UsersList/')
			.child(this.state.User)
			.on('value', snapshot => {
				var FirstName = (snapshot.val().firstname);
				var LastName = (snapshot.val().lastname);
				this.setState({
					FullName: FirstName + " " + LastName,
				});
			});
	}

	HandleLogOut = () => {
		firebase.auth().signOut();
		this.props.navigation.navigate("InitialPage")
	};

	render() {
		return (
			<View style={Styles.Container}>
				<Text>Welcome {this.state.FullName} !</Text>

				<TouchableOpacity style={Styles.LogoutButton}>
					<Text style={Styles.ButtonText} onPress={this.HandleLogOut}>
						Logout
					</Text>
				</TouchableOpacity>
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
	HealthButton: {
		backgroundColor: "#1c313a",
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 10,
		alignSelf: 'center'
	},
	BookApntButton:{
		backgroundColor: "#1c313a",
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 10,
		alignSelf: 'center',
		width:200
	},
	LogoutButton: {
		backgroundColor: "#1c313a",
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 10,
		alignSelf: 'center'
	},
	ButtonText: {
		fontSize: 20,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.9)',
		textAlign: 'center',
		paddingHorizontal:20,
		paddingBottom:5
	},
});