# Naviguer En Passant Des Paramètres


## Envoyer des paramètres à une autre page

Dans `WelcomeScreen.js`

Pour naviguer d'un écran a un autre en passant des paramètres

- Dans `props.navigation.push('Login')` ou `props.navigation.navigation('Login')`, on met un deuxièmes argument, qui représentera un objet des paramètres qu'on veut passé `props.navigation.navigate('Login', { nom: "Julien", age: 22 } );`


Dans `WelcomeScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

    const WelcomeScreen = (props) => {

        const goTo = () => {
            // console.log(props);
            // props.navigation.push('Login');
            props.navigation.navigate('Login', {
                nom: "Julien",
                age: 22
            });
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

## Recevoir des paramètres d'une autre page

Dans `LoginScreen.js`

- ici on va importer un hook useEffect, mais c'est pas obliger

- `props.route.params.nom` pour récupéré le paramètre nom 

- `props.route.params.age` pour récupéré le paramètre age

Dans `LoginScreen.js`

    import React, { useEffect } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

    const LoginScreen = (props) => {

        useEffect(() => {
            console.log(props);

            console.log("nom =", props.route.params.nom);
            console.log("age =", props.route.params.age);
        });

        const goBack = () => {

            props.navigation.goBack("welcome");
        }
        
        return (

            <View style={ styles.container }>
                <Text>Login Screen</Text>

                <TouchableOpacity onPress={ goBack }>
                    <View style={ styles.button }>
                        <Text> Retour en arrière</Text>
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

    export default LoginScreen;