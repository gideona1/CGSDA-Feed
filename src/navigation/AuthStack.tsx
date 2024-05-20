import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InitialScreen from '../screens/InitialScreen/InitialScreen';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';

export type AuthParamList = {
  'Auth/Initial': undefined;
  'Auth/Login': undefined;
  'Auth/Signup': undefined;
};

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth/Initial"
        component={InitialScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Auth/Login"
        component={Login}
        options={{
          headerShown: false,
          presentation: 'formSheet',
        }}
      />
      <Stack.Screen
        name="Auth/Signup"
        component={Signup}
        options={{
          headerShown: false,
          presentation: 'formSheet',
        }}
      />
    </Stack.Navigator>
  );
};
