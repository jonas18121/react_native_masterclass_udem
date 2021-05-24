import React, { useState, useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar
 } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get("window");

const initialState = { latitude: null, longitude: null };

const PassengerScreen = props => {

    const [state, setState ] = useState(initialState);

    const { container, mapStyle } = styles;

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
        StatusBar.setBackgroundColor("transparent");
    }, []);

    return (
        <View style={container}>
            <MapView style={mapStyle} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    mapStyle: {
        width: width,
        height: height
    }
});

export default PassengerScreen;