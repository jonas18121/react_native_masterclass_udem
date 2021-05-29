# Obtenir Des Prédictions De Lieux (Partie 1)

On va Obtenir Des Prédictions De Lieux qui correspond au terme qu'il aura rentrer dans le champ

Les Prédictions sont comme des auto complétions

RDV syr le site de `google map plateform` dans l'onglet `Place Autocomplete` https://developers.google.com/maps/documentation/places/web-service/autocomplete


Dans `utilis/helpers.js`

- on stocker l'url de base qu'on voit de puis le site de `google map plateform`

    /**
    * url de base pour Google Map API
    */
    export const BASE_URL = "https://maps.googleapis.com/maps/api";

- On di url de base car cette partie ne changera pas durant tous nos requête vers `Google Map API` 

- Description : https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters

    - `place` = car on est sur `Google Palce API`

    - `autocomplete` = car on a sélectionner l'onglet autocomplete 

    - `output` = le rendu qui peut être soit `json` (recommendé), ou soit `xml`

    - `parameters` = ce sont les paramètre que l'on va passé dans l'url

    - 2 paramètre obligatoire : 

    1) `input` = c'est les mot que l'on va entre dans le champ input de notre map

    2) `key`, = notre clé d'API

    - les autres paramètres qui ne sont pas obligatoire sont sur le site 

Dans `utilis/helpers.js`

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
    export const API_KEY = "AIzaSyDmvr28g9YHimCnVKu0aK-5z5KIl6BzpCU";

    /**
    * url de base pour Google Map API
    */
    export const BASE_URL = "https://maps.googleapis.com/maps/api";






Dans `PlaceInput.js`

- `const [ state, setState ] = useState(initialState);` , notre state

- `const initialState = {place: ""};` notre state initiale 

- ` const { place } = state;` on destructure le state

- `value={place}` et `onChangeText={handleChangeText}` dans l'input

- Dans `handleChangeText` on met a jour notre state et on a mis l'url de google api

    const url = `${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}`

- Si on fais un teste et qu'on récupère le resultat depuis le console.log(), on pourra coller le resultat dans l'url le plus haut ne notre navigateur, et on verra une réponse en `json`, 

- si on a une erreur, c'est parce qu'il faut créer un compte google de facturation dans notre google.console.cloud. sinon tout est bon

- A cette étape avec le `console.log('url', url);` , On devrait avoir une Objet JSON qui représente la prédiction avec , description, id etc...

Dans `PlaceInput.js`

    import React, { useState } from 'react';
    import { 
        TextInput,
        View ,
        StyleSheet,
        Dimensions
    } from "react-native";
    import { Ionicons } from '@expo/vector-icons';

    import { prefix, BASE_URL, API_KEY } from '../utils/helpers';

    const { width, height } = Dimensions.get('window');

    const initialState = {
        place: ""
    };

    const PlaceInput = props => {

        const [ state, setState ] = useState(initialState);

        const { container, icon, input, inputContainer } = styles;

        const { place } = state;

        const handleChangeText = value => {
            setState(prevState => ({
                ...prevState,
                place: value
            }));
            const url = `${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}`
            console.log('url', url);
        }


        return (

            <View style={container}>
                <View style={inputContainer}>
                    <TextInput
                        style={input}
                        value={place}
                        onChangeText={handleChangeText}
                    />
                    <Ionicons 
                        style={icon}
                        name={`${prefix}-search`} 
                    />
                </View>
            </View>
        );
    } 

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            top: 20,
            borderRadius: 8,
            paddingHorizontal: 10,
            width: width - 50,
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: "#fff",
            elevation: 5,
        },
        icon : {
            fontSize: 25,
            color: "#d6d6d6",
        },
        input: {
            fontSize: 16,
            color: '#303030',
            maxWidth: '70%',
            minWidth: '30%',
            fontFamily: 'Poppins'
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10
        }
    }); 

    export default PlaceInput;