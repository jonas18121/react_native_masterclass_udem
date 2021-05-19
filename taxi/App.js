// import { StatusBar } from 'expo-status-bar';
import React, { useEffect }from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import LoginScreen from './src/screens/LoginScreen';

const { Navigator, Screen } = createStackNavigator();

export default function App() {

    useEffect(() => {
        StatusBar.setBackgroundColor("#2dbb54");
    }, []);

    return (
      
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name='Login' component={LoginScreen} />
            </Navigator>
        </NavigationContainer>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
