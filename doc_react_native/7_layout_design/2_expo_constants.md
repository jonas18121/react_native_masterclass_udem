# Les Constantes De L'Application Avec expo-constants

Site : https://docs.expo.io/versions/v41.0.0/sdk/constants/

`expo-constants` fournit des informations système qui restent constantes tout au long de la durée de vie de l’installation de votre application.

## Installer expo-constants

    > expo install expo-constants

## Constants.statusBarHeight

La hauteur de barre d’état par défaut de l’appareil. 

Ne tient pas compte des changements lorsque le suivi de localisation est utilisé ou qu’un appel téléphonique est actif.

Dans `BookScreen.js`

- On importe `Constants` depuis `expo-constants` 

- Dans la propriété `container` de notre CSS, on met une `marginTop` avec comme valeur la constante `Constants.statusBarHeight` qui définira La hauteur de barre d’état par défaut de l’appareil.

Dans `BookScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import Constants from 'expo-constants';

    const BookScreen = props => {

        return (
            <View style={ styles.container }>
                <Text>BookScreen</Text>
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