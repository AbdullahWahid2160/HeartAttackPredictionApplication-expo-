import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import * as firebase from 'firebase';

import Logo from '../Components/Logo';
import KeyboardShift from '../Components/KeyboardShift';

export default class DoctorLogin extends Component {

  constructor(props) {
    super(props)
    this.validator = new SimpleReactValidator();
    this.state = {
      Email: "",
      Password: "",
      ErrorMessage: null,
    };
  }

  FieldsFilled = () => {
    const { Email, Password } = this.state
    if (Email == "" && Password == "") {
      alert("Email is required")
      return false
    }
    else if (Password == "") {
      alert("Password is required")
      return false
    }
    else
      return true
  }

  HandleLogin = () => {
    if (this.FieldsFilled() == true) {
      if (this.validator.allValid()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.Email, this.state.Password)
          .then(() => {
            firebase
              .database()
              .ref('UsersList/')
              .child(firebase.auth().currentUser.uid)
              .on('value', snapshot => {
                var Role = (snapshot.val().role);
                if (Role == "Doctor") {
                  this.props.navigation.navigate("DoctorPanel")
                }
                else {
                  console.log("Yavaaa gaya hy bsdka")
                }
              });
          })
          .catch(error => this.setState({ ErrorMessage: error.message }))
      }
      else {
        <Text style={Styles.SignUpButton}>
          {this.validator.message('email', this.state.Email, 'required|email', 'text-danger')}
        </Text>
      }
    }
  }

  render() {
    this.validator.purgeFields();
    return (
      <KeyboardShift>
        {() => (
          <View style={Styles.Container}>

            <Logo />

            <View style={Styles.ErrorMessage}>
              {this.state.ErrorMessage && <Text style={Styles.ErrorText}>{this.state.ErrorMessage}</Text>}
            </View>

            <View style={Styles.FormContainer}>
              <TextInput style={Styles.InputBox}
                placeholder="Email"
                placeholderTextColor='rgba(255,255,255,0.5)'
                autoCapitalize='none'
                onChangeText={(email) => this.setState({ Email: email })} value={this.state.Email}
                clearTextOnFocus={true}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                keyboardType='email-address'
              />
              <TextInput style={Styles.InputBox}
                ref={(input) => { this.secondTextInput = input; }}
                placeholder='Password'
                placeholderTextColor='rgba(255,255,255,0.5)'
                autoCapitalize='none'
                onChangeText={(password) => this.setState({ Password: password })}
                clearTextOnFocus={true}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={true}
                keyboardType='default'
              />
              <TouchableOpacity style={Styles.LoginButton}>
                <Text style={Styles.ButtonText} onPress={this.HandleLogin}>
                  Login
						    </Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.SignUpTextContainer}>
              <Text style={Styles.SignUpText}>Don't have an Account yet!  </Text>
              <TouchableOpacity>
                <Text
                  style={Styles.SignUpButton}
                  onPress={() => this.props.navigation.navigate('DoctorSignUp')}>
                  SignUp
						    </Text>
              </TouchableOpacity>
              <Text style={Styles.SignUpText}>  Here.</Text>
            </View>
          </View >
        )
        }
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
    marginTop: 70
  },
  ErrorText: {
    color: 'red',
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'center'
  },
  FormContainer: {
    flexGrow: 1,
    marginTop: 50
  },
  ButtonContainer: {
    marginBottom: 80,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  InputBox: {
    marginVertical: 10,
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingVertical: 5
  },
  LoginButton: {
    width: 100,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
    alignSelf: 'center'
  },
  DoctorButton: {
    flexGrow: 1,
    marginHorizontal: 90,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: -30,
    paddingVertical: 10,
    marginTop: 20,
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
    marginVertical: 20
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