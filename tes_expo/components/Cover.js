import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

// {image} = props.image

const Cover = ({image}) => {

    const { container, imageStyle } = styles;

    return (

        <View style={container}>
            <Image style={imageStyle} source={image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 162,
        height: 243
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
});

export default Cover;