import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { prefix } from '../utils/helpers';

//composant
import Block from '../components/Block';
import Title from '../components/Title';


const LoginScreen = (props) => {

    

    const { container, icon } = styles;

    return (

        <View style={container}>

            <Block>
                <Ionicons name={`${prefix}-car`} style={icon} />
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
    },
    icon: {
        fontSize: 80,
        color: "#fff"
    }
});

export default LoginScreen;