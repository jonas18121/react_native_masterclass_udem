# Nav. Imbriqué Passer Des Paramètres

Pour passer des paramètres lorsqu'on navigue d'un écran à un autre, c'est les même étapes qu'on a fait dans le fichier numéro 4 de cette doc

Dans `LoginScreen.js`

    import React from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

    const LoginScreen = (props) => {

        const goBack = () => props.navigation.goBack("welcome");

        const goHome = () => props.navigation.navigate("Root", {
            params: {
                developper: true,
                frameworks: ["Symfony", "Angular", "React", "React Native"]
            },
            screen: "Home"
        });

        const goProfile = () => props.navigation.navigate("Root", {
            params: {},
            screen: "Profile"
        });
        
        
        return (

            <View style={ styles.container }>
                <Text>Login Screen</Text>

                <TouchableOpacity onPress={ goHome }>
                    <View style={ styles.button }>
                        <Text> Aller à Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={ goProfile }>
                    <View style={ styles.button }>
                        <Text> Aller à Profile</Text>
                    </View>
                </TouchableOpacity>


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
            marginTop: 10,
            backgroundColor: "lightblue",
            borderColor: "darkblue",
            borderWidth: 2,
            justifyContent: "center",
            width: 100,
            height: 40
        }
    });

    export default LoginScreen;


Dans `HomeScreen.js` 



    import React, { useEffect } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

    const HomeScreen = (props) => {

        useEffect(() => {
            console.log("developpeur = ", props.route.params.developper);
            console.log("frameworks = ", props.route.params.frameworks);
        });

        const goProfile = () => props.navigation.navigate("Root", {
            params: {},
            screen: "Profile"
        });
        
        return (

            <View style={ styles.container }>
                <Text>Home Screen</Text>

                <TouchableOpacity onPress={ goProfile }>
                    <View style={ styles.button }>
                        <Text> Aller au Profile</Text>
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
            marginTop: 10,
            backgroundColor: "lightblue",
            borderColor: "darkblue",
            borderWidth: 2,
            justifyContent: "center",
            width: 100,
            height: 40
        }
    });

    export default HomeScreen;