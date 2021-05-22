import  React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import Logo from '../../assets/images/google.png'

const LoginBtn = (props) => {

    return (

        <TouchableOpacity>
            <View>
                <Text>Google Connexion</Text>
                <Image source={Logo} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {

    }
});

export default LoginBtn;