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
        const url = `${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}&location=${latitude},${longitude}&radius=2000&language=fr`
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