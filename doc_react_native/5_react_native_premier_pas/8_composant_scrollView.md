# Le Composant ScrollView

- Le composant React Native `ScrollView` corresponds à la balise HTML `div` sur laquel on peut défiler, contrairement au composant React Native `View` qui corresponds une balise HTML `div`, sur laquel on ne peut pas défiler.

- Coté code Natif `ScrollView` sera transformé en `ScrollView` pour Android avec Java et en `UIScrollView` pour iOS avec Objectif-c

- Le Composant `ScrollView`, fait défiler une liste ou un conteneur (écran) qui contient assé de composants et vues pour pouvoir faire défiler tous ça

- Le défilement peut être horizontal ou vertical

- Il est préférable d'utiliser le Composant `ScrollView` pour un défilement fixe, c-a-d, dans un composant le nombre d'enfant doit être connu

## test du composant ScrollView

Dans `App.js`

- On importe `ScrollView` depuis react native

- On va duppliquer exprès les images pour faire en sorte qu'il y en a certaine image qu'on ne vois pas car l'écran du téléphone n'est pas assé grand, donc ils sont cacher

- Sans `ScrollView`, on voit bien qu'on ne peut pas faire un scroll pour faire défiler les images

- Avec `ScrollView` qui entoure ses composant enfant, on peut faire défiler les images pour voir ceux qui sont caché en bas

Dans `App.js`

    import React, { useState } from 'react';
    import { View, Text, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
    import LOGO from "./assets/edgco.png"
    //ou
    // const LOGO = require('./assets/edgco.jpg');
    const urlWeb = "https://via.placeholder.com/150";

    const App = () => {

        const [state, setSate] = useState("");

        return (

        <ScrollView>

            <View style={styles.container} >

                <Text style={styles.hello} >Hello word</Text>
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
                <Image source={{uri : urlWeb }} style={styles.logo} />
                <Image source={{uri : urlWeb }} style={styles.logo} />
                <Image source={{uri : urlWeb }} style={styles.logo} />
                <Image source={{uri : urlWeb }} style={styles.logo} />
                <Image source={{uri : urlWeb }} style={styles.logo} />
                <Image source={{uri : urlWeb }} style={styles.logo} />
                <Image source={{uri : urlWeb }} style={styles.logo} />
            </View>
        </ScrollView>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "green",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20
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
            marginTop: 10
        }
    });

    export default App;