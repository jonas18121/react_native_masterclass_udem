# Configurer React Navigation

Ce qu'on va faire :

- 1) Importer `NavigationContainer` à partir de `@react-navigation/native`

    - `NavigationContainer` est un composant qui gère notre aborescence de navigation
    
    - `NavigationContainer` contient le `state` de la navigation, c'est un objet qui contient 2 propriétés importante qui sont également des objets : `navigation` et `route`

        Object {
            "navigation": Object {
                "addListener": [Function addListener],
                "canGoBack": [Function canGoBack],
                "dangerouslyGetParent": [Function dangerouslyGetParent],
                "dangerouslyGetState": [Function anonymous],
                "dispatch": [Function dispatch],
                "goBack": [Function anonymous],
                "isFocused": [Function isFocused],
                "navigate": [Function anonymous],
                "pop": [Function anonymous],
                "popToTop": [Function anonymous],
                "push": [Function anonymous],
                "removeListener": [Function removeListener],
                "replace": [Function anonymous],
                "reset": [Function anonymous],
                "setOptions": [Function setOptions],
                "setParams": [Function anonymous],
            },
            "route": Object {
                "key": "Welcome-XLmclT-eOHr7X4x_8FO5-",
                "name": "Welcome",
                "params": undefined,
            },
        } 

    - `NavigationContainer` doit envelopper tous les navigateurs (Navigators) de notre application
    
    - `NavigationContainer` est généralement rendu à la racine de notre application (App.js)

- 2) Importer `createStackNavigator` à partir de `@react-navigation/stack`

    - `createStackNavigator` est la fonction qui va nous permettre de créer notre `Stack Navigator`
    
    - `createStackNavigator` renvoie un objet contenant 2 propriétés : `Navigator` (navigateur) et `Screen` (écran) 

    - Ces 2 propriétés sont des composants `React` utilisés pour configurer le `Navigator` (navigateur)

    - Le `Navigator` (navigateur) doit contenir des `Screen` (écran) comme enfants, donc un `Navigator` (navigateur) doit avoir plusieurs `Screen` (écran) comme enfant

    - Le `Screen` (écran) nous permet de définir un Ecran dans le `Navigator` (navigateur)

    - Chaque `Screen` (écran) doit avoir un nom et un composant à rendre en tant qu'écran


## On test tous ça

### Etape 1

Dans `App.js`

- On importe `NavigationContainer` à partir de `@react-navigation/native`

- On importe `createStackNavigator` à partir de `@react-navigation/stack`

- On met `createStackNavigator` dans une constante nommé `Stack`

- On fait un `console.log();` de la constante `Stack`, pour voir les 2 propriétés : `Navigator` (navigateur) et `Screen` (écran) 



Dans `App.js`

    import React from 'react';
    import { 
        View, 
        Text, 
        StyleSheet, 
    } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';

    const Stack = createStackNavigator();
    console.log('Stack', Stack);

    const App = () => {

        return (
            <View style={styles.container}></View>
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


### Etape 2

1) On va creer quelques fichiers `Screen` (écran) pour les affichés sur notre téléphone

    - On creer un dossier nommé `screen` et dedans, on va creer quelques fichiers `Screen` (écran)
    - HomeScreen.js, LoginScreen.js, profileScreen.js, WelcomeScreen.js

2) Dans chaque fichiers `Screen` (écran), on va mettre un code simple et similaire pour l'instant, il y aura juste le mot qui sera devant Screen qui va changer

Dans `HomeScreen.js` et les autres fichiers `Screen` (écran)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

    const HomeScreen = (props) => {
        
        return (

            <View style={ styles.container }>
                <Text>Home Screen</Text>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgrey"
        }
    });

    export default HomeScreen;


Dans `App.js`

- Maintenant qu'on a vérifier que `createStackNavigator()` retourne bien les 2 propriétés :  `Navigator` (navigateur) et `Screen` (écran) 

- On le déstructure : `const { Navigator, Screen } = createStackNavigator();`

- On met le composant `NavigationContainer` qui va entourré le composant `Navigator` 

- Le composant `Navigator` va entourré le composant `Screen`

- Le premier composant `Screen` sera celui qui sera afficher par défaut à l'utilisateur

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

    const { Navigator, Screen } = createStackNavigator();

    const App = () => {

        return (
            <NavigationContainer>
                <Navigator>
                    <Screen name="Welcome" component={WelcomeScreen} />
                    <Screen name="Login" component={LoginScreen} />
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