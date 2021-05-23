# Définir L'Ecran Initial Du Navigateur

Pourquoi définir un écran intial ?

Si un utilisateur se connecte puis, il ferme l'application sans se déconnecter, au moment ou il va revenir sur notre application, normalement il ne devrait pas a avoir a ce reconnecter puisqu'il ne sait pas déconnecter, donc il faut qu'on lui affiche la page d'acceuil.
Et s'il ne sait pas connecter, il faut qu'on lui affiche la page de connexion.

## Notre code

Dans `utils/helpers.js`

- On cree une fonction nomm" `renderIntialScreen` dedans on met un block `try catch`

    - on recupère les données de l'utilisateur qui sont en `chaine de caractères`, `const user = await AsyncStorage.getItem('user');`

    - `JSON.parse(user);`, on transforme les données de l'utilisateur en `objet`

    - `return user ? "Home" : "Login";` puis on fait une condition ternaire pour dire que si les données de l'utilisateur existent dans la constante `user`, on retourne le mot "Home", sinon, on retourne le mot "Login", ces 2 mots vont représenter l'écran initiale qu'on va affiché à l'utilisateur

Dans `utils/helpers.js`

    import { Platform } from 'react-native';
    import * as Google from 'expo-google-app-auth';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    export const prefix = Platform.OS === "ios" ? "ios" : "md";

    const config = {
        expoClientId: `<YOUR_WEB_CLIENT_ID>`,
        iosClientId: `402337104340-mtiadn36k0a7chj5utejs0s4u437gfdl.apps.googleusercontent.com`,
        androidClientId: `402337104340-mvh3r80pvmv60051ss7jl71nlk8ncc94.apps.googleusercontent.com`,
        iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
    };

    export const auth = async () => {

        try {
            
            const { user, type, acessToken } = await Google.logInAsync(config);

            console.log('result', user);

            if (type === 'success') {
                
                // c'est ici que l'on peut stocker l'user dans notre BDD mysql


                // là on va stocker l'user dans la memoire interne

                const { name, photoUrl, email } = user;

                await AsyncStorage.setItem('user', JSON.stringify({
                    name,
                    photoUrl,
                    email
                }));

                console.log('Naviguer vers home');
            }

        } catch (error) {
            console.error('Erreur d\'autentification : ', error);
        }
    }

    export const renderIntialScreen = async () => {

        try {

            const user = await AsyncStorage.getItem('user');
            JSON.parse(user);

            return user ? "Home" : "Login";
            
        } catch (error) {
            console.error('Erreur de rendu d\'écran initial : ', error);
        }
    }

Dans `App.js`

- On importe renderIntialScreen 

    import { renderIntialScreen } from './src/utils/helpers';

- `const [initialScreen, SetInitilaScreen] = useState("Login");` On crée un nouveau `state` avec comme valeur initiale "Login" 

- dane la fonction `loadRessources` : 

    - On appel la fonction `renderIntialScreen()` et on stock son résultat dans la constante `screen`

        const screen = await renderIntialScreen();

    - On fait une condition `if` qui dit que s'il y a un mot dans `screen` on le met dans le state avec `setInitilaScreen`
    
        if(screen) setInitilaScreen(screen); 

- Pour choisir un écran initiale, on va mettre notre `state` `initialScreen` dans la propriété `initialRouteName` dans le composant `Navigartor` 


    < Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={initialScreen}
    >

- Par défaut `initialScreen` est égale à "Login", mais si un utilisateur a ses données encore stocker dans le stockage du téléphone , `initialScreen` sera égale à "Home"

Dans `App.js`

    // import { StatusBar } from 'expo-status-bar';
    import React, { useState, useEffect }from 'react';
    import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import * as Font from 'expo-font';

    // screens
    import LoginScreen from './src/screens/LoginScreen';
    import HomeScreen from './src/screens/HomeScreen';

    // utils
    import { renderIntialScreen } from './src/utils/helpers';

    const { Navigator, Screen } = createStackNavigator();

    export default function App() {

        const [loading, setLoading] = useState(true);

        const [initialScreen, setInitilaScreen] = useState("Login");

        const loadRessources = async () => {
            try {
                await Font.loadAsync({
                    Poppins:      require('./assets/fonts/Poppins-Regular.ttf'),
                    LeckerliOne:  require('./assets/fonts/LeckerliOne-Regular.ttf')
                });

                const screen = await renderIntialScreen();
                if(screen) setInitilaScreen(screen);

                setLoading(false);

            } catch (error) {
                console.error("error loading ressources", error);
            }        
        }

        useEffect(() => {
            loadRessources();
            StatusBar.setBackgroundColor("#2dbb54");
        }, []);

        if (loading) {
            
            return (
                <View style={styles.container}>

                    {/* // spinner */}
                    <ActivityIndicator />
                </View>
            );
        }

        return (
        
            <NavigationContainer>
                <Navigator 
                    screenOptions={{ headerShown: false }}
                    initialRouteName={initialScreen}
                >
                    <Screen name='Login' component={LoginScreen} />
                    <Screen name='Home' component={HomeScreen} />
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
