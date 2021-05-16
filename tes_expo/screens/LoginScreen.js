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

    const goBook = () => props.navigation.navigate("Root", {
        params: {},
        screen: "Book"
    });
    
    
    return (

        <View style={ styles.container }>
            <Text>Login Screen</Text>

            <TouchableOpacity onPress={ goBook }>
                <View style={ styles.button }>
                    <Text> Aller à Book</Text>
                </View>
            </TouchableOpacity>

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
                    <Text> Retouner a Welcome</Text>
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