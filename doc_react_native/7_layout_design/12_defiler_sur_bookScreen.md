# Défiler Sur Notre Composant BookScreen

pour rendre notre composant `BookScreen` Scrollable, 

on va lui appliquer le composant `ScrollView`

Dans `BookScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet, ScrollView  } from 'react-native';
    import Constants from 'expo-constants';

    // composant
    import Header from '../components/Header';
    import Cover from '../components/Cover';
    import Title from '../components/Title';
    import Rating from '../components/Rating';
    import Action from '../components/Action';

    // image
    const Book1 = require('../assets/images/book1.png');

    const BookScreen = props => {

        return (

            <ScrollView style={{flex: 1, backgroundColor: "#000"}}>

                <View style={ styles.container } >

                    <Header />

                    <Cover image={Book1} />
                    <Title title="The Jungle Book" />
                    <Title title="Rudyard Kliing" customStyle={styles.sbTitle} />

                    <Rating />
                    <Action />
                </View>
            </ScrollView>
        );
    }


    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#000",
            paddingBottom: 20,
            marginTop: Constants.statusBarHeight,
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