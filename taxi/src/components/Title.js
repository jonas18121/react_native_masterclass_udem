import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const Title = ({ content, size }) => {

    const { container, title, small, medium } = styles;

    const getTitleStyle = () => {

        switch (size) {
            case "big":
                
                return title;
                break;

            case "small":
            
                return small;
                break;

            case "medium":
        
                return medium;
                break;
        
            default:
                break;
        }
    }

    return (

        <View style={container}>
            <Text style={getTitleStyle()}>{ content }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        fontFamily: 'LeckerliOne'
    },
    small: {
        color: 'rgba(0,0,0,0.6)',
        fontFamily: "Poppins",
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 28
    },
    medium: {
        fontFamily: "Poppins",
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 28
    }
});

export default Title;