import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from "expo-font";
import Constants from 'expo-constants';

// SCREEN
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookScreen from './screens/BookScreen';

const { Navigator, Screen } = createStackNavigator();

const App = () => {

    const [loading, setLoading] = useState(true);

    /**
     * charger toutes nos font
     */
    const loadFont = async () => {
        try {
            
            await Font.loadAsync({
                
                "Gilroy-Bold":              require('./assets/font/fonts/Gilroy-Bold.ttf'),
                "GT-Sectra-Fine-Regular":   require('./assets/font/fonts/GT-Sectra-Fine-Regular.ttf'),
                "Montserrat-Black":         require('./assets/font/fonts/Montserrat-Black.ttf'),
                "Montserrat-Medium":        require('./assets/font/fonts/Montserrat-Medium.ttf'),
                "Montserrat-SemiBold":      require('./assets/font/fonts/Montserrat-SemiBold.ttf'),
            });

            setLoading(false);

        } catch (error) {
            console.error('erreur', error);
        }
    }

    useEffect(() => {
        loadFont();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>loading...</Text>
            </View>
        )
    }

    /**
     * Navigateur imbriquer
     */
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
                    options={{ headerShown: false}}
                />

            </Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgrey",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: Constants.statusBarHeight
    }
});

export default App;