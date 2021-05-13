# Le Composant StyleSheet

- Le Composant  `StyleSheet` est similaire aux feuilles de style CSS, qu'on écrit directement dans notre code React Native 

- Le Composant  `StyleSheet` facilite la compréhension du code

- Le Composant  `StyleSheet` apporte un gain de performance




## test du composant StyleSheet

Dans `App.js`

- On importe `StyleSheet` depuis react native

- On crée une constante nommé styles pour utiliser le composant `StyleSheet` avec sa méthode `create()`, pour créer une feuille de  styles

- Après avoir créer des propriétés styles qui reçois le CSS. on peut utiliser notre constante style dans le composant `View` et `Text`

Dans `App.js`

    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';

    const App = () => {

        return (
        <View style={styles.container} >

            <Text style={styles.hello}>Hello word</Text>
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
        }
    });

    export default App;