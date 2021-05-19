# Créer Un Nouveau Projet et Design De Notre Ecran LoginScreen

Dans `App.js`

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
            StatusBar.setBackgroundColor("yellow");
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


Dans `LoginScreen.js`

    import React from 'react';
    import { StyleSheet, Text, View } from 'react-native';
    import Constants from 'expo-constants';


    const LoginScreen = (props) => {

        const { container } = styles;

        return (

            <View style={container}>
                <Text style={{ color: "black", marginTop: 30}}>Login Screen</Text>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff"
        }
    });

    export default LoginScreen;