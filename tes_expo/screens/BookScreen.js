import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// composant
import Header from '../components/Header';
import Cover from '../components/Cover';
import Title from '../components/Title';
import Rating from '../components/Rating';

// image
const Book1 = require('../assets/images/book1.png');



const BookScreen = props => {

    return (
        <View style={ styles.container }>

            <Header />
            <Cover image={Book1} />
            <Title title="The Jungle Book" />
            <Title title="Rudyard Kliing" customStyle={styles.sbTitle} />

            <Rating/>
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