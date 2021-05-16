import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


const BookScreen = props => {

    return (
        <View style={ styles.container }>
            <Text>BookScreen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingBottom: 20,
        marginTop: Constants.statusBarHeight
    }
});

export default BookScreen;