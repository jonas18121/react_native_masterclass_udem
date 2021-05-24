import React from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';
import Constants from 'expo-constants';

const PassengerScreen = props => {

    const { container } = styles;

    return (
        <View style={container}>
            <Text>Passenger Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff"
    },
});

export default PassengerScreen;