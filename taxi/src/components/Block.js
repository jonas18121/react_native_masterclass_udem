import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// récupéré les dimesions de l'écran du téléphone, hauteur et largeur
const { width, height } = Dimensions.get('window');

const Block = ({ children }) => {

    return (

        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: (width * 4) / 3,
        backgroundColor: "#2dbb54",
        flexGrow: 3,
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Block;