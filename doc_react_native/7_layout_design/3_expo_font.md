# Charger Les Polices Avec expo-font


Site : https://docs.expo.io/versions/v41.0.0/sdk/font/

`expo-font` permet de charger les polices à partir du Web et de les utiliser dans les composants React Native.

## Installer expo-font

    > expo install expo-font

## Utiliser expo-font

Dans `App.js`

- On importe `Font` (police) depuis `expo-font`

- On télécharge les fonts (police) qu'on veut sur `google font` par exemple et on lee met dans le dossier `assets` de notre projet

- On crée une constante `loadFont` pour charger tous nos fonts (police) 

- Dans `loadFont`

    - On va utiliser `Font.loadAsync()` :
    
        Méthode très efficace pour charger les polices à partir de ressources statiques ou distantes qui peuvent ensuite être utilisées avec les éléments de texte natifs de la plate-forme. Dans le navigateur, cela génère un bloc dans une feuille de style partagée pour les polices. Aucun CSS n’est nécessaire pour utiliser cette méthode.

    - Dans `Font.loadAsync()`, on `require` nos `fonts` depuis le dossier `assets`

- Pour dire a `React Native` d'attendre que nos `fonts` (polices), soit complètement charger avant d'afficher nos vues, il faut :

    - Importer useState et useEffect

    - On appel `loadFont` dans le useEffect

    - On crée notre `state` sur `true` comme valeur par défaut :  `const [loading, setLoading] = useState(true);`

    - `if (loading) {}`, On crée une condition `if` pour afficher le texte `Loading...`, tant que notre state `loading` est sur `true`

    - On met `await` devant `Font.loadAsync()` pour dire a `React Native` d'attendre que nos `fonts` (polices), soit complètement charger avant de passer a autre chose

    - Puis dès que `Font.loadAsync()` à bien charger toutes nos `fonts` (polices), on utilise `setLoading()` pour passer notre state `loading` à `false`


Dans `App.js`

    import React, { useState, useEffect } from 'react';
    import { 
        View, 
        Text, 
        StyleSheet, 
    } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator, Header } from '@react-navigation/stack';
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
                        options={{ headerShown: false }}
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