# Configurer React Navigation

Ce qu'on va faire :

- 1) Importer `NavigationContainer` à partir de `@react-navigation/native`

    - `NavigationContainer` est un composant qui gère notre aborescence de navigation
    
    - `NavigationContainer` contient la `state` de la navigation

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