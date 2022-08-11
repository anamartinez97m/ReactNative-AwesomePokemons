import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { BottomTabNavigator } from './BottomTabNavigator';
import { UserLogin } from './UserLogin';
import { UserRegistration } from './UserRegistration';

const Stack = createStackNavigator();

function UserRegistrationScreen() {
	return (
	  <>
		<StatusBar />
		<SafeAreaView>
		  <UserRegistration />
		</SafeAreaView>
	  </>
	);
}

function UserLoginScreen() {
	return (
	  <>
		<StatusBar />
		<SafeAreaView>
		  <UserLogin />
		</SafeAreaView>
	  </>
	);
}

export const StackNavigator = () => {

    return (
        <Stack.Navigator 
            screenOptions={() => ({
                headerShown: false
                })
            }
        >
            <Stack.Screen name="Login" component={UserLoginScreen} />
            <Stack.Screen name="Register" component={UserRegistrationScreen} />
            <Stack.Screen name="TabNavigator" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
};