# Notre Composant Prediction

Ici, on va afficher les prédictions à l'écran, pour le faire on va creer un nouveau composant nommée `Prédiction.js`

Dans `Prédiction.js`

- On reçoit `main_text` et `secondary_text` en `props`

Dans `Prédiction.js`

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


Dans `PlaceInput.js`

- On importe `Prédiction.js`

- On destructure prediction du state `const { place, loading, prediction } = state;`

- `{ (!loading && prediction.length > 0) && renderPredictions() }`, Si loading est false et que la longueur de la predictions est supérieur a 0, on appel la fonction renderPredictions(), sinon on n'affiche rien

- Dans `renderPredictions()`

    - `prediction.map(prediction => {})` On fait la tour de chaque prédiction

    - `const { structure_formatting, id, place_id } = prediction;` On destructure l'objet prediction

    - `<Prediction main_text={structure_formatting.main_text} secondary_text={structure_formatting.secondary_text} key={id} />` , on met chaque prediction dans un composant Prediction avec les props qui von bien 


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
    import Prediction from './Prediction';

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

        const { place, loading, prediction } = state;

        /**
        * 
        * recherche une prediction 
        */
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

        /**
        * 
        * retoune chaque ville/rue/pays/entreprise d'une prédiction
        */
        const renderPredictions = () => {
            return prediction.map(prediction => {

                const { structure_formatting, id, place_id } = prediction;

                return (
                    <Prediction 
                        main_text={structure_formatting.main_text}
                        secondary_text={structure_formatting.secondary_text}
                        key={id}
                    />
                );
            });
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

                { (!loading && prediction.length > 0) && renderPredictions() }
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