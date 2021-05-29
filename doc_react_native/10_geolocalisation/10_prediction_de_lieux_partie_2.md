# Obtenir Des Prédictions De Lieux (Partie 2)

Dans `PlaceInput.js`

- `const PlaceInput = ({ latitude, longitude })`, on récupère en props, la latitude et longitude qui viennent depuis `PassengerScreen.js`

- const url = ` ${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}&origin=${latitude},${longitude}&radius=2000&language=fr` , 

    - on passe la latitude et la longitude dans le paramètre `origin`, 

    - `radius` = le rayon de recherche

    - `language` = le langage de traduction

- on installe axios

    > yarn add axios

    ou

    > npm install axios

- On importe axios

    import axios from 'axios';    

- Dans la fonction `handleChangeText()` on va appelé une autre fonction nommé `search()`, que l'on va créer

- Dans la constant `initialState`, on met une nouvelle propriété preidiction avec un tableau vide:  `prediction: []`

- Dans la fonction `search()`, on un blog `try catch` et dedans

    - `const { data : { prediction } } = await axios.get(url);`, On recupère la réponse 

    - `setState(prevState => ({...prevState,prediction}));` et on modifie le state

Dans `PlaceInput.js`

    import React, { useState } from 'react';
    import { 
        TextInput,
        View ,
        StyleSheet,
        Dimensions
    } from "react-native";
    import { Ionicons } from '@expo/vector-icons';
    import axios from 'axios';

    import { prefix, BASE_URL, API_KEY } from '../utils/helpers';

    const { width, height } = Dimensions.get('window');

    const initialState = {
        place: "",
        prediction: []
    };

    const PlaceInput = ({ latitude, longitude }) => {

        const [ state, setState ] = useState(initialState);

        const { container, icon, input, inputContainer } = styles;

        const { place } = state;

        const search = async url => {
            try {

                const { data : { prediction } } = await axios.get(url);

                setState(prevState => ({
                    ...prevState,
                    prediction
                }));

            } catch (error) {
                console.error('Erreur search : ', error);
            }
        }

        const handleChangeText = value => {
            setState(prevState => ({
                ...prevState,
                place: value
            }));
            const url = `${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}&origin=${latitude},${longitude}&radius=2000&language=fr`
            console.log('url', url);

            search(url)
        }


        return (

            <View style={container}>
                <View style={inputContainer}>
                    <TextInput
                        style={input}
                        value={place}
                        onChangeText={handleChangeText}
                    />
                    <Ionicons 
                        style={icon}
                        name={`${prefix}-search`} 
                    />
                </View>
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



Dans `PassengerScreen.js`

- Depuis le composant `PassengerScreen.js`, on passe au composant `PlaceInput.js` la latitude et la longitude

    `<PlaceInput latitude={latitude} longitude={longitude} />`


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

    import PlaceInput from '../components/PlaceInput';

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

                <PlaceInput latitude={latitude} longitude={longitude} />
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