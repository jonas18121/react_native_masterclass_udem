# Mise A Jour De LoginScreen

Dans `LoginScreen.js`

    <View style={container_2}>
        <View style={titlecontainer}>
            <Title content="Authentification" size="small"/>
            <Title content="Google Connexion" size="medium"/>
        </View>
    </View>

- plus le style

Dans `LoginScreen.js`

    import React from 'react';
    import { StyleSheet, Text, View, Dimensions } from 'react-native';
    import Constants from 'expo-constants';
    import { Ionicons } from '@expo/vector-icons';
    import { prefix } from '../utils/helpers';

    //composant
    import Block from '../components/Block';
    import Title from '../components/Title';

    const { width, height } = Dimensions.get("window");


    const LoginScreen = (props) => {

        const { container, icon, container_2, titlecontainer } = styles;

        return (

            <View style={container}>

                <Block>
                    <Ionicons name={`${prefix}-car`} style={icon} />
                    <Title content="TAXI APP" size="big"/>
                </Block>

                <View style={container_2}>
                    <View style={titlecontainer}>
                        <Title content="Authentification" size="small"/>
                        <Title content="Google Connexion" size="medium"/>
                    </View>
                </View>

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
        },
        container_2: {
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        titlecontainer: {
            width: width - 80,
            height: 50,
            justifyContent: "center",
            alignItems: "flex-start"
        }
    });

    export default LoginScreen;