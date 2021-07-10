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
                    ref={mapView}
                    style={mapStyle} 
                    showsUserLocation
                    followsUserLocation
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.121
                    }}
                >
                    {coordinates.length > 0 && (
                        <Polyline 
                            coordinates={coordinates}
                            strokeWidth={8}
                            strokeColors="#2dbb54"
                        />
                    )}

                    {destinationCoords && ( <Marker coordinate={destinationCoords} />)}
                </MapView>

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