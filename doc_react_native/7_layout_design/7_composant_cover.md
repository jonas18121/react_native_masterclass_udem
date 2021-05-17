# Notre Composant Cover

Dans le dossier `assets`, on met les images que l'on va utilisé dans un dossier `images`

On crée un fichier `components/Cover.js`

Dans `components/Cover.js`

- `const Cover = ({image}) `, on décompose notre `props` qui va venir de `BooScreen.js`

- `{image}` = `props.image`

Dans `components/Cover.js`

    import React from 'react';
    import { View, StyleSheet, Image } from 'react-native';

    // {image} = props.image

    const Cover = ({image}) => {

        const { container, imageStyle } = styles;

        return (

            <View style={container}>
                <Image style={imageStyle} source={image} />
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            width: 162,
            height: 243
        },
        imageStyle: {
            width: "100%",
            height: "100%",
            borderRadius: 10
        }
    });

    export default Cover;


Dans `BooScreen.js`

- On charge une image, `const Book1 = require('../assets/images/book1.png');`

- On passe l'image en `props` au composant `Cover` : `<Cover image={Book1} />`

Dans `BooScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import Constants from 'expo-constants';

    // composant
    import Header from '../components/Header';
    import Cover from '../components/Cover';

    // image
    const Book1 = require('../assets/images/book1.png');

    const BookScreen = props => {

        return (
            <View style={ styles.container }>

                <Header />
                <Cover image={Book1} />
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