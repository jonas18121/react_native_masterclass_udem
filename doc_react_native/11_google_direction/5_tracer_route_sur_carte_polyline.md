# Tracer Une Route Sur La Carte Avec Polyline

Ici on va Tracer Une Route Sur La Carte Avec Polyline

### Dans PassengerScreen.js

- On importe `Polyline` depuis `react-native-maps`.

- Dans `initialState` on va rajouter une propriété `coordinates` avec comme valeur par défaut `[]` et une propriété `destinationCoords` avec comme valeur par défaut `null`

    - `coordinates` représente la route qu'on a décoder

    - `destinationCoords` représente les coordonnées en latitude et longitude du lieux de destination 

- Dans `handlePredictionPress` on va mettre `decodePoint(points);` dans une constante : `const coordinates = decodePoint(points);`

- puis on fait un `setState()` pour mettre à jours `coordinates` et `destinationCoords` dans le `state`, `destinationCoords: coordinates[coorninates.length - 1]` pour avoir les dernier coordonnées

- On destructure le `state` pour prendre `coordinates` et `destinationCoords`


- On met `Polyline` a l'intérieur de `MapView`, en lui passant les coordonnées de la route `coordinates={coordinates}`

    {coordinates.length > 0 && ( < Polyline  coordinates={coordinates} /> )}

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
    import MapView, { Polyline } from 'react-native-maps';
    import * as Location from 'expo-location';

    import PlaceInput from '../components/PlaceInput';
    import { BASE_URL, API_KEY, getRoute, decodePoint } from '../utils/helpers';

    const { width, height } = Dimensions.get("window");

    const initialState = { 
        latitude: null, 
        longitude: null,
        coordinates: [],
        destinationCoords: null 
    };

    const PassengerScreen = props => {

        const [state, setState ] = useState(initialState);

        const { 
            latitude, 
            longitude,
            coordinates,
            destinationCoords 
        } = state;

        const { container, mapStyle } = styles;

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
                }))

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
                    >
                        {coordinates.length > 0 && (
                            <Polyline 
                                coordinates={coordinates}
                            />
                        )}
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