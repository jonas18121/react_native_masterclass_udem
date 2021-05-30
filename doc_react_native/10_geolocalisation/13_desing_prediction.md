# Design Du Composant Prediction

Dans `Prediction.js`

    import React from 'react';
    import { 
        View,
        Text,
        StyleSheet
    } from 'react-native';

    const Prediction = ({ main_text, secondary_text }) => {

        const { secondary, main, container } = styles;

        return (
            <View style={ container }>
                <Text style={ secondary }>{ secondary_text }</Text>
                <Text style={ main }>{ main_text }</Text>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            borderTopWidth: 1,
            borderTopColor: '#f6f6f6',
            padding: 5
        },

        secondary: {
            color: "#d6d6d6",
            fontSize: 12,
            fontWeight: '300',
            fontFamily: 'poppins'
        },
        main: {
            color: "#303030",
            fontSize: 16,
            fontWeight: '700',
            fontFamily: 'poppins'
        }

    });

    export default Prediction;