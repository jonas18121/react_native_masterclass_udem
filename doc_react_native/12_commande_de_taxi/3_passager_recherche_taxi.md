# Le Passager Recherche Un Taxi

ici le passager pourra emettre le veut de vouloir prendre un taxi


### Dans passengerScreen.js 

- On importe la constante `SERVER_URL` depuis `'../utils/helpers'`

- On importe `SocketIO` depuis `'socket.io-client'` pour communiquer avec le serveur node.js

- On crée une variable `io`

- On crée la fonction `connectSocket()` qui va seulement permettre au passager de se connecter au serveur

- Dans `connectSocket()`

    - `io = SocketIO.connect(SERVER_URL);` On ce connecte au serveur, en lui passant notre adresse ip et on met le tout dans la variable `io`

    - `io.on('connect', () => {})` on verifie si la connexion a reussie

- On met `connectSocket()` dans `getUserLocation()`

- Dans `handlePredictionPress()` (lorsqu'un passager clique sur une prediction), on emettre la requête pour chercher un taxi `io.emit('requestTaxi', {latitude, longitude});`


Dans `passengerScreen.js`

    import React, { useState, useEffect, useRef } from 'react';
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
    import MapView, { Polyline, Marker } from 'react-native-maps';
    import * as Location from 'expo-location';
    import SocketIO from 'socket.io-client';

    import PlaceInput from '../components/PlaceInput';
    import { BASE_URL, API_KEY, getRoute, decodePoint, SERVER_URL } from '../utils/helpers';

    const { width, height } = Dimensions.get("window");

    let io;

    const initialState = { 
        latitude: null, 
        longitude: null,
        coordinates: [],
        destinationCoords: null 
    };

    const PassengerScreen = props => {

        const [state, setState ] = useState(initialState);

        const mapView = useRef();

        const { 
            latitude, 
            longitude,
            coordinates,
            destinationCoords 
        } = state;

        const { container, mapStyle } = styles;

        const connectSocket = () => {
            io = SocketIO.connect(SERVER_URL);

            io.on('connect', () => {
                console.log('connexion passager réussie');
            })
        }

        /**
        * donne une route lorsqu'on clique sur une prediction
        * @param {*} place_id 
        */
        const handlePredictionPress = async place_id => {

            try {
                const url = `${BASE_URL}/directions/json?key=${API_KEY}&destination=place_id:${place_id}&origin=${latitude},${longitude}`;

                const points = await getRoute(url);

                const coordinates = decodePoint(points);

                setState(prevState => ({
                    ...prevState,
                    coordinates,
                    destinationCoords: coordinates[coorninates.length - 1]
                }));

                mapView.current.fitToCoordinates(coordinates, {
                    animated: true,
                    edgePadding: {
                        top: 100,
                        bottom: 40,
                        left: 40,
                        right: 40
                    }
                });

                //requête pour chercher un taxi
                io.emit('requestTaxi', {latitude, longitude});

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

                connectSocket();
                
            } catch (error) {
                console.error('Erreur : ', error );
            }
        }