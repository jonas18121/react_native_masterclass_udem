# Les Composants Touchable

- Les Composants `Touchable`, sont des wappers qui permettent de rendre une zone (composant) cliquable, (ils entourent d'autres composants pour les rendre cliquable)

- La zone (composant) qui doit être cliquable, doit être l'unique enfant du Composant `Touchable`

- Liste de quelques composants `Touchable`

    - TouchableHighlight
    - TouchableOpacity
    - TouchableWithoutFeeback
    - TouchableNativeFeedback

- La différence entre ces 4 composants `Touchable`, est le feedback qui est renvoyé à l'utilisateur.

    - TouchableHighlight : L'opacité de la zone envelopper diminue, ce qui permet à la couleur de la sous-couche de transparaître, d'assombrir ou de teinter la vue

    - TouchableOpacity : L'opacité de la zone envelopper est diminué, en l'assombrissant

    - TouchableWithoutFeeback : Ne renvoie aucun feedback

    - TouchableNativeFeedback : Seulment pour Android, il affiche un retour tactile


## test du composant Touchable

Dans `App.js`

- On importe nos composants Touchable, et on entoure d'autres composants avec nos composants Touchable

Dans `App.js`

    import React, { useState } from 'react';
    import { 
        View, 
        Text, 
        StyleSheet, 
        TextInput, 
        Image, 
        ScrollView, 
        FlatList,
        TouchableHighlight,
        TouchableOpacity,
        TouchableNativeFeedback
    } from 'react-native';
    import LOGO from "./assets/edgco.png"
    //ou
    // const LOGO = require('./assets/edgco.jpg');
    const urlWeb = "https://via.placeholder.com/150";

    const posts = [ ... ];

    const App = () => {

        const [state, setSate] = useState("");

        return (

            
            <View style={styles.container} >

                <TouchableHighlight onPress={ () => console.log("click 1") }>
                    <Text style={styles.hello} >Hello word</Text>
                </TouchableHighlight>

                <TouchableOpacity onPress={ () => console.log("click 2") }>
                    <Text style={styles.hello} >How are you !</Text>
                </TouchableOpacity>

                <TouchableNativeFeedback onPress={ () => console.log("click 3") }>
                    <Text style={styles.hello} >I fine, Thank you !</Text>
                </TouchableNativeFeedback>

                <TextInput 
                    style={styles.input} 
                    placeholder=" Entrer du texte" 
                    value={state}
                    onChangeText={value => setSate(value)} 
                />
            
                {/* afficher une image en locale */}
                <Image source={LOGO} style={styles.logo} />

                {/* afficher une image depuis internet */}
                <Image source={{uri : urlWeb }} style={styles.logo} />

                <FlatList 
                    data={posts} 
                    renderItem={(item) => <Text style={styles.item} >{item.item.title}</Text> }
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "green",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 35
        },
        hello: {
            color: '#fff',
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10
            },
        input: {
            borderWidth: 1,
            backgroundColor: '#fff',
            width: 200,
            height: 30,
            marginTop: 10
        },
        logo: {
            height: 150,
            width: 150,
            marginTop: 10,
            backgroundColor: "#f58"
        },
        item : {
            borderWidth: 2,
            borderColor: "#fff"
        }
    });

    export default App;
