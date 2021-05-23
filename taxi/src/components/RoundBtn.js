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