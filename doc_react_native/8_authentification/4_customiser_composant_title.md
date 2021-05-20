# Customiser Notre Composant Title


Dans `LoginScreen.js`

- On a creer `<Title content="Authentification" size="small"/>` et `<Title content="Google Connexion" size="medium"/>`


Dans `LoginScreen.js`


    import React from 'react';
    import { StyleSheet, Text, View } from 'react-native';
    import Constants from 'expo-constants';
    import { Ionicons } from '@expo/vector-icons';
    import { prefix } from '../utils/helpers';

    //composant
    import Block from '../components/Block';
    import Title from '../components/Title';


    const LoginScreen = (props) => {

        const { container, icon } = styles;

        return (

            <View style={container}>

                <Block>
                    <Ionicons name={`${prefix}-car`} style={icon} />
                    <Title content="TAXI APP" size="big"/>
                </Block>

                <Title content="Authentification" size="small"/>
                <Title content="Google Connexion" size="medium"/>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff"
        },
        icon: {
            fontSize: 80,
            color: "#fff"
        }
    });

    export default LoginScreen;




Dans `Title.js`

- On a créer une fonction `getTitleStyle()` qui Switch entre les valeurs `big`, `medium` et `small` selon la valeur de la propriété `size` qui est dans les composants `<Title />` qui sont dans `LoginScreen.js`

Dans `Title.js`

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