import { Platform } from 'react-native';
import * as Google from 'expo-google-app-auth';

export const prefix = Platform.OS === "ios" ? "ios" : "md";

const config = {
    expoClientId: `<YOUR_WEB_CLIENT_ID>`,
    iosClientId: `402337104340-mtiadn36k0a7chj5utejs0s4u437gfdl.apps.googleusercontent.com`,
    androidClientId: `402337104340-mvh3r80pvmv60051ss7jl71nlk8ncc94.apps.googleusercontent.com`,
    iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
    androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
};

export const auth = async () => {

    try {
        
        const { user, type, acessToken } = await Google.logInAsync(config);

        console.log('result', result);

        if (type === 'success') {
            
            // c'est ici que l'on peut stocker l'user dans notre BDD mysql


            // là on va stocker l'user dans la memoire interne
        }

    } catch (error) {
        console.error('Erreur d\'autentification : ', error);
    }
}