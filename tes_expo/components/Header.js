import React from "react";
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Constante
import { prefix } from '../utils/constant';

const Header = (props) => {

    const { container, closeIcon, cartIcon } = styles;

    return (

        <View style={container}>

            <Ionicons
                name={`${prefix}-close`}
                size={30}
                style={closeIcon}
            />

            <Ionicons
                name={`${prefix}-cart`}
                size={30}
                style={cartIcon}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 38,
        marginVertical: 20,
        marginBottom: 28,
        backgroundColor: "green"
    },
    closeIcon: {
        fontSize: 45,
        color: "white"
    },
    cartIcon: {
        fontSize: 30,
        color: "white"
    }
});

export default Header;