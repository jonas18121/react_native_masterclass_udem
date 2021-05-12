# Le composant View

- Le composant React Native `View` corresponds à la balise HTML `div`.

- Coté code Natif `View` sera transformé en `ViewGroup` pour Android avec Java et en `UIView` pour iOS en Objectif-c

- `View` est le composant le plus fondamental dans React Native

- `View` prend en charge la mise en place avec flexbox

- `View` prend en charge le style applicable à une balise `div`

- `View` prend en charge certaines commandes tactiles et d'accessibilité

- `View` peut être utilisé sous forme imbriquée (avoir une `View` à l'intérieur d'une `View`)


## test du composant View

Dans `App.js`

    import React from 'react';
    import { View } from 'react-native';

    const App = () => {

        return (
        <View 
            style={{
                borderWidth: 1,
                height: 150,
                width: 150,
                backgroundColor: "green"
            }}
        >
        </View>
        )
    }

    export default App;