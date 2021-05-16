# L'API Platform de React Native

site : https://reactnative.dev/docs/platform

On crée un fichier `constant.js` dans un dossiers `utils`, qu'on a créer aussi

dedans on crée une constante `prefix` qui contient une condition ternaire

Dans `constant.js`

    import { Platform } from 'react-native';

    export const prefix = Platform.OS === "android" ? "md" : "ios";



Dans `BookScreen.js`

- On importe notre constante `prefix` depuis notre fichier `constant.js`

- `name={```${prefix}-home```}` on l'utilise dans le composant `Ionicons`

Dans `BookScreen.js`


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import { prefix } from '../utils/constant';


const BookScreen = props => {

    return (
        <View style={ styles.container }>
            <Text>BookScreen</Text>

            <Ionicons
                name={`${prefix}-home`}
                size={30}
                color="black"
            />
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingBottom: 20,
        marginTop: Constants.statusBarHeight
    }
});

export default BookScreen;