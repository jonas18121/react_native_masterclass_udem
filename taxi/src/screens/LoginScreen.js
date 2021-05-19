import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

//composant
import Block from '../components/Block';
import Title from '../components/Title';


const LoginScreen = (props) => {

    const { container } = styles;

    return (

        <View style={container}>

            <Block>
                <Title content="TAXI APP"></Title>
            </Block>
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