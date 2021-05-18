import React from 'react';
import { View, Text, StyleSheet, ScrollView  } from 'react-native';
import Constants from 'expo-constants';

// composant
import Header from '../components/Header';
import Cover from '../components/Cover';
import Title from '../components/Title';
import Rating from '../components/Rating';
import Action from '../components/Action';
import CoverList from '../components/CoverList';

// image
const Book1 = require('../assets/images/book1.png');

const images = [
    { imageSrc: require('../assets/images/book1.png'), id: "1" },
    { imageSrc: require('../assets/images/book2.png'), id: "2" },
    { imageSrc: require('../assets/images/book3.png'), id: "3" },
    { imageSrc: require('../assets/images/book4.png'), id: "4" },
    { imageSrc: require('../assets/images/book5.png'), id: "5" },
    { imageSrc: require('../assets/images/book6.png'), id: "6" },
    { imageSrc: require('../assets/images/book1.png'), id: "7" },
    { imageSrc: require('../assets/images/book2.png'), id: "8" },
    { imageSrc: require('../assets/images/book3.png'), id: "9" },
    { imageSrc: require('../assets/images/book4.png'), id: "10" },
];

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

                <Title left={true} title="You may also like" customStyle={styles.leftStyle} />
                <CoverList images={images} />
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
    },
    leftStyle: {
        color: "white",
        fontFamily: "Montserrat-Medium",
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 14

    }
});

export default BookScreen;