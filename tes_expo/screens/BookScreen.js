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