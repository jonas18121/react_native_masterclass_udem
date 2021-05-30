# Afficher Loading Spinner Pendant La Recherche

Dans `PlaceInput.js`

- Dans le `initialState`, on met une propriété `loading` avec comme valeur `false`

- Lorsqu'on va ecrit nos texte dans le champ input pour rechercher un mot, `handleChangeText` va passer la propriété `loading` a `true`

- Dès qu'on obtient nos prédiction, la propriété `loading` repasse a `false` dans la fonction `search()`

- importe `ActivityIndicator` depuis `react-native`

- Puis on a nos 2 opéretions ternaire, en mode `short circuit operator`, pour afficher ou pas le spinner ou le l'incon de recherche, selon l'état de la propriété `loading`

    {!loading &&

        <Ionicons 
            style={icon}
            name={`${prefix}-search`} 
        />
    }

    {loading && < ActivityIndicator />}

Dans `PlaceInput.js`

    import React, { useState } from 'react';
    import { 
        TextInput,
        View ,
        StyleSheet,
        Dimensions,
        ActivityIndicator
    } from "react-native";
    import { Ionicons } from '@expo/vector-icons';
    import axios from 'axios';

    import { prefix, BASE_URL, API_KEY } from '../utils/helpers';

    const { width, height } = Dimensions.get('window');

    const initialState = {
        place: "",
        prediction: [],
        loading: false
    };

    const PlaceInput = ({ latitude, longitude }) => {

        const [ state, setState ] = useState(initialState);

        const { container, icon, input, inputContainer } = styles;

        const { place, loading } = state;

        const search = async url => {
            try {

                const { data : { prediction } } = await axios.get(url);

                setState(prevState => ({
                    ...prevState,
                    prediction,
                    loading: false
                }));

            } catch (error) {
                console.error('Erreur search : ', error);
            }
        }

        const handleChangeText = value => {
            setState(prevState => ({
                ...prevState,
                place: value,
                loading: true
            }));
            const url = `${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}&origin=${latitude},${longitude}&radius=2000&language=fr`
            console.log('url', url);

            search(url)
        }


        return (

            <View style={container}>
                <View style={inputContainer}>
                    <TextInput
                        style={input}
                        value={place}
                        onChangeText={handleChangeText}
                    />

                    {!loading &&

                        <Ionicons 
                            style={icon}
                            name={`${prefix}-search`} 
                        />
                    }

                    {loading && <ActivityIndicator />}
                </View>
            </View>
        );
    } 

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            top: 20,
            borderRadius: 8,
            paddingHorizontal: 10,
            width: width - 50,
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: "#fff",
            elevation: 5,
        },
        icon : {
            fontSize: 25,
            color: "#d6d6d6",
        },
        input: {
            fontSize: 16,
            color: '#303030',
            maxWidth: '70%',
            minWidth: '30%',
            fontFamily: 'Poppins'
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10
        }
    }); 

    export default PlaceInput;