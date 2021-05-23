# Connexion Via Google Avec Expo ( partie 2 )

On continue la connexion via Google avec Expo

1) Dans le site de Expo, onglet API Reference, page Google : https://docs.expo.io/versions/v41.0.0/sdk/google/

2) On copie la configuration de google et on le colle dans le fichier `utils/helpers.js` par exemple

    const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: `<YOUR_IOS_CLIENT_ID_FOR_EXPO>`,
        androidClientId: `<YOUR_ANDROID_CLIENT_ID_FOR_EXPO>`,
        iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
    });

Dans `utils/helpers.js`

- On a impoter Google depuis `'expo-google-app-auth';`

    import * as Google from 'expo-google-app-auth';

- On a coller la constante `config` de Google

- Depuis notre console.cloud.google.com : https://console.cloud.google.com/apis/credentials

    - On a pris la clé pour Android et la clé pour IOS pour les mettres dans la constante `config` 

    - `iosClientId:` pour IOS

    - `androidClientId:` pour Android

- On a créer une fonction asyncrone `auth` , dedans :

    - On cree la connexion via Google et on récupère le resultat de ce qui est retourner `user`, `type`, `acessToken`
    
        `const { user, type, acessToken } = await Google.logInAsync(config);`

    - `if (type === 'success')` on vérifie que le `type` retourner est bien égale à succèss 

    - Si c'est bon, on peut stocker l'user dans notre BDD mysql

    - Puis stocker l'user dans la memoire interne du téléphone

Dans `utils/helpers.js`


    import { Platform } from 'react-native';
    import * as Google from 'expo-google-app-auth';

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

            console.log('result', result);

            if (type === 'success') {
                
                // c'est ici que l'on peut stocker l'user dans notre BDD mysql


                // là on va stocker l'user dans la memoire interne
            }

        } catch (error) {
            console.error('Erreur d\'autentification : ', error);
        }
    }



Dans `LoginBtn.js`

- Lorsqu'on clique sur le bouton `Google Connexion`, `<TouchableOpacity onPress={onPress}>` appelle la props `onPress` pour remoter la hierarchie, cette props viens de `LoginScreen.js`

Dans `LoginBtn.js`

    import  React from 'react';
    import {
        Text,
        View,
        StyleSheet,
        Image,
        TouchableOpacity,
        Dimensions
    } from 'react-native';

    import Logo from '../../assets/images/google.png';

    // composant
    import Title from './Title';


    const { width, height } = Dimensions.get('window');

    const LoginBtn = ({ onPress }) => {

        const { logo, container } = styles;

        return (

            <TouchableOpacity onPress={onPress}>
                <View style={container}>
                    <Title size="small" content="Google Connexion" />
                    <Image source={Logo} style={logo} />
                </View>
            </TouchableOpacity>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: width - 80,
            height: 55,
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: "#fff",
            elevation: 5,
            borderRadius: 10
        },
        logo: {
            width: 40,
            height: 40
        }
    });

    export default LoginBtn;


Dans `Loginscreen.js`

- Lorsqu'on a cliquer sur le bouton `LoginBtn.js` (`<LoginBtn onPress={handleLogin} />` ) on appel la fonction `handleLogin`

- On a importer la fonction `auth` depuis le fichier `/utils/helpers.js`

- `handleLogin` appel la fonction `auth` qui vient depuis le fichier `/utils/helpers.js`

C'est bon !!!


Dans `Loginscreen.js`

    import React from 'react';
    import { StyleSheet, Text, View, Dimensions } from 'react-native';
    import Constants from 'expo-constants';
    import { Ionicons } from '@expo/vector-icons';
    import { prefix, auth } from '../utils/helpers';

    //composant
    import Block from '../components/Block';
    import Title from '../components/Title';
    import LoginBtn from '../components/LoginBtn';

    const { width, height } = Dimensions.get("window");


    const LoginScreen = (props) => {

        const { container, icon, container_2, titlecontainer } = styles;

        const handleLogin = () => auth();
        

        return (

            <View style={container}>

                <Block>
                    <Ionicons name={`${prefix}-car`} style={icon} />
                    <Title content="TAXI APP" size="big"/>
                </Block>

                <View style={container_2}>
                    <View style={titlecontainer}>
                        <Title content="Authentification" size="small"/>
                        <Title content="Google Connexion" size="medium"/>
                    </View>

                    <LoginBtn onPress={handleLogin} />
                </View>

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
        },
        icon: {
            fontSize: 80,
            color: "#fff"
        },
        container_2: {
            flexGrow: 1,
            justifyContent: "space-around",
            alignItems: "center",
        },
        titlecontainer: {
            width: width - 80,
            height: 50,
            justifyContent: "center",
            alignItems: "flex-start"
        }
    });

    export default LoginScreen;