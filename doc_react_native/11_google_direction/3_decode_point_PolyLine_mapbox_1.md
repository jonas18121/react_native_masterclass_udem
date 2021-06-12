# Décoder Le Point Avec PolyLine De Mapbox partie 1

le retour dans le navigateur d'une route

    {
        "geocoded_waypoints": [...],
        "routes": [
            {
                "bounds": {...}
                "copyrights": "Map data @2020",
                "legs": [...],
                "overview_polyline": {
                    "points": "blabla|blablablabla_blablabla_blablabla{blablablabla}@blablablabla@blablablabla"
                },
                "summary": "Boulevard Du 30 Juin",
                "warning": [],
                "waypoint_order": []
            }
        ],
        "status": "OK"
    }


- Un point est un objet avec une propriété `latitude` et une propriété `longitude`

exemple :

    const point = { latitude: xxx, longitude: yyy };

- Une route est une succession des points, il sera représenté comme un tableau de plusieurs points, le premier point est l'orgine et les dernier point est la destination 

exemple :

    const route = [  
        { latitude: aaa, longitude: bbb }, 
        { latitude: ccc, longitude: ddd }, 
        { latitude: eee, longitude: fff },
        { latitude: ggg, longitude: hhh } 
    ]

- pour pouvoir tansformé le point en route, on va utiliser mapbox, on va l'installer en ligne de commande

    > yarn add @mapbox/polyline



### Dans utils/helpers.js

- On importe `axios` depuis `axios`

- On importe `PolyLine` depuis `'@mapbox/polyline'`, qui va nous permettre de décoder les points d'une routes

- On va créer une fonction `getRoute()` pour récupérer la propriété points, du tableau route qu'on voit tout en haut

- On va créer une fonction `decodePoint()` pour decoder les ponts avec `const fixPoints = PolyLine.decode(point);`

Dans `utils/helpers.js`

import { Platform } from 'react-native';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PolyLine from '@mapbox/polyline';

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
    // await new Promise.all([
    //     AsyncStorage.setItem('accessToken', ''),
    //     AsyncStorage.setItem('user', ''),
    // ]);

    const keys = ['user', 'accessToken'];
    await AsyncStorage.multiRemove(keys);

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

/**
 * récupère les points d'une route
 * @param {} url 
 * @returns 
 */
export const getRoute = async url => {
    try {

        const { data : { route } } = await axios.get(url);

        const points = routes[0].overview_polyline.points;

        return points;
        
    } catch (error) {
        console.error(`Erreur : ${error}`);
    }
}

/**
 * décode les point d'une route
 * @param {*} point 
 */
export const decodePoint = point => {

    const fixPoints = PolyLine.decode(point);

    console.log('fixPoints', fixPoints)

};

### Dans PassengerScreen.js

- On importe `getRoute` et `decodePoint` depuis `'../utils/helpers'`

- Dans la fonction `handlePredictionPress()`, a partir de l'url, 

    - on va utiliser `getRoute` pour récupérer la propriété points, du tableau route qu'on voit tout en haut : `const points = await getRoute(url);`

    - on va utiliser `decodePoint(points);` pour decoder le point que `getRoute` a retourner

Dans `PassengerScreen.js`

    import React, { useState, useEffect } from 'react';
    import { 
        View,
        Text,
        StyleSheet,
        Dimensions,
        ActivityIndicator,
        TouchableWithoutFeedback,
        Keyboard
    } from 'react-native';
    import Constants from 'expo-constants';
    import MapView from 'react-native-maps';
    import * as Location from 'expo-location';

    import PlaceInput from '../components/PlaceInput';
    import { BASE_URL, API_KEY, getRoute, decodePoint } from '../utils/helpers';

    const { width, height } = Dimensions.get("window");

    const initialState = { latitude: null, longitude: null };

    const PassengerScreen = props => {

        const [state, setState ] = useState(initialState);

        const { latitude, longitude } = state;

        const { container, mapStyle } = styles;

        /**
        * donne une route lorsqu'on clique sur une prediction
        * @param {*} place_id 
        */
        const handlePredictionPress = async place_id => {

            try {
                const url = `${BASE_URL}/directions/json?key=${API_KEY}&destination=place_id:${place_id}&origin=${latitude},${longitude}`;

                const points = await getRoute(url);

                decodePoint(points);

            } catch (error) {
                console.log(`Error prediction press : ${error}`);
            }
        }

        /**
        * geoloc
        */
        const getUserLocation = async () => {

            try {

                let { status } = await Location.requestForegroundPermissionsAsync();

                if(status !== "granted"){
                    console.error("Erreur : L'application n'a pas l'autorisation");
                }

                const { coords : { latitude, longitude } } = await Location.getLastKnownPositionAsync({ enableHighAccuracy: true });

                setState(prevState => ({
                    ...prevState,
                    latitude: latitude,
                    longitude: longitude 
                }));

                console.log(latitude, longitude);
                
            } catch (error) {
                console.error('Erreur : ', error );
            }
        }

        useEffect(() => {
            getUserLocation();
        }, []);

        if (!latitude || !longitude) {
            
            return (
                <View style={container}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={container}>

                    <MapView 
                        style={mapStyle} 
                        showsUserLocation
                        followsUserLocation
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.121
                        }}
                    />

                    <PlaceInput 
                        latitude={latitude} 
                        longitude={longitude}
                        onPredictionPress={handlePredictionPress}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff"
        },
        mapStyle: {
            width: width,
            height: height
        }
    });

    export default PassengerScreen;