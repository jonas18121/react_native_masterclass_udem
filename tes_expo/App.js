import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const { Navigator, Screen } = createStackNavigator();

const App = () => {

    const Root = () => (

        <Navigator>
            <Screen name="Home" component={HomeScreen} />
            <Screen name="Profile" component={ProfileScreen} />
        </Navigator>
    );

    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="Welcome" component={WelcomeScreen} />
                <Screen name="Login" component={LoginScreen} />
                <Screen name="Root" component={Root} options={(option) => {
                    return {
                        headerLeft: null,
                        title: null,
                        headerShown: false
                    }
                }}/>
            </Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35
    }
});

export default App;