# Notre composant PlaceInput

Dans `component/PlaceInput.js`

    import React from 'react';
    import { 
        TextInput,
        View ,
        StyleSheet
    } from "react-native";
    import { Ionicons } from '@expo/vector-icons';

    import { prefix } from '../utils/helpers';

    const PlaceInput = props => {
        return (

            <View>
                <View>
                    <TextInput />
                    <Ionicons name={`${prefix}-search`} />
                </View>
            </View>
        );
    } 

    const styles = StyleSheet.create({

    }); 

    export default PlaceInput;


Dans `PassengerScreen.js`

- On import notre composant `PlaceInput.js` et on l'utilise

Dans `PassengerScreen.js`


    import React, { useState, useEffect } from 'react';
    import { 
        View,
        Text,
        StyleSheet,
        Dimensions,
        ActivityIndicator,
    } from 'react-native';
    import Constants from 'expo-constants';
    import MapView from 'react-native-maps';
    import * as Location from 'expo-location';

    import PlaceInput from '../utils/helpers';

    const { width, height } = Dimensions.get("window");

    const initialState = { latitude: null, longitude: null };

    const PassengerScreen = props => {

        const [state, setState ] = useState(initialState);

        const { latitude, longitude } = state;

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
                <PlaceInput />
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

    export default PassengerScreen;