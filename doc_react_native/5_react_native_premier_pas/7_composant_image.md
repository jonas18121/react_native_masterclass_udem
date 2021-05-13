# Le Composant Image

- Le composant React Native `Image` corresponds à la balise HTML `img`.

- Coté code Natif `Image` sera transformé en `ImageView` pour Android avec Java et en `UIImageView` pour iOS avec Objectif-c

- Le composant `Image`, permet d'afficher différents types d'images dans l'application

- Les images peuvent venir du stockage local du téléphone ou d'un serveur distant

- Le composant `Image`, prend en charge le style applicable à une balise `<img">`



## test du composant Image

Dans `App.js`

- On importe `Image` depuis react native

- `import LOGO from "./assets/edgco.png"` ou `const LOGO = require('./assets/edgco.jpg')` = importer une image locale depuis le téléphone

- `<Image source={LOGO} style={styles.logo} />` = afficher une image locale

- `const urlWeb = "https://via.placeholder.com/150";` = importer une image locale depuis internet

- `<Image source={{uri : urlWeb }} style={styles.logo} />` = = afficher une image depuis internet

Dans `App.js`

    import React, { useState } from 'react';
    import { SafeAreaView, View, Text, StyleSheet, TextInput, Image } from 'react-native';
    import LOGO from "./assets/edgco.png"
    //ou
    // const LOGO = require('./assets/edgco.jpg');

    const urlWeb = "https://via.placeholder.com/150";

    const App = () => {

        const [state, setSate] = useState("");

        return (
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
            <Image source={{uri : urlWeb }} style={styles.logo} />
        </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "green",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        hello: {
            color: '#fff',
            fontSize: 20,
            fontWeight: "bold"
        },
        input: {
            borderWidth: 1,
            backgroundColor: '#fff',
            width: 200,
            height: 30
        },
        logo: {
            height: 150,
            width: 150
        }
    });

    export default App;