# Configuer Le Header

site : https://reactnavigation.org/docs/screen-options/

Pour Configuer Le Header d'un `screen` (écran), on ajoute une propriété `options` dans le composant `<screen>`

Dans `App.js`

- Dans le `screen` de `login` :

    - On a enlevé la flèche de retour `headerLeft : ` à gauche
    - On a renommé le titre `title :`
    - On a changer la couleur du background du header `headerStyle:`
    - On a mis en blanc tout text qui serait dans le header `headerTintColor:`
    - On a mis le texte du titre en gras `headerTitleStyle:`

- Dans le `screen` de `Root`, `Welcome` et `profile`, on a cacher leurs header, `options={{ headerShown: false }}`

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
                
            </Navigator>
        );

        return (
            <NavigationContainer>
                <Navigator>
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
                                headerLeft : null,
                                title : "Connexion",
                                headerStyle: {
                                    backgroundColor: "orange",
                                },
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