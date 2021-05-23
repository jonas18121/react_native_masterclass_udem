// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

// screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

// utils
import { renderIntialScreen } from './src/utils/helpers';

const { Navigator, Screen } = createStackNavigator();

export default function App() {

    const [loading, setLoading] = useState(true);

    const [initialScreen, setInitilaScreen] = useState("Login");

    const loadRessources = async () => {
        try {
            await Font.loadAsync({
                Poppins:      require('./assets/fonts/Poppins-Regular.ttf'),
                LeckerliOne:  require('./assets/fonts/LeckerliOne-Regular.ttf')
            });

            const screen = await renderIntialScreen();
            if(screen) setInitilaScreen(screen);

            setLoading(false);

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

                {/* // spinner */}
                <ActivityIndicator />
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
