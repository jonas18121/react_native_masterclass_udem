# Les Icones avec vector-icons (Ionicons)

Expo icons : https://docs.expo.io/guides/icons/

Liste d'icones : https://icons.expo.fyi/ 

## @expo/vectoriel-icônes

Cette bibliothèque est installée par défaut sur le projet de modèle qui passent à travers - il fait partie de l’ensemble.


Dans `BookScreen.js`

- On importe `Ionicons` depuis `'@expo/vector-icons'`

- Dans le composant `Ionicons`, on ces propriété :

    - `name` qui représente le nom de l'icon sur le site https://icons.expo.fyi/

    - `size` sa taille

    - `color` sa couleur 


Dans `BookScreen.js`


    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import Constants from 'expo-constants';
    import { Ionicons } from '@expo/vector-icons';


    const BookScreen = props => {

        return (
            <View style={ styles.container }>
                <Text>BookScreen</Text>

                <Ionicons
                    name="md-home"
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