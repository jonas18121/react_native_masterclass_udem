# Desing De Notre Composant LoginBtn

Dans `LoginBtn.js`

- Pour creer des ombres il faut ces propriétés dans le style

    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

Dans `LoginBtn.js`

    import  React from 'react';
    import {
        Text,
        View,
        StyleSheet,
        Image,
        TouchableOpacity,
        Dimensions
    } from 'react-native';

    import Logo from '../../assets/images/google.png';

    // composant
    import Title from './Title';


    const { width, height } = Dimensions.get('window');

    const LoginBtn = (props) => {

        const { logo, container } = styles;

        return (

            <TouchableOpacity>
                <View style={container}>
                    <Title size="small" content="Google Connexion" />
                    <Image source={Logo} style={logo} />
                </View>
            </TouchableOpacity>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: width - 80,
            height: 55,
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: "#fff",
            elevation: 5,
            borderRadius: 10
        },
        logo: {
            width: 40,
            height: 40
        }
    });

    export default LoginBtn;

Dans `LoginScreen.js`

- on a rajouter `justifyContent: "space-around",` a la propriété `container_2`, pour faire une distance entre mes composants

    container_2: {
        flexGrow: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },