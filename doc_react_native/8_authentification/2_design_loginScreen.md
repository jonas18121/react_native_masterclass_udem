# Design De Notre Ecran LoginScreen

Dans `Block.js`

- `Dimensions.get('window');` récupéré les dimesions de l'écran du téléphone, hauteur et largeur

- `width: (width * 4) / 3,`, on veut que l'image s'affiche a partir de la largeur que notre téléphone multiplié par 4 et divisé par 3

- `flexGrow: 3,` def : s'il y a de l'espace disponible le composant `Block` prendra 3 fois plus de place que les autres composants

- `borderBottomLeftRadius: width,` borderBottomLeftRadius = à la largeur du téléphone

- `justifyContent: "center", alignItems: "center"` centrer le composant `Block`, horizontalement et verticalement

Dans `Block.js`
    import React from 'react';
    import { StyleSheet, Text, View, Dimensions } from 'react-native';

    // récupéré les dimesions de l'écran du téléphone, hauteur et largeur
    const { width, height } = Dimensions.get('window');

    const Block = ({ children }) => {

        return (

            <View style={styles.container}>
                {children}
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            width: (width * 4) / 3,
            backgroundColor: "#2dbb54",
            flexGrow: 3,
            borderBottomLeftRadius: width,
            borderBottomRightRadius: width,
            justifyContent: "center",
            alignItems: "center"
        }
    });

    export default Block;


Dans `LoginScreen.js`

- On affiche le composant `Block.js`

Dans `LoginScreen.js`

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

//composant
import Block from '../components/Block';

const LoginScreen = (props) => {

    const { container } = styles;

    return (

        <View style={container}>

            <Block />
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
    }
});

export default LoginScreen;