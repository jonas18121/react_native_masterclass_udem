# Obtenir Une Route de Google Direction API

### Dans Perdiction.js

- On importe `TouchableOpacity` pour rendre nos prediction cliquable

- `<TouchableOpacity onPress={onPress}>`, lorsqu'on click sur une prediction, on veut remonter dans le composant `PlaceInput`

- On met `onPress` dans `const Prediction = ({ main_text, secondary_text, onPress  })` pour remonter dans le composant `PlaceInput`

Dans `Perdiction.js`

    import React from 'react';
    import { 
        View,
        Text,
        StyleSheet,
        TouchableOpacity
    } from 'react-native';

    const Prediction = ({ main_text, secondary_text, onPress  }) => {

        const { secondary, main, container } = styles;

        return (

            <TouchableOpacity onPress={onPress}>
                <View style={ container }>
                    <Text style={ secondary } numberOfLines={1}>{ secondary_text }</Text>
                    <Text style={ main }>{ main_text }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            borderTopWidth: 1,
            borderTopColor: '#f6f6f6',
            padding: 5
        },

        secondary: {
            color: "#d6d6d6",
            fontSize: 12,
            fontWeight: '300',
            fontFamily: 'poppins'
        },
        main: {
            color: "#303030",
            fontSize: 16,
            fontWeight: '700',
            fontFamily: 'poppins'
        }

    });

    export default Prediction;



### Dans PlaceInput.js

- On definit le `onpress` qui va venir depuis `Prediction.js` : `onPress={() => {onPredictionPress(place_id)}}`, et on va vouloir remonter jusqu'a `PassengerScreen.js` avec un `place_id` de la prédiction qui a été cliquer

- On met `onPredictionPress` dans `const PlaceInput = ({ latitude, longitude, onPredictionPress })` pour remonter jusqu'a `PassengerScreen.js` 

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
                            onPredictionPress(place_id)
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

- Dans `<PlaceInput latitude={latitude} longitude={longitude} onPredictionPress={handlePredictionPress}/>` on a `onPredictionPress` qui vient de `PlaceInput.js` et va appeler la fonction `handlePredictionPress`

- Dans `handlePredictionPress` en asyncrone : 

    - On récupère l'id de la prediction qui a été cliquer `place_id`

    - Puis on cree notre url

    - On veut une direction avec un retour en json : `/directions/json`

    - Notre clé : `key=${API_KEY}`

    - La destination : `destination=place_id:${place_id}`

    - Les origins : `origin=${latitude},${longitude}`

Si on fait un `console.log(url)`, on verra une url dans le terminale, si on le copie-colle dans notre navigateur , on verra que ça nous retourne une route

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
    import MapView from 'react-native-maps';
    import * as Location from 'expo-location';

    import PlaceInput from '../components/PlaceInput';
    import { BASE_URL, API_KEY } from '../utils/helpers';

    const { width, height } = Dimensions.get("window");

    const initialState = { latitude: null, longitude: null };

    const PassengerScreen = props => {

        const [state, setState ] = useState(initialState);

        const { latitude, longitude } = state;

        const { container, mapStyle } = styles;

        /**
        * donne une route lorsqu'on clique sur une prediction
        * @param {*} place_id 
        */
        const handlePredictionPress = async place_id => {

            try {
                const url = `${BASE_URL}/directions/json?key=${API_KEY}&destination=place_id:${place_id}&origin=${latitude},${longitude}`;
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
                    />

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