# Cacher Le Clavier Pour Ne Pas Gêner

ici , on cacher le clavier lorsque une liste de prédiction s'affiche, afin de ne pas géner l'utilisateur

Dans `PassengerScreen.js`

- On importe `TouchableWithoutFeedback` depuis react native pour que ça soit touchable sans que cela ce remarque

- On importe l'api `Keyboard` depuis react native pour cacher le clavier

- `<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>` pour cacher le clavier

- `Keyboard.dismiss()` cache le clavier

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

                    <PlaceInput latitude={latitude} longitude={longitude} />
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


Dans `Prediction.js`

- `numberOfLines={1}` mettre le texte sur une seul ligne 

Dans `Prediction.js`

    import React from 'react';
    import { 
        View,
        Text,
        StyleSheet
    } from 'react-native';

    const Prediction = ({ main_text, secondary_text }) => {

        const { secondary, main, container } = styles;

        return (
            <View style={ container }>
                <Text style={ secondary } numberOfLines={1}>{ secondary_text }</Text>
                <Text style={ main }>{ main_text }</Text>
            </View>
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