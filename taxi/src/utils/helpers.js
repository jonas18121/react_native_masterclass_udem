import { Platform } from 'react-native';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PolyLine from '@mapbox/polyline';

/**
 * identifie sur quel plate forme l'utilisateur est, IOS ou Android
 */
export const prefix = Platform.OS === "ios" ? "ios" : "md";


const config = {
    expoClientId: `<YOUR_WEB_CLIENT_ID>`,
    iosClientId: `402337104340-mtiadn36k0a7chj5utejs0s4u437gfdl.apps.googleusercontent.com`,
    androidClientId: `402337104340-mvh3r80pvmv60051ss7jl71nlk8ncc94.apps.googleusercontent.com`,
    iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
    androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
};

/**
 * connexion
 */
export const auth = async () => {

    try {
        
        const { user, type, accessToken } = await Google.logInAsync(config);

        console.log('result', user);

        if (type === 'success') {
            
            // c'est ici que l'on peut stocker l'user dans notre BDD mysql


            // là on va stocker l'user dans la memoire interne

            const { name, photoUrl, email } = user;

            await AsyncStorage.setItem('user', JSON.stringify({
                name,
                photoUrl,
                email
            }));

            await AsyncStorage.setItem('accessToken', JSON.stringify({ accessToken }));


            console.log('Naviguer vers home');
        }

    } catch (error) {
        console.error('Erreur d\'autentification : ', error);
    }
}

/**
 * Déconnexion
 */
export const logout = async (props) => {

    // await Google.logOutAsync({ accessToken, ...config });
    // await new Promise.all([
    //     AsyncStorage.setItem('accessToken', ''),
    //     AsyncStorage.setItem('user', ''),
    // ]);

    const keys = ['user', 'accessToken'];
    await AsyncStorage.multiRemove(keys);

    props.navigation.navigate('Login')
}

/**
 * fourni l'écran principale
 */
export const renderIntialScreen = async () => {

    try {

        const user = await AsyncStorage.getItem('user');
        JSON.parse(user);

        return user ? "Home" : "Login";
        
    } catch (error) {
        console.error('Erreur de rendu d\'écran initial : ', error);
    }
}

/**
 * adresse ip locale
 */
export const SERVER_URL = "http://172.30.144.1:4000";

/**
 * Clé d'API Google
 */
export const API_KEY = "AIzaSyDmvr28g9YHimCnVKu0aK-5z5KIl6BzpCU";

/**
 * url de base pour Google Map API
 */
export const BASE_URL = "https://maps.googleapis.com/maps/api";

/**
 * récupère les points d'une route
 * @param {} url 
 * @returns 
 */
export const getRoute = async url => {
    try {

        const { data : { route } } = await axios.get(url);

        const points = routes[0].overview_polyline.points;

        return points;
        
    } catch (error) {
        console.error(`Erreur : ${error}`);
    }
}

/**
 * décode les point d'une route
 * @param {*} point 
 */
export const decodePoint = point => {

    const fixPoints = PolyLine.decode(point);

    const route = fixPoints.map(fixPoint => {
        return {
            latitude: fixPoint[0],
            longitude: fixPoint[1]
        }
    });

    console.log('route', route);

    return route;

};