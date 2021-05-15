import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = (props) => {

    const goTo = () => props.navigation.navigate('Login', {
            nom: "Julien",
            age: 22
        });
    
    
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