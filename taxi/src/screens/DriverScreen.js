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

            //requête pour chercher un passager
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
        </View>
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

export default DriverScreen;