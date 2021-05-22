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