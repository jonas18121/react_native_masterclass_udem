# Cacher Les Predictions Avant De Tracer Une Route

Ici on va Cacher Les Predictions Avant De Tracer Une Route

### Dans PlaceInput.js

- Dans la propriété `onPress` de du composant `<Prediction />`, 

    - on va mettre a jour la propriété `prediction` du `state` en lui passant un tableau vide

    - on va mettre a jour la propriété `place` du `state` de façon a ce qu'il soit egale, au nom de la destination sur lequel on à cliquer

Dans `PlaceInput.js`

    import React, { useState } from 'react';
    import { 
        TextInput,
        View ,
        StyleSheet,
        Dimensions,
        ActivityIndicator
    } from "react-native";
    import { Ionicons } from '@expo/vector-icons';
    import axios from 'axios';
    import Prediction from './Prediction';

    import { prefix, BASE_URL, API_KEY } from '../utils/helpers';

    const { width, height } = Dimensions.get('window');

    const initialState = {
        place: "",
        prediction: [],
        loading: false
    };

    const PlaceInput = ({ latitude, longitude, onPredictionPress }) => {

        const [ state, setState ] = useState(initialState);

        const { container, icon, input, inputContainer } = styles;

        const { place, loading, prediction } = state;

        /**
        * 
        * recherche une prediction 
        */
        const search = async url => {
            try {

                const { data : { prediction } } = await axios.get(url);

                setState(prevState => ({
                    ...prevState,
                    prediction,
                    loading: false
                }));

            } catch (error) {
                console.error('Erreur search : ', error);
            }
        }

        const handleChangeText = value => {
            setState(prevState => ({
                ...prevState,
                place: value,
                loading: true
            }));
            const url = `${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}&location=${latitude},${longitude}&radius=2000&language=fr`
            console.log('url', url);

            search(url)
        }

        /**
        * 
        * retoune chaque ville/rue/pays/entreprise d'une prédiction
        */
        const renderPredictions = () => {
            return prediction.map(prediction => {

                const { structure_formatting, id, place_id } = prediction;

                return (
                    <Prediction 
                        main_text={structure_formatting.main_text}
                        secondary_text={structure_formatting.secondary_text}
                        key={id}
                        onPress={() => {
                            onPredictionPress(place_id);
                            setState(prevState => ({
                                ...prevState,
                                prediction: [],
                                place: structure_formatting.main_text
                            }));
                        }}
                    />
                );
            });
        }


        return (

            <View style={container}>
                <View style={inputContainer}>
                    <TextInput
                        style={input}
                        value={place}
                        onChangeText={handleChangeText}
                    />

                    {!loading &&

                        <Ionicons 
                            style={icon}
                            name={`${prefix}-search`} 
                        />
                    }

                    {loading && <ActivityIndicator />}
                </View>

                { (!loading && prediction.length > 0) && renderPredictions() }
            </View>
        );
    } 

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            top: 20,
            borderRadius: 8,
            paddingHorizontal: 10,
            width: width - 50,
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: "#fff",
            elevation: 5,
        },
        icon : {
            fontSize: 25,
            color: "#d6d6d6",
        },
        input: {
            fontSize: 16,
            color: '#303030',
            maxWidth: '70%',
            minWidth: '30%',
            fontFamily: 'Poppins'
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10
        }
    }); 

    export default PlaceInput;



### Dans PassengerScreen.js

- Pour changer la grosseur et la couleur de la route qui a été tracer sur la map, on va dans le composant `<Polyline />` et on va jouer avec les propriétés `strokeWidth={4}` et `strokeColors="#2dbb54"`

    < Polyline 
        coordinates={coordinates}
        strokeWidth={4}
        strokeColors="#2dbb54"
    />


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
                                strokeWidth={4}
                                strokeColors="#2dbb54"
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