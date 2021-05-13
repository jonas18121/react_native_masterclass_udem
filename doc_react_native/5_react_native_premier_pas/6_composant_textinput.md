# Le Composant TextInput

- Le composant React Native `TextInput` corresponds à la balise HTML `input`.

- Coté code Natif `TextInput` sera transformé en `EditText` pour Android avec Java et en `UITextField` pour iOS avec Objectif-c

- `TextInput` est utilisé pour prendre des texte entrée via le clavier

- `TextInput` prend en charge le style applicable à une balise `<input type="text">`


## test du composant TextInput


Dans `App.js`

- On importe `TextInput` depuis react native

- On applique une hauteur et une largeur a `TextInput` via `StyleSheet` , sinon `TextInput` ne sera pas visible

- On donne à `TextInput` un `placeholder` si on veut

- On veut que le champ de `TextInput`, soit un champ controler, 

    - Donc on importe `useState` depuis `react`

    - On construit le `useState` dans un tableau de constante 

    - `value={state}`, ce sera la valeur de notre champ

    - event onChangeText `onChangeText={value => setSate(value)} `, on modifie la valeur de notre champ, à chaque fois qu'on va rentrer une syllable

Dans `App.js`


    import React, { useState } from 'react';
    import { SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';

    const App = () => {

        const [state, setSate] = useState("");

        return (
        <View style={styles.container} >

            <Text style={styles.hello} >Hello word</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Entrer du texte" 
                value={state}
                onChangeText={value => setSate(value)} 
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
        }
    });

    export default App;