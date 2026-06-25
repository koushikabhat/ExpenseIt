import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';



const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='LoginScreen'
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />

      {/* <Stack.Screen
        name="NotificationScreen"
        component={}
      /> */}

    </Stack.Navigator>
  );
}