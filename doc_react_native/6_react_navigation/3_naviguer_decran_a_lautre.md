##  Naviguer D'un Ecran à Un Autre

Dans `WelcomeScreen.js`

- On import `TouchableOpacity`

- Avec le composant `TouchableOpacity` on entoure un composant `View` qui entoure un composant `Text`

- Dans le composant `TouchableOpacity`, on met un envènnement au click nommé `onPress` qui va appeler la méthode `goTo()` lorsqu'on va cliquer le texte `Aller au login`

- Dans la méthode `goTo()`, on va utiliser les propriété de la `props` que renvoie `NavigationContainer` depuis `App.js`,

Dans `WelcomeScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

    const WelcomeScreen = (props) => {

        const goTo = () => {
            // console.log(props);
            // props.navigation.push('Login');
            props.navigation.navigate('Login');
        }
        
        return (

            <View style={ styles.container }>
                <Text>Welcome Screen</Text>

                <TouchableOpacity onPress={ goTo }>
                    <View style={ styles.button }>
                        <Text> Aller au login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgrey"
        }, 
        button: {
            backgroundColor: "lightblue",
            borderColor: "darkblue",
            borderWidth: 2,
            justifyContent: "center",
            width: 100,
            height: 40
        }
    });

    export default WelcomeScreen;