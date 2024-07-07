import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Text, TextInput, FlatList, TextInputSubmitEditingEventData, NativeSyntheticEvent, Keyboard, TouchableWithoutFeedback } from "react-native";
import IconFA from 'react-native-vector-icons/FontAwesome';

export const Search = ({userId}) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const dropdownData = [
      { id: 1, title: 'Apple' },
      { id: 2, title: 'Banana' },
      { id: 3, title: 'Cherry' },
      { id: 4, title: 'Date' },
      { id: 5, title: 'Elderberry' },
      { id: 6, title: 'Fig' },
      { id: 7, title: 'Grape' },
      { id: 8, title: 'Honeydew' },
    ];
    const [filteredData, setFilteredData] = useState(dropdownData);

    const renderItem = ({ item }) => (
        <Text style={styles.item}>{item.title}</Text>
    );
    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };
    const handleSearch = async (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
      ) => {
        const query = e.nativeEvent.text;
        console.log(query)
        const searchData = {
          search_entry: query
        }
        const filteredItems = dropdownData.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filteredItems);
        setSearchQuery('');
        dismissKeyboard();
        try {
          const response = await fetch(`http://10.0.2.2:5000/updatesearch?id=${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
          });
          if (!response.ok) {
            throw new Error('Search response was not ok');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    return (
        <View style={styles.container}>
          <View style={styles.searchbar}>
            <IconFA.Button
              color="black"
              backgroundColor="transparent"
              name="search"
            />
            <TextInput
                style={styles.input}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
            />
          </View>
            {/* <FlatList
                style={styles.productlist}
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            /> */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'space-evenly',
        width: Dimensions.get('window').width,
        height: 80,
        top: '5%',
        left: 40,
        backgroundColor: 'transparent',
    },
    searchbar: {
      flexDirection: 'row',
      width: Dimensions.get('window').width * 0.8,
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 2,
      marginBottom: 10,
    },
    icons: {
        width: 60,
        height: 60,
    },
    item: {
      textAlign: 'center'
    },
    input: {
      height: 40,
      width: Dimensions.get('window').width 
    },
});