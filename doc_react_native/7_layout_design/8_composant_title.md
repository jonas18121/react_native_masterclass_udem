# Notre Composant Title

Il va représenté le titre et sous titre

Dans `Title.js`

- La props title va venir depuis le composant `BookScreen.js`

Dans `Title.js`

    import React from "react";
    import { View, StyleSheet, Text } from 'react-native';

    const Title = ({title}) => {

        const { container, bookTitle } = styles;

        return (

            <View style={container}>
                <Text style={bookTitle}>{title}</Text>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },
        bookTitle: {
            color: "white",
            fontFamily: "GT-Sectra-Fine-Regular",
            fontSize: 30,
            fontWeight: '400',
            lineHeight: 30,
            marginTop: 40

        }
    });

    export default Title;


Dans `BookScreen.js`

- On importe le composant `Title`

- On passe au composant `Title` le nom du titre


Dans `BookScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import Constants from 'expo-constants';

    // composant
    import Header from '../components/Header';
    import Cover from '../components/Cover';
    import Title from '../components/Title';

    // image
    const Book1 = require('../assets/images/book1.png');



    const BookScreen = props => {

        return (
            <View style={ styles.container }>

                <Header />
                <Cover image={Book1} />
                <Title title="The Jungle Book" />
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