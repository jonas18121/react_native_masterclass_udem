import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

const Prediction = ({ main_text, secondary_text }) => {

    return (
        <View>
            <Text>{ secondary_text }</Text>
            <Text>{ main_text }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    }
});

export default Prediction;