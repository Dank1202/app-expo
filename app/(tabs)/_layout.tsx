import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import SignUpScreen from './SignUpScreen';
import ReservationScreen from './ReservationScreen';
import { UserProvider } from '@/context/UserContext'; // Importa el UserProvider

type CarItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type RootStackParamList = {
  Login: undefined;
  Search: undefined;
  SignUp: undefined;
  Reservation: { car: CarItem };
  CarDetails: { car: CarItem };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => (
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
    <Stack.Screen
      name="Reservation"
      component={ReservationScreen}
      options={{ title: 'Reservation' }}
    />
  </Stack.Navigator>
);

export default function Layout() {
  return (
    <UserProvider> {/* Asegúrate de envolver todo en UserProvider */}
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{ title: 'Home' }}
        />
      </Tab.Navigator>
    </UserProvider>
  );
}
