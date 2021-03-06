# Obtenir La Géolocalisation

Ici on va obtenir des informations sur La Géolocalisation de l'utilisateur

On installe expo location

    > expo install expo-location

Dans `HomeScreen.js`

- On importe expo location

    import * as Location from 'expo-location';

- `const initialState = { latitude: null, longitude: null };`, On crée un state initiale qui sera modifier à la longue

- `const [state, setState ] = useState(initialState);` on cree notre state avec comme valeur initiale : la constante `initialState`

- On cree la fonction asyncrone `getUserLocation()` pour obtenir les informations sur La Géolocalisation

- dans `getUserLocation()`

    - `Location.requestForegroundPermissionsAsync()` pour demander à l'utilisateur son autorisation pour avoir sa localisation

    - `Location.getLastKnownPositionAsync({ enableHighAccuracy: true });` va nous permettre de recupéré la `latitude` et la `longitude`

    - On met a jours le state `setState(prevState => ({ ...prevState,latitude: latitude, longitude: longitude }));`

- On appelle `getUserLocation()` dans `useEffect()`

Dans `HomeScreen.js`

    import React, { useState, useEffect } from 'react';
    import { StyleSheet, Text, View, Dimensions } from 'react-native';
    import Constants from 'expo-constants';
    import { Ionicons } from '@expo/vector-icons';
    import { prefix, logout } from '../utils/helpers';
    import * as Location from 'expo-location';

    //composant
    import Block from '../components/Block';
    import Title from '../components/Title';
    import RoundBtn from '../components/RoundBtn';

    const { width, height } = Dimensions.get("window");

    const initialState = { latitude: null, longitude: null };

    const HomeScreen = (props) => {

        const [state, setState ] = useState(initialState);

        const userLogout = () => {
            logout(props);
        }
        
        const { 
            container, 
            icon, 
            container_2, 
            titlecontainer, 
            RoundBtnContainer 
        } = styles;


        const goTo = route => props.navigation.navigate(route);

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
                
            } catch (error) {
                console.error('Erreur : ', error );
            }
        }

        useEffect(() => {
            getUserLocation();
        }, [])

        return (

            <View style={container}>

                <Block>
                    <RoundBtn onPress={userLogout} iconName={`${prefix}-close-circle`}  />

                    <Ionicons name={`${prefix}-car`} style={icon} />
                    <Title content="TAXI APP" size="big"/>
                </Block>

                <View style={container_2}>
                    <View style={titlecontainer}>
                        <Title content="Bienvenue" size="small"/>
                        <Title content="Vous recherchez un" size="medium"/>
                    </View>

                    <View style={RoundBtnContainer}>
                        <RoundBtn 
                            iconName={`${prefix}-car`} 
                            onPress={() => goTo("Passenger")}
                        />
                        <RoundBtn 
                            iconName={`${prefix}-person`}  
                            onPress={() => goTo}
                        />
                    </View>
                </View>

            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff"
        },
        icon: {
            fontSize: 80,
            color: "#fff"
        },
        container_2: {
            flexGrow: 1,
            justifyContent: "space-around",
            alignItems: "center",
        },
        titlecontainer: {
            width: width - 80,
            height: 50,
            justifyContent: "center",
            alignItems: "flex-start"
        },

        RoundBtnContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: width - 80
        }
    });

    export default HomeScreen;