# Notre Composant DriverScreen

On va creer notre composant DriverScreen qui va beaucoup ressembler au composant PassengerScreen. 
donc on va juste faire un copier coller depuis PassengerScreen vers DriverScreen et on va enlever certain élément qu'on a pas besoin

DriverScreen c'est la partie du taximan


### Dans DriverScreen

Dans `DriverScreen.js`

    import React, { useState, useEffect } from 'react';
    import { 
        View,
        StyleSheet,
        Dimensions,
        ActivityIndicator,
    } from 'react-native';
    import Constants from 'expo-constants';
    import MapView from 'react-native-maps';
    import * as Location from 'expo-location';

    const { width, height } = Dimensions.get("window");

    const initialState = { 
        latitude: null, 
        longitude: null,
        coordinates: [],
        destinationCoords: null 
    };

    const DriverScreen = props => {

        const [state, setState ] = useState(initialState);

        const { 
            latitude, 
            longitude,
        } = state;

        const { container, mapStyle } = styles;

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

    export default DriverScreen;


### Dans App.js

- On importe DriverScreen

- `<Screen name='Driver' component={DriverScreen} />` , on le mettre en screen

Dans `App.js`


    // import { StatusBar } from 'expo-status-bar';
    import React, { useState, useEffect }from 'react';
    import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import * as Font from 'expo-font';
    import * as MediaLibrary from 'expo-media-library';

    // screens
    import LoginScreen from './src/screens/LoginScreen';
    import HomeScreen from './src/screens/HomeScreen';
    import PassengerScreen from './src/screens/PassengerScreen';
    import DriverScreen from './src/screens/DriverScreen';

    // utils
    import { renderIntialScreen } from './src/utils/helpers';

    const { Navigator, Screen } = createStackNavigator();

    export default function App() {

        const [loading, setLoading] = useState(true);

        const [initialScreen, setInitilaScreen] = useState("Login");

        const loadRessources = async () => {
            try {

                const result = await new Promise.all([

                    Font.loadAsync({
                        Poppins:      require('./assets/fonts/Poppins-Regular.ttf'),
                        LeckerliOne:  require('./assets/fonts/LeckerliOne-Regular.ttf')
                    }),
                    renderIntialScreen(),
                    MediaLibrary.requestPermissionsAsync()
                ]);

                const route = result[1];
                const status = result[2].status ;

                if(route && status === "granted" ) {
                    setInitilaScreen(route);
                    setLoading(false);
                }

            } catch (error) {
                console.error("error loading ressources", error);
            }        
        }

        useEffect(() => {
            loadRessources();
            StatusBar.setBackgroundColor("#2dbb54");
        }, []);

        if (loading) {
            
            return (
                <View style={styles.container}>

                    <ActivityIndicator />{/* // spinner */}
                </View>
            );
        }

        return (
        
            <NavigationContainer>
                <Navigator 
                    screenOptions={{ headerShown: false }}
                    initialRouteName={initialScreen}
                >
                    <Screen name='Login' component={LoginScreen} />
                    <Screen name='Home' component={HomeScreen} />
                    <Screen name='Passenger' component={PassengerScreen} />
                    <Screen name='Driver' component={DriverScreen} />
                </Navigator>
            </NavigationContainer>
        );
    }



    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    });



### Dans HomeScreen.js

Dans `HomeScreen.js`

 on met la direction pour aller dans la partie du taximan `onPress={() => goTo("Driver")}`