# Notre Composant Rating

Ici on va afficher une étoile, la note du livre et le nombre de votant

On crée un fichier `components/Rating.js`

Dans `components/Rating.js`

- On crée notre composant `Rating`

Dans `components/Rating.js`


    import React from "react";
    import { View, StyleSheet, Text } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';

    // Constante
    import { prefix } from '../utils/constant';

    const Rating = (props) => {

        const { container, star, rate, votes } = styles;

        return (

            <View style={ container }>

                <Ionicons style={star} name={`${prefix}-star`} />

                <Text style={rate}>4.8</Text>
                <Text style={votes}>(2578)</Text>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-around",
            width: 148,
            height: 27,
            alignItems: "center",
            marginTop: 20,
            paddingHorizontal: 25
        },
        star: {
            color: "#ffdd4f"
        },
        rate: {
            color: "white",
            fontFamily: "Montserrat-Medium",
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 16
        },
        votes: {
            color: "white",
            opacity: 0.5,
            fontFamily: "Montserrat-Black",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 14
        }
    });

    export default Rating;



Dans `BookScreen.js`

- On importe `Rating.js` et on l'affiche

Dans `BookScreen.js`

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