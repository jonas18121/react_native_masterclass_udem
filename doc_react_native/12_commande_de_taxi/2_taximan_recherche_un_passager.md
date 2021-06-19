# Le Taximan Recherche Un Passager

On va installer une librairie pour nous permettre de communiquer avec socket.io coté serveur 
(Notre serveur node `udemy-taxi-app-backend`)

    > yarn add socket.io-client

On va prendre l'adresse ip local de l'ordinateur

    pour windows

    > ipconfig

    pour linux ou mac

    > ifconfig

### Dans helpers.js

- `export const SERVER_URL = "http://xxx.xxx.xxx.x:4000";` on met notre adresse ip dans une constante et on l'importe 

Dans `helpers.js`


    import { Platform } from 'react-native';
    import * as Google from 'expo-google-app-auth';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import axios from 'axios';
    import PolyLine from '@mapbox/polyline';

    {
        code ....
    }

    /**
    * adresse ip locale
    */
    export const SERVER_URL = "http://xxx.xxx.xxx.x:4000";

    {
        code ....
    }


### Dans DriverScreen.js

- On importe la constante `SERVER_URL` depuis `'../utils/helpers'`

- On importe `SocketIO` depuis `'socket.io-client'` pour communiquer avec le serveur node.js

- On crée une variable `io`

- On crée la fonction `searchPassenger()` qui va chercher un passager, il va prendre en argument une latitude et une longitude

- Dans `searchPassenger()`

    - `io = SocketIO.connect(SERVER_URL);` On ce connecte au serveur, en lui passant notre adresse ip et on met le tout dans la variable `io`

    - `io.on('connect', () => {})` on verifie si la connexion a reussie

    - si la connexion a reussie, dans `io.on('connect', () => {})` on va dire au serveur que l'on cherche un passager, avec latitude, longitude du taximan `io.emit('requestPassenger', {latitude, longitude});`

- On appel `searchPassenger({latitude, longitude})` dans la fonction ` getUserLocation()`


Dans `DriverScreen.js`


    import React, { useState, useEffect } from 'react';
    import { 
        View,
        StyleSheet,
        Dimensions,
        ActivityIndicator,
    } from 'react-native';
    import Constants from 'expo-constants';
    import MapView from 'react-native-maps';
    import * as Location from 'expo-location';
    import SocketIO from 'socket.io-client';
    import { SERVER_URL } from '../utils/helpers';

    let io;

    const { width, height } = Dimensions.get("window");

    const initialState = { 
        latitude: null, 
        longitude: null,
        coordinates: [],
        destinationCoords: null 
    };

    const DriverScreen = props => {

        const [state, setState ] = useState(initialState);

        const { 
            latitude, 
            longitude,
        } = state;

        const { container, mapStyle } = styles;

        /**
        * 
        * chercher un passager 
        */
        const searchPassenger = ({latitude, longitude}) => {
            io = SocketIO.connect(SERVER_URL);
            io.on('connect', () => {
                console.log('connexion taxi réussie');

                io.emit('requestPassenger', {latitude, longitude});
            })
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

            searchPassenger({latitude, longitude});
            
        } catch (error) {
            console.error('Erreur : ', error );
        }
    }

    {
        code ....
    }