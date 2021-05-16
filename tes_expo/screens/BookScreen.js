import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';


const BookScreen = props => {

    return (
        <View style={ styles.container }>
            <Text>BookScreen</Text>

            <Ionicons
                name="md-home"
                size={30}
                color="black"
            />
            
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