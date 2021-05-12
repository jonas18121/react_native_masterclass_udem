# Le composant Text

- Le composant React Native `Text` corresponds à la balise HTML `p`.

- Coté code Natif `Text` sera transformé en `TextView` pour Android avec Java et en `UITextView` pour iOS avec Objectif-c

- `Text` est un autre composant fondamental dans React Native

- `Text` affiche du text dans notre application

- `Text` prend en charge le style applicable à une balise `p`

- `Text` prend en charge certaines manipulations tactiles

- `Text` peut être utilisé sous forme imbriquée (avoir un composant `Text` à l'intérieur d'un composant `Text`)

## test du composant Text

Dans `App.js`

    import React from 'react';
    import { View, Text } from 'react-native';

    const App = () => {

        return (
        <View 
            style={{
                borderWidth: 1,
                height: 150,
                width: 150,
                backgroundColor: "green",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text
                style={{
                color: 'fff',
                fontSize: 20,
                fontWeight: "bold"
                }}
            >Hello word</Text>
        </View>
        )
    }

    export default App;