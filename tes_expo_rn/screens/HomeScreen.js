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