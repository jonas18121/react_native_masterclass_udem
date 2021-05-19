# Notre Composant Title

Dans `Title.js`

    import React from 'react';
    import { StyleSheet, Text, View} from 'react-native';

    const Title = ({ content }) => {

        const { container, title } = styles;

        return (

            <View style={container}>
                <Text style={title}>{ content }</Text>
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
            // fontFamily: "LeckerliOne"
        }
    });

    export default Title;