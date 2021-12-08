import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

function Clubs({ navigation }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);

  let urlClubs = 'https://api.mpg.football/api/data/championship-clubs';

  const fetchClubs = () => {
    axios
    .get(urlClubs)
    .then((response) => {
      setClubs(response.data.championshipClubs);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  };


  useEffect(() => {
    setLoading(true);
    fetchClubs();
  }, []);

    
    
    const clubsArray = Object.values( clubs )
        

    return (
      <View style={styles.list}>
      <FlatList
      style={styles.club}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
      data={clubsArray}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Players', item)}>
          <Text style={styles.textClub}>{item.name["fr-FR"]}</Text>
        </TouchableOpacity>
      )}
      />
      </View>
    );
  }

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    list: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: '15%',
      paddingTop: '5%',
    },
    club: {
      margin: '1%',
      // justifyContent: 'center',

      // width: '100%',
    },
    textClub: {
      letterSpacing: 1,
      margin: '3%',
      fontSize: 18,
    },
  });

  export default Clubs;