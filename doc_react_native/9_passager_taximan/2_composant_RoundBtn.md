# Notre Composant RoundBtn + son Design

Dans `RoundBtn.js`

    import React from 'react';
    import {
        View,
        TouchableOpacity,
        StyleSheet
    } from 'react-native';
    import { Ionicons } from "@expo/vector-icons";

    const RoundBtn = ({ iconName }) => {

        const { container, iconStyle } = styles;

        return (
            <TouchableOpacity>
                <View style={container}>
                    <Ionicons 
                        name={iconName} 
                        style={iconStyle}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2dbb54",
            height: 80,
            width: 80,
            borderRadius: 40,
            
        },
        iconStyle : {
            fontSize: 40,
            color: "#fff"
        }
    });

    export default RoundBtn;


Dans `HomeScreen.js`

    import React from 'react';
    import { StyleSheet, Text, View, Dimensions } from 'react-native';
    import Constants from 'expo-constants';
    import { Ionicons } from '@expo/vector-icons';
    import { prefix } from '../utils/helpers';

    //composant
    import Block from '../components/Block';
    import Title from '../components/Title';
    import RoundBtn from '../components/RoundBtn';

    const { width, height } = Dimensions.get("window");


    const HomeScreen = (props) => {

        const { 
            container, 
            icon, 
            container_2, 
            titlecontainer, 
            RoundBtnContainer 
        } = styles;

        return (

            <View style={container}>

                <Block>
                    <Ionicons name={`${prefix}-car`} style={icon} />
                    <Title content="TAXI APP" size="big"/>
                </Block>

                <View style={container_2}>
                    <View style={titlecontainer}>
                        <Title content="Bienvenue" size="small"/>
                        <Title content="Vous recherchez un" size="medium"/>
                    </View>

                    <View style={RoundBtnContainer}>
                        <RoundBtn iconName={`${prefix}-car`} />
                        <RoundBtn iconName={`${prefix}-person`}  />
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
            justifyContent: "space-around",
            alignItems: "center",
        },
        titlecontainer: {
            width: width - 80,
            height: 50,
            justifyContent: "center",
            alignItems: "flex-start"
        },

        RoundBtnContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: width - 80
        }
    });

    export default HomeScreen;


