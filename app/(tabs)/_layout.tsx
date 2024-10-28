import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import SignUpScreen from './SignUpScreen';

export type RootStackParamList = {
  Login: undefined;
  Search: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ title: 'Search' }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{ title: 'Sign Up' }}
    />
  </Stack.Navigator>
);

export default function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{ title: 'Home' }}
      />
      {/* Puedes agregar más pestañas aquí si lo necesitas */}
    </Tab.Navigator>
  );
}
