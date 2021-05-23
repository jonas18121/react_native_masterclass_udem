# Stockage Interne Avec AsyncStorage

## Installer AsyncStorage

    > yarn add @react-native-async-storage/async-storage

## Notre code

Dans `utils/helpers.js`

- On importe `AsyncStorage` depuis `'@react-native-async-storage/async-storage'`

- `AsyncStorage.setItem('key', 'value in string')`, pour enregister dans le stockage interne du téléphone, on met (une `clé` et une `valeur`) en chaine de caractère, et pour récupéré : `await AsyncStorage.getItem('key');`

- ` const { name, photoUrl, email } = user;`  de puis `user` on déstructure pour récupéré le `name`, `photoUrl`, `email`

- `await AsyncStorage.setItem('user', JSON.stringify({ name, photoUrl, email }));` ,  on transforme le `name`, `photoUrl`, `email` en chaine de caractère et on les met dans le stockage du téléphone.

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