# Navigateurs Imbriqués

Dans `App.js`

- On crée une constante nommé `Root` qui contiendra notre deuxièmes navigateur que l'on va imbriqué dans le premier navigateur

- `<Screen name="Root" component={Root} />`, Dans le premier navigateur, on crée un screen qui va faire appel à la constante `Root`

- L'écran `Root` va nous rendre un navigateur directement

Dans `App.js`

    import React from 'react';
    import { 
        View, 
        Text, 
        StyleSheet, 
    } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';

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
                    <Screen name="Root" component={Root} />
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



Dans `LoginScreen.js`

- On met en place nos boutons "Aller à Home" et "Aller à profile", chaque appel une fonction différente

- pour accéder au screen qui est dans le navigateur `Root`, on doit mettre en deuxième argument, un objet qui aura comme propriété :

    - `params:`, pour les paramètres a passé, s'il y en a

    - `screen:`, pour savoir vers quel écran, on veut aller

    `const goHome = () => props.navigation.navigate("Root", { params: {}, screen: "Home" });`

Dans `LoginScreen.js`


    import React, { useEffect } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

    const LoginScreen = (props) => {

        const goBack = () => props.navigation.goBack("welcome");

        const goHome = () => props.navigation.navigate("Root", {
            params: {},
            screen: "Home"
        });

        const goProfile = () => props.navigation.navigate("Root", {
            params: {},
            screen: "Profile"
        });
        
        
        return (


            <View style={ styles.container }>
                <Text>Login Screen</Text>

                <TouchableOpacity onPress={ goHome }>
                    <View style={ styles.button }>
                        <Text> Aller à Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={ goProfile }>
                    <View style={ styles.button }>
                        <Text> Aller à Profile</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={ goBack }>
                    <View style={ styles.button }>
                        <Text> Retour en arrière</Text>
                    </View>
                </TouchableOpacity>
            </View>


        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgrey"
        }, 
        button: {
            marginTop: 10,
            backgroundColor: "lightblue",
            borderColor: "darkblue",
            borderWidth: 2,
            justifyContent: "center",
            width: 100,
            height: 40
        }
    });

    export default LoginScreen;