# Afficher Une Alerte


### Dans DriverScreen.js

- On importe `Alert` depuis `react-native`

- Dans `io.on('requestTaxi', passInfo => {}` qui est dans `searchPassenger()`

    - On va appeler `Alert.alert()`, on pourra lui passer 4 arguments

        - En 1er argument, le titre de l'alert, qui est obligatoire

        - En 2èmes argument, le message de l'alert, pas obligatoire

        - En 3èmes argument, un tableau de boutons, pas obligatoire ( Dans le tableau de boutons, chaques objets représente un bouton, et chaques objets doit avoir une propriété `text` et une propriété `onPress`)

        - En 4èmes argument, des options, pas obligatoire

        Alert.alert(
            "Passager trouver",
            "Acceptez-vous la course ?",
            [
                {
                    text: "Refuser",
                    onPress: () => {}
                },
                {
                    text: "Accpter",
                    onPress: () => {
                        io.emit('requestPassenger', { latitude, longitude });
                    }
                }
            ],
            {
                cancelable: false
            }
        );

Dans `DriverScreen.js`

    import React, { useState, useEffect } from 'react';
    import { 
        View,
        StyleSheet,
        Dimensions,
        ActivityIndicator,
        Alert
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

                //requête pour chercher un passager
                io.emit('requestPassenger', {latitude, longitude});

                io.on('requestTaxi', passInfo => {

                    setState(prevState => ({
                        ...prevState,
                        destinationCoords: {
                            latitude: passInfo.latitude,
                            longitude: passInfo.longitude
                        }
                    }));

                    Alert.alert(
                        "Passager trouver",
                        "Acceptez-vous la course ?",
                        [
                            {
                                text: "Refuser",
                                onPress: () => {}
                            },
                            {
                                text: "Accpter",
                                onPress: () => {
                                    io.emit('requestPassenger', { latitude, longitude });
                                }
                            }
                        ],
                        {
                            cancelable: false //pour ne pas masquer l'alert, si on clik a l'extérieure de l'alert
                        }
                    );
                })
            })
        }


### Dans PassengerScreen.js

- On importe `Alert` depuis `react-native`

- `Alert.alert("Taxi en route");`, on affiche que le titre de l'alert

Dans `PassengerScreen.js`

    import React, { useState, useEffect, useRef } from 'react';
    import { 
        View,
        Text,
        StyleSheet,
        Dimensions,
        ActivityIndicator,
        TouchableWithoutFeedback,
        Keyboard,
        Alert
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
        destinationCoords: null,
        taxiCoords: null
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
            });

            io.on('requestPassenger', taxiInfo => {

                Alert.alert("Taxi en route");

                setState(prevState => ({
                    ...prevState,
                    taxiCoords: {
                        latitude: taxiInfo.lat,
                        longitude: taxiInfo.long
                    }
                }));
            })
        }