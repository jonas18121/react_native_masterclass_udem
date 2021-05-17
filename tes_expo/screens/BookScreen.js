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