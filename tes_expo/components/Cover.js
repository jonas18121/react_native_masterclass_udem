import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

// {image} = props.image

const Cover = ({image, small}) => {

    const { container, imageStyle, smallStyle } = styles;

    const getContainerStyle = () => small ? smallStyle : container;

    return (

        <View style={getContainerStyle()}>
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
    },
    smallStyle: {
        width: 70,
        height: 112,
        marginTop: 20,
        marginHorizontal: 5
    }
});

export default Cover;