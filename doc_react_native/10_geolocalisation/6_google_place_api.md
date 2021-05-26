# Activer Google Place API

- Pour activer Google Place API, on va sur ce site avec notre adresse email https://console.cloud.google.com/apis/credentials

- On selectionne, notre projet, ou on crée un nouveau projet.

- On clique sur l'onglet `API et Sercices`

- Puis on clique sur l'onglet `Bibliothèque`  

- Dedans on clique sur `Tout afficher` pour la partie des cartes

- Puis on sélectionne `Places API` et on l'active

- Puis retourne au début et on clique sur l'onglet `identifiants`

- Puis `créer des identifiants` 

- Puis `Clé d'API` et ça va créer une clé d'api

- On coupie cette clé d'api, et on le colle dans un de nos fichier; exemple dans le dossier `utils/helpers.js`

    export const API_KEY = "LA_CLE_D_API";

et c'est bon

Dans `utils/helpers.js`

    import { Platform } from 'react-native';
    import * as Google from 'expo-google-app-auth';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    /**
    * identifie sur quel plate forme l'utilisateur est, IOS ou Android
    */
    export const prefix = Platform.OS === "ios" ? "ios" : "md";


    const config = {
        expoClientId: `<YOUR_WEB_CLIENT_ID>`,
        iosClientId: `402337104340-mtiadn36k0a7chj5utejs0s4u437gfdl.apps.googleusercontent.com`,
        androidClientId: `402337104340-mvh3r80pvmv60051ss7jl71nlk8ncc94.apps.googleusercontent.com`,
        iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
    };

    /**
    * connexion
    */
    export const auth = async () => {

        try {
            
            const { user, type, accessToken } = await Google.logInAsync(config);

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

                await AsyncStorage.setItem('accessToken', JSON.stringify({ accessToken }));


                console.log('Naviguer vers home');
            }

        } catch (error) {
            console.error('Erreur d\'autentification : ', error);
        }
    }

    /**
    * Déconnexion
    */
    export const logout = async (props) => {

        // await Google.logOutAsync({ accessToken, ...config });
        await new Promise.all([
            AsyncStorage.setItem('accessToken', ''),
            AsyncStorage.setItem('user', ''),
        ]);

        props.navigation.navigate('Login')
    }

    /**
    * fourni l'écran principale
    */
    export const renderIntialScreen = async () => {

        try {

            const user = await AsyncStorage.getItem('user');
            JSON.parse(user);

            return user ? "Home" : "Login";
            
        } catch (error) {
            console.error('Erreur de rendu d\'écran initial : ', error);
        }
    }

    /**
    * Clé d'API Google
    */
    export const API_KEY = "LA_CLE_D_API";