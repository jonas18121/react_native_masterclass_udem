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
import BookScreen from './screens/BookScreen';

const { Navigator, Screen } = createStackNavigator();

const App = () => {

    const Root = () => (

        <Navigator>

            <Screen name="Home" component={HomeScreen} />

            <Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ headerShown: false }}  
            />

            <Screen 
                name="Book" 
                component={BookScreen}
                options={{ headerShown: false }} 
            />

        </Navigator>
    );

    return (
        <NavigationContainer>
            <Navigator
                screenOptions={(options) => {
                    return {
                        headerLeft : null,
                        title: options.route.name,
                        headerStyle: {
                            backgroundColor: "orange",
                        }
                    }
                }}
            >
                <Screen 
                    name="Welcome" 
                    component={WelcomeScreen} 
                    options={{ headerShown: false }} 
                />

                <Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={(options) => {
                        return {
                            title: "Connexion",
                            headerTintColor: "white",
                            headerTitleStyle: {
                                fontWeight: "bold"
                            }
                        }
                    }} 
                />

                <Screen 
                    name="Root" 
                    component={Root} 
                    options={{ headerShown: false }}
                />

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