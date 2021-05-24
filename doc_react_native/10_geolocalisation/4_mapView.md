# Afficher Une Carte Avec react-native-maps

On installe react-native-maps

    > expo install react-native-maps

On a pris la logique de géolocation qui étais dans `HomeScreen.js` pour la mettre dans `PassengerScreen.js`

- On importe MapView depuis react-native-maps

    import MapView from 'react-native-maps';

- Dans le composant `MapView`, on met un style pour avoir une hauteur et une largeur du téléphone depuis `Dimesions` `mapStyle: {width: width,height: height}`

    const { width, height } = Dimensions.get("window");

Dans `PassengerScreen.js`

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