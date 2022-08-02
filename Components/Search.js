import React, {useState} from 'react'
import {StyleSheet, View, Button, TextInput, FlatList} from 'react-native'

import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

function Search() {
    const [films, setFilms] = useState([]);
    const [searchedText, setSearchedText] = useState("")

    function loadFilms() {
        if (searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(searchedText)
                .then(data => setFilms(data.results));
        }
    }

    function searchTextInputChanged(text) {
        setSearchedText(text);
    }

    return (
        <View style={styles.main_container}>
            <TextInput onChangeText={(text) => searchTextInputChanged(text)} style={styles.textinput}
                       placeholder="Titre du film"/>
            <Button style={styles.bouton} title="Rechercher" onPress={() => loadFilms()}/>
            <FlatList
                data={films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <FilmItem film={item}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 20,
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 5
    },
    bouton: {
        height: 50
    }
})


export default Search
