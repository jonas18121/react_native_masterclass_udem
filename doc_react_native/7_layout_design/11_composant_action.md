# Notre Composant Action

Dans `Action.js`


import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';

const Action = (props) => {

    const { container, price, priceContent, preview, previewContent } = styles;
    return (

        <View style={container}>

            <TouchableOpacity style={price}>
                <Text style={priceContent} >19.99 €</Text>
            </TouchableOpacity>

            <TouchableOpacity style={preview}>
                <Text style={previewContent}>Free Preview</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 271,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 27
    },
    price: {
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 48,
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    priceContent: {
        fontFamily: "Montserrat-Black",
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 18
    },
    preview: {
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 48,
        backgroundColor: "#ef8262",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    previewContent: {
        color: "white",
        fontFamily: "Gilroy-Bold",
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 16
    }
});

export default Action;


Dans `BookScreen.js`

- On importe `Action.js` et on l'appel

Dans `BookScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
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
            <View style={ styles.container }>

                <Header />
                
                <Cover image={Book1} />
                <Title title="The Jungle Book" />
                <Title title="Rudyard Kliing" customStyle={styles.sbTitle} />

                <Rating />
                <Action />
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