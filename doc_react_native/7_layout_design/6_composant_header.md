# Notre Composant Header

Dans `Header.js`

- On creer notre composant `Header` dans le dossier `components`

- Après avoir mis ce qu'il faut, on va l'importer dans le composant `BookScreen.js`

Dans `Header.js`

    import React from "react";
    import { View, StyleSheet } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';

    // Constante
    import { prefix } from '../utils/constant';

    const Header = (props) => {

        const { container, closeIcon, cartIcon } = styles;

        return (

            <View style={container}>

                <Ionicons
                    name={`${prefix}-close`}
                    size={30}
                    style={closeIcon}
                />

                <Ionicons
                    name={`${prefix}-cart`}
                    size={30}
                    style={cartIcon}
                />
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 38,
            marginVertical: 20,
            marginBottom: 28,
            backgroundColor: "green"
        },
        closeIcon: {
            fontSize: 45,
            color: "white"
        },
        cartIcon: {
            fontSize: 30,
            color: "white"
        }
    });

    export default Header;


Dans `BookScreen.js`

- On importe `Header.js`, et on l'utilise

    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import Constants from 'expo-constants';

    import Header from '../components/Header';

    const BookScreen = props => {

        return (
            <View style={ styles.container }>

                <Header />
            </View>
        );
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#000",
            paddingBottom: 20,
            marginTop: Constants.statusBarHeight
        }
    });

    export default BookScreen;