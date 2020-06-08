import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

import InitialPage from './SorceFiles/Pages/InitialPage';
import LoadingScreen from './SorceFiles/Pages/LoadingScreen';
import LoginPage from './SorceFiles/Pages/Login';
import GetStarted from './SorceFiles/Pages/Getting_Started';
import SignUpPage from './SorceFiles/Pages/SignUp';
import HomePage from './SorceFiles/Pages/Home';
import PredictionPage from './SorceFiles/Pages/PredictionPage';
import AppointmentPage from './SorceFiles/Pages/AppointmentPage';
import DoctorLogin from './SorceFiles/Pages/DoctorLogin';
import DoctorSignUp from './SorceFiles/Pages/DoctorSignUp';
import DoctorHome from './SorceFiles/Pages/DoctorPanel';


var firebaseConfig = {
  apiKey: "AIzaSyD6lavyDVQ7EXch6PXeHx_OyTwJUvPajWU",
  authDomain: "mynewapp-87021.firebaseapp.com",
  databaseURL: "https://mynewapp-87021.firebaseio.com",
  projectId: "mynewapp-87021",
  storageBucket: "mynewapp-87021.appspot.com",
  messagingSenderId: "268251150672",
  appId: "1:268251150672:web:9579cc9b2bc089e7ab1455",
  measurementId: "G-Y6LBBWQFM3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTransparent: {
						backgroundColor: 'transparent',
					},
					headerTitleStyle: {
						color: 'rgba(255,255,255,0.7)',
					},
				}}>
        <Stack.Screen options={{ headerShown: false }} name="InitialPage" component={InitialPage} />
				<Stack.Screen options={{ headerShown: false }} name="Loading" component={LoadingScreen} />
				<Stack.Screen name="Login" component={LoginPage} />
				<Stack.Screen name="Get_Started" component={GetStarted} />
				<Stack.Screen name="SignUp" component={SignUpPage} />
				<Stack.Screen name="Home" component={HomePage} />
				<Stack.Screen name="Prediction" component={PredictionPage} />
				<Stack.Screen name="Appointment" component={AppointmentPage} />
        <Stack.Screen name="DoctorLogin" component={DoctorLogin}/>
        <Stack.Screen name="DoctorSignUp" component={DoctorSignUp}/>
        <Stack.Screen name="DoctorPanel" component={DoctorHome}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default class NewApp extends Component {
	render() {
		return (
			<App />
		);
	}
}




