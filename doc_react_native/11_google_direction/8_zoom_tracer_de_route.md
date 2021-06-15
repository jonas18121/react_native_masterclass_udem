# Ajuster Le Niveau De Zoom En Traçant Une Route

Ici on va Ajuster Le Niveau De Zoom sur la carte

### Dans PassengerScreen.js

- On va importer `useRef` depuis `react` pour obtenir une reférence de la carte

- `const mapView = useRef();` On met le hook `useRef` dans une constante

- On appel la fonction `fitToCoordinates` depuis la constante `mapView` qu'on va créer avec `useRef`, c'est grace aux paramètres que l'on va mettre dedans que l'on va pouvoir faire le zoom du traçage de la route sur la carte : `mapView.current.fitToCoordinates()`

- Dans `fitToCoordinates` 

    - On va mettre en premier agument les coordonnées de la route 

    - En 2èmes argument on va lui passé un objet qui des options pour géré le zoom 

        - `animated: true,` pour que ça soit animer 

        - `edgePadding:` ça va nous permettre de mettre un padding par rapport à la taille de la carte dans le téléphone,  et c'est ça qui va faire le zoom sur le tracage de la route sur la carte, donc faudra géré les propriétés `top`, `left`, `bottom` et `right` , ça va faire un rectangle qui contiendra le tracage de la route sur la carte

c'est bon

Dans `PassengerScreen.js`

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

        const mapView = useRef();

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