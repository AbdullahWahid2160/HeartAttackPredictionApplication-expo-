import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import * as firebase from 'firebase';

import Logo from '../Components/Logo';
import KeyboardShift from '../Components/KeyboardShift';

var Cholest = [
	{ label: "Normal", value: 1 },
	{ label: "Above Normal", value: 2 },
	{ label: "Way Above Normal", value: 3 },
];

var Gluc = [
	{ label: "Normal", value: 1 },
	{ label: "Above Normal", value: 2 },
	{ label: "Way Above Normal", value: 3 },
];

export default class PredictionPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			User: firebase.auth().currentUser.uid,
			Hi_BP: 0,
			Lo_BP: 0,
			Cholesterol: 0,
			Glucose: 0,
			DataAge: 0,
			DataGender: null,
			DataHeight: 0,
			DataWeight: 0,
			DataSmoker: null,
			DataAlcoholic: null,
			DataAcivity: null,
			FullName: "",
		};
	}

	async componentDidMount() {
		firebase
			.database()
			.ref('UsersList/')
			.child(this.state.User)
			.on('value', snapshot => {
				var FirstName = (snapshot.val().firstname);
				var LastName = (snapshot.val().lastname);
				var Gender = (snapshot.val().gender);
				var Age = (snapshot.val().age);
				var Height = (snapshot.val().height);
				var Weight = (snapshot.val().weight);
				var Smoker = (snapshot.val().smoker);
				var Alcoholic = (snapshot.val().alcoholic);
				var Activity = (snapshot.val().activity);

				this.setState({
					FullName: FirstName + " " + LastName,
					DataGender: Gender,
					DataAge: Age,
					DataHeight: Height,
					DataWeight: Weight,
					DataSmoker: Smoker,
					DataAlcoholic: Alcoholic,
					DataAcivity: Activity,
				});
			});
	}


	HandleSubmit = () => {
		const { Result } = this.state
		fetch('http://192.168.1.115:5000/api', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'mode': 'no-cors',
			},
			body: JSON.stringify({
				Age: this.state.DataAge,
				Gender: this.state.DataGender,
				Height: this.state.DataHeight,
				Weight: this.state.DataWeight,
				Ap_Hi: this.state.Hi_BP,
				Ap_Lo: this.state.Lo_BP,
				Cholesterol: this.state.Cholesterol,
				Gluc: this.state.Glucose,
				Smoke: this.state.DataSmoker,
				Alco: this.state.DataAlcoholic,
				Active: this.state.DataAcivity
			}),
		})
			.then((response) => response.json())
			.then(responseJson => {
				this.setState({
					Result: responseJson
				});
				console.log(responseJson);
			})
			.catch(err => {
				console.log(err);
			});
		alert("Submitted !");
	};

	render() {
		return (
			<KeyboardShift>
				{() => (
					<View style={Styles.Container}>

						<Logo />

						<Text style={Styles.TextStyle}>Welcome {this.state.FullName} !</Text>

						<View style={Styles.ErrorMessage}>
							{this.state.ErrorMessage && <Text style={Styles.ErrorText}>{this.state.ErrorMessage}</Text>}
						</View>

						<View style={Styles.FormContainer}>
							<TextInput style={Styles.InputBox}
								ref={(input) => { this.BPHighTextInput = input; }}
								placeholder='Blood Pressure (High)'
								placeholderTextColor='rgba(255,255,255,0.5)'
								onChangeText={(value) => this.setState({ Hi_BP: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.BPLowTextInput.focus(); }}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.BPLowTextInput = input; }}
								placeholder='Blood Pressure (Low)'
								placeholderTextColor='rgba(255,255,255,0.5)'
								onChangeText={(value) => this.setState({ Lo_BP: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
							/>
						</View>

						<Text style={Styles.TextStyle}>
							Your Cholesterol Level is
						</Text>

						<View style={Styles.CheckBoxContainer}>
							<RadioForm
								radio_props={Cholest}
								initial={-1}
								onPress={(cholest) => this.setState({ Cholesterol: cholest })}
								buttonSize={10}
								buttonColor={'teal'}
								selectedButtonColor={'teal'}
								labelColor={'rgba(255,255,255,0.8)'}
								selectedLabelColor={'rgba(255,255,255,0.8)'}
								formHorizontal={true}
								radioStyle={{ paddingHorizontal: 5, marginLeft: 4 }}
							/>
						</View>

						<Text style={Styles.TextStyle}>
							Your Glucose Level is
						</Text>

						<View style={Styles.CheckBoxContainer}>
							<RadioForm
								radio_props={Gluc}
								initial={-1}
								onPress={(gluc) => this.setState({ Glucose: gluc })}
								buttonSize={10}
								buttonColor={'teal'}
								selectedButtonColor={'teal'}
								labelColor={'rgba(255,255,255,0.8)'}
								selectedLabelColor={'rgba(255,255,255,0.8)'}
								formHorizontal={true}
								radioStyle={{ paddingHorizontal: 5, marginLeft: 4 }}
							/>
						</View>

						<TouchableOpacity style={Styles.SubmitButton}>
							<Text style={Styles.ButtonText} onPress={this.HandleSubmit}>
								Submit
								</Text>
						</TouchableOpacity>

						<Text style={Styles.PredictionText}>
							Prediction : {this.state.Result}
						</Text>

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
	TextStyle: {
		fontSize: 20,
		fontWeight: '500',
		color: 'skyblue',
		paddingBottom: 80
	},
	ErrorMessage: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	ErrorText: {
		color: 'red',
		fontSize: 16,
		fontWeight: "500",
		textAlign: 'center'
	},
	FormContainer: {
		flexGrow: 1,
		marginTop: -30,
		paddingBottom: 50
	},
	CheckBoxContainer: {
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: -70,
		paddingBottom: 40
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
	SubmitButton: {
		backgroundColor: "#1c313a",
		borderRadius: 25,
		marginBottom: 20,
		marginTop: 10,
		paddingVertical: 10,
		alignSelf: 'center'
	},
	ButtonText: {
		fontSize: 20,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.9)',
		textAlign: 'center',
		paddingHorizontal: 20,
		paddingBottom: 5
	},
	PredictionText: {
		fontSize: 20,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.9)',
		textAlign: 'center',
		paddingBottom: 100
	}
});