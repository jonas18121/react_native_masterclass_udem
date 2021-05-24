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
