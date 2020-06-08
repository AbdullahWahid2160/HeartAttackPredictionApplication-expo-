import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import * as firebase from 'firebase';

import Logo from '../Components/Logo';
import KeyboardShift from '../Components/KeyboardShift';

export default class SignUpPage extends Component {

	constructor(props) {
		super(props)
		this.validator = new SimpleReactValidator();
		this.state = {
			FirstName: "",
			LastName: "",
			Email: "",
			Password: "",
			ConfirmPassword: "",
			ErrorMessage: null,
			Name: "",
			DataAge: this.props.route.params.age,
			DataGender:this.props.route.params.gender,
			DataHeight:this.props.route.params.height,
			DataWeight:this.props.route.params.weight,
			DataSmoker:this.props.route.params.smoker,
			DataAlcoholic:this.props.route.params.alcohlic,
			DataActivity:this.props.route.params.activity,
		};
	}

	FieldsFilled = () => {
		const { FirstName, LastName, Email, Password, ConfirmPassword } = this.state
		if (FirstName == "") {
			alert("First Name is required")
			return false
		}
		if (LastName == "") {
			alert("Last Name is required")
			return false
		}
		if (Email == "") {
			alert("Email is required")
			return false
		}
		if (Password == "") {
			alert("Password is required")
			return false
		}
		if (ConfirmPassword == "") {
			alert("Password Confirmation is required")
			return false
		}
		if (Password != ConfirmPassword) {
			alert("Confirmed Password should be same as Password")
			return false
		}
		return true
	}

	HandleSignUp = () => {
		if (this.FieldsFilled() == true) {
			this.state.Name = this.state.FirstName.concat(" ", this.state.LastName);
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.Email, this.state.Password)
				.then((response) => {
					console.log("Successful !"),
						firebase.database().ref('UsersList/').child(response.user.uid).set({
							email: this.state.Email,
							firstname: this.state.FirstName,
							lastname: this.state.LastName,
							gender:this.state.DataGender,
							age:this.state.DataAge,
							height:this.state.DataHeight,
							weight:this.state.DataWeight,
							smoker:this.state.DataSmoker,
							alcoholic:this.state.DataAlcoholic,
							activity:this.state.DataActivity
						}).then(() => {
							//success callback
							console.log("Inserted")
							this.props.navigation.navigate("Home")
						}).catch((error) => {
							//error callback
							console.log('error ', error)
						})
				})
				.catch(error => this.setState({ ErrorMessage: error.message }));
		}
		else {

		}
	}

	render() {
		return (
			<KeyboardShift>
				{() => (
					<View style={Styles.Container}>

						<Logo />

						<View style={Styles.FormContainer}>
							<TextInput style={Styles.InputBox}
								placeholder="First Name"
								placeholderTextColor='rgba(255,255,255,0.5)'
								autoCapitalize='words'
								onChangeText={(value) => this.setState({ FirstName: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.secondTextInput.focus(); }}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.secondTextInput = input; }}
								placeholder="Last Name"
								placeholderTextColor='rgba(255,255,255,0.5)'
								autoCapitalize='words'
								onChangeText={(value) => this.setState({ LastName: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.thirdTextInput.focus(); }}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.thirdTextInput = input; }}
								placeholder="Email"
								placeholderTextColor='rgba(255,255,255,0.5)'
								autoCapitalize='none'
								onChangeText={(value) => this.setState({ Email: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.fourthTextInput.focus(); }}
								keyboardType='email-address'
							/>

							{this.validator.message('email', this.state.Email, 'email')}

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.fourthTextInput = input; }}
								placeholder='Password'
								secureTextEntry={true}
								placeholderTextColor='rgba(255,255,255,0.5)'
								autoCapitalize='none'
								onChangeText={(value) => this.setState({ Password: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.fifthTextInput.focus(); }}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.fifthTextInput = input; }}
								placeholder='Confirm Password'
								secureTextEntry={true}
								placeholderTextColor='rgba(255,255,255,0.5)'
								autoCapitalize='none'
								onChangeText={(value) => this.setState({ ConfirmPassword: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
							/>

							<TouchableOpacity style={Styles.Button}>
								<Text style={Styles.ButtonText} onPress={this.HandleSignUp}>
									SignUp
								</Text>
							</TouchableOpacity>
						</View>

						<View style={Styles.SignUpTextContainer}>
							<Text style={Styles.SignUpText}>Already have an Account!  </Text>
							<TouchableOpacity>
								<Text
									style={Styles.SignUpButton}
									onPress={() => this.props.navigation.navigate('Login')}>
									Login
								</Text>
							</TouchableOpacity>
							<Text style={Styles.SignUpText}>  Here.</Text>
						</View>
					</View>
				)}
			</KeyboardShift>
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
	ErrorMessage: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40
	},
	ErrorText: {
		color: 'red',
		fontSize: 16,
		fontWeight: "500",
		textAlign: 'center'
	},
	FormContainer: {
		flexGrow: 1,
		marginTop: 40
	},
	InputBox: {
		marginVertical: 7.5,
		width: 300,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 16,
		paddingVertical: 5
	},
	Button: {
		backgroundColor: "#1c313a",
		borderRadius: 25,
		width: 100,
		marginVertical: 10,
		paddingVertical: 10,
		alignSelf: 'center'
	},
	ButtonText: {
		fontSize: 20,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.8)',
		textAlign: 'center'
	},
	SignUpTextContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		marginBottom: 20
	},
	SignUpText: {
		color: 'black',
		fontSize: 18,
		fontWeight: "100"
	},
	SignUpButton: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: "900"
	}
});