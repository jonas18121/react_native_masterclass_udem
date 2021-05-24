# Notre Composant PassengerScreen


Dans `PassengerScreen.js`

- On crée notre composant PassengerScreen

Dans `PassengerScreen.js`

    import React from 'react';
    import { 
        View,
        Text,
        StyleSheet
    } from 'react-native';
    import Constants from 'expo-constants';

    const PassengerScreen = props => {

        const { container } = styles;

        return (
            <View style={container}>
                <Text>Passenger Screen</Text>
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
    });

    export default PassengerScreen;



Dans `App.js`

- On importe notre composant `PassengerScreen.js` et on créer un nouvel écran avec

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



Dans `HomeScreen.js`

- `onPress={() => goTo("Passenger")}` dans le composant `RoundBtn.js` afin de pouvoir accéder à la page `PassengerScreen.js`

- `const goTo = route => props.navigation.navigate(route);`

Dans `HomeScreen.js`

    import React from 'react';
    import { StyleSheet, Text, View, Dimensions } from 'react-native';
    import Constants from 'expo-constants';
    import { Ionicons } from '@expo/vector-icons';
    import { prefix, logout } from '../utils/helpers';

    //composant
    import Block from '../components/Block';
    import Title from '../components/Title';
    import RoundBtn from '../components/RoundBtn';

    const { width, height } = Dimensions.get("window");


    const HomeScreen = (props) => {

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




Dans `RoundBtn.js`

- `<TouchableOpacity onPress={onPress}>`, afin de pouvoir passé l'évènnement `onPress` a `HomeScreen.js`

Dans `RoundBtn.js`

    import React from 'react';
    import {
        View,
        TouchableOpacity,
        StyleSheet
    } from 'react-native';
    import { Ionicons } from "@expo/vector-icons";

    const RoundBtn = ({ iconName, onPress }) => {

        const { container, iconStyle } = styles;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={container}>
                    <Ionicons 
                        name={iconName} 
                        style={iconStyle}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2dbb54",
            height: 80,
            width: 80,
            borderRadius: 40,
            
        },
        iconStyle : {
            fontSize: 40,
            color: "#fff"
        }
    });

    export default RoundBtn;





