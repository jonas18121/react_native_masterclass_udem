# Afficher La Position Dans La Carte

Ici on va Afficher La Position de l'utilisateur Dans La Carte

Dans `PassengerScreen.js`

- `const { latitude, longitude } = state;`, On recupère la latitude et la longitude dans le state

- On met dans `MapView`

    - `showsUserLocation` pour voir le point du user

    - `followsUserLocation` pour suivre le user

    -`region`, un objet dans lequel, on va afficher une latitude, une longitude pour avoir la localisation de l'user, ainsi que latitudeDelta et longitudeDelta pour ajuster le niveau de zoom

    < MapView 
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

- `if (!latitude || !longitude) {}` pour afficher un spinner, si la latitude ou la logitude est égale à null

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