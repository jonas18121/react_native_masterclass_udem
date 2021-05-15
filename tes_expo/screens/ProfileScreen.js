import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = (props) => {

    const goHome = () => props.navigation.navigate("Root", {
        params: {},
        screen: "Home"
    });
    
    return (

        <View style={ styles.container }>
            <Text>Profile Screen</Text>

            <TouchableOpacity onPress={ goHome }>
                <View style={ styles.button }>
                    <Text> Aller à Home</Text>
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

export default ProfileScreen;