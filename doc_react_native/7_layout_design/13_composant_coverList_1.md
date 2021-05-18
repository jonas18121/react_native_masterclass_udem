# Notre Composant CoverList partie 1

Dans `CoverList.js`

- `const CoverList = ({images})` images est la props passer depuis `BookScreen.js`

- pour affiché une liste horizontal, il faut mettre `<FlatList horizontal={true} />`

- Pour retourner les enfants, il faut `<FlatList renderItem={(item) => notre_function_creer(item)} />`

- La fonction `renderCover` retourne chaque enfant de la liste

Dans `CoverList.js`

    import React from 'react';
    import { 
        View, 
        Text, 
        StyleSheet, 
        FlatList, 
        TouchableOpacity  
    } from 'react-native';

    import Cover from './Cover';

    const CoverList = ({images}) => {

        /**
        * retourne chaque enfant de la liste
        */
        const renderCover = ({item}) => {
            console.log("item",item);
            return (
                <TouchableOpacity>
                    <Cover image={item.imageSrc} />
                </TouchableOpacity>
            )
        }

        return (


            <FlatList
                data={images}
                horizontal={true}
                renderItem={(item) => renderCover(item)}
                keyExtractor={item => item.id}
            />
        );
    }

    const styles = StyleSheet.create({
        container: {

        }
    });

    export default CoverList;



Dans `BookScreen.js`

- `const images` notre liste d'image

- On importe `CoverListe.js`

- `<CoverList images={images} />` on passe la `constante images` dans la `props images` du composant `CoverList`


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
    }
});

export default BookScreen;