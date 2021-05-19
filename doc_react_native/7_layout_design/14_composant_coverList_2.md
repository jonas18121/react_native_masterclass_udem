# Notre Composant CoverList partie 2

Dans `CoverList.js`

- Dans le composant `Cover`, on met une props nommé `small={true}`

- Explication de `contentContainerStyle={styles.paddingFlatList}` :

    - `FlatList` correspond à une balise `ul`/`ol` 

    - `contentContainerStyle` représenterait une balise `<div>` dans le `FlatList`

    exemple :

        < ul>

            <div>
                <li></li>
                <li></li>
                <li></li>
            </div>
        < /ul>

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

            return (
                <TouchableOpacity>
                    <Cover small={true} image={item.imageSrc} />
                </TouchableOpacity>
            )
        }

        return (


            <FlatList
                style={styles.flexFlatList}
                contentContainerStyle={styles.paddingFlatList}
                data={images}
                horizontal={true}
                renderItem={(item) => renderCover(item)}
                keyExtractor={item => item.id}
            />
        );
    }

    const styles = StyleSheet.create({
        paddingFlatList: {
            paddingHorizontal: 25,
        },
        flexFlatList: {
            flex: 1
        }
    });

    export default CoverList;

Dans `Cover.js`

- On récupère la propriété `small` qui vient de `CoverList.js`

- Dans la propriété `style` du composant `View`, on met la fonction `getContainerStyle()` qu'on à créer

- `getContainerStyle()` affiche le style de `smallStyle` si `small` est `true` ou il affiche le style de `container` si `small` est `false`

Dans `Cover.js`

    import React from 'react';
    import { View, StyleSheet, Image } from 'react-native';

    // {image} = props.image

    const Cover = ({image, small}) => {

        const { container, imageStyle, smallStyle } = styles;

        const getContainerStyle = () => small ? smallStyle : container;

        return (

            <View style={getContainerStyle()}>
                <Image style={imageStyle} source={image} />
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            width: 162,
            height: 243
        },
        imageStyle: {
            width: '100%',
            height: '100%',
            borderRadius: 10
        },
        smallStyle: {
            width: 70,
            height: 112,
            marginTop: 20,
            marginHorizontal: 5
        }
    });

    export default Cover;


Dans `BookScreen.js`

- Le titre du `CoverList` `<Title left={true} title="You may also like" customStyle={styles.leftStyle} />`

- On crée une propriété `left` dans le composant `Title`

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


Dans `Title.js`

- `getStyle()` affiche le style de `leftAlign` si `left` est `true` ou il affiche le style de `container` si `left` est `false`

Dans `Title.js`


    import React from "react";
    import { View, StyleSheet, Text } from 'react-native';

    const Title = ({title, customStyle, left}) => {

        const { container, bookTitle, leftAlign } = styles;

        const getStyle = () => left ? leftAlign : container;

        return (

            <View style={getStyle()}>
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
        },
        leftAlign: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: '100%',
            paddingLeft: 30,
        }
    });

    export default Title;