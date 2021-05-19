import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';


const LoginScreen = (props) => {

    const { container } = styles;

    return (

        <View style={container}>
            <Text style={{ color: "black", marginTop: 30}}>Login Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff"
    }
});

export default LoginScreen;