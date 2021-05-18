import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity  
} from 'react-native';

import Cover from './Cover';

const CoverList = ({images}) => {

    /**
    * retourne chaque enfant de la liste
    */
    const renderCover = ({item}) => {
        
        return (
            <TouchableOpacity>
                <Cover image={item.imageSrc} />
            </TouchableOpacity>
        )
    }

    return (


        <FlatList
            data={images}
            horizontal={true}
            renderItem={(item) => renderCover(item)}
            keyExtractor={item => item.id}
        />
    );
}

const styles = StyleSheet.create({
    container: {

    }
});

export default CoverList;