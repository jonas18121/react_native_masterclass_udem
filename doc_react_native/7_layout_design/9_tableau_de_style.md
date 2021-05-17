# Appliquer Un Tableau De Style

Dans `Title.js`

- `style={[bookTitle, customStyle]}`, Le composant qui aura cette structure de style, aura un style de base qui est `bookTitle` et un 2èmes style pourra lui être passer qui ecrasera les propriétés du 1er s'ils ont les mêmes propriétés

- `customStyle` viens du composant `BookScreen.js` qui lui passe en props

Dans `Title.js`

    import React from "react";
    import { View, StyleSheet, Text } from 'react-native';

    const Title = ({title, customStyle}) => {

        const { container, bookTitle } = styles;

        return (

            <View style={container}>
                <Text style={[bookTitle, customStyle]}>{title}</Text>
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

- `customStyle={styles.sbTitle}`, on passe on composant `Title` la propriété `customStyle` avec un nouveau style, ce qui ecrasera une partie du premier style du composant `Title`

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
                <Title title="Rudyard Kliing" customStyle={styles.sbTitle} />
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
        },
        sbTitle: {
            opacity: 0.7,
            fontFamily: "Montserrat-Medium",
            fontSize: 18,
            fontWeight: '500',
            lineHeight: 18,
            marginTop: 13
        }
    });

    export default BookScreen;