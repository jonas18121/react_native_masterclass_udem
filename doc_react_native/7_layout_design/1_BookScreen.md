# Notre Composant BookScreen

on va creer notre composant BookScreen


Dans `App.js`

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

        .....

Dans `LoginScreen` on crée un un bouton pour aller vers `BookScreen.js`

Dans `BookScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';

    const BookScreen = props => {

        return (
            <View style={ styles.container }>
                <Text>BookScreen</Text>
            </View>
        );
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            paddingBottom: 20
        }
    });

    export default BookScreen;