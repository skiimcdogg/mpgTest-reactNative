import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Important = ({ navigation }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  let urlPlayers =
    'https://api.mpg.football/api/data/championship-players-pool/1';

  const fetchPlayers = () => {
    axios
      .get(urlPlayers)
      .then((response) => {
        setPlayers(response.data.poolPlayers);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchPlayers();
  }, []);

  const handleSearch = (valueFromSearch) => {
    setSearch(valueFromSearch)
  }

  const playersArray = Object.values(players);


  const resultSearch = playersArray
  .filter((item) => {
    const lowerSearch = search.toLocaleLowerCase()
    const lastName = (item.lastName ?? '').toLocaleLowerCase();
    const firstName = (item.firstName ?? '').toLocaleLowerCase();
    const position = item.ultraPosition.toString();
    return lastName.includes(lowerSearch) || firstName.includes(lowerSearch) || position.includes(search)
  })

    return (
      <View>
        <TextInput
        style={styles.input}
        onChangeText={(e) => handleSearch(e)}
        value={search}
        placeholder='Cherchez un joueur selon son nom/prénom ou sa position ...'
      />
      <View style={styles.box}>
        <Text style={styles.info}>Positions:</Text>
        <Text style={styles.info}> <Text style={styles.boldText}>10</Text>= Gardien, <Text style={styles.boldText}>20</Text>= Défenseur, <Text style={styles.boldText}>21</Text>= Latéral, <Text style={styles.boldText}>30</Text>= Milieu défensif, <Text style={styles.boldText}>31</Text>= Milieu offensif, <Text style={styles.boldText}>40</Text>= Attaquant</Text> 
      </View>
        {loading ? <ActivityIndicator size="large" color="#00ff00" /> :
        <FlatList
        data={resultSearch}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PlayerDetails', item)}
          >
            <Text style={styles.textClub}>
              {item.lastName} {item.firstName}
            </Text>
          </TouchableOpacity>
        )}
      />
        }

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
      marginTop: '5%',
    },
    club: {
      margin: '1%',
      // width: '100%',
    },
    textClub: {
      letterSpacing: 1,
      margin: '3%',
      fontSize: 18,
    },
    messageText: {
      letterSpacing: 1,
      marginTop: '3%',
      fontSize: 18,
    },
    info: {
      letterSpacing: 1,
      fontSize: 15,
      // marginTop: '1%',
      // marginLeft: '1%',
    },
    box: {
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: 5,
      marginHorizontal: 12,
      backgroundColor: "#ffe",
      padding: 5,
    },
    boldText: {
      fontWeight: 'bold'
    }
  });

  export default Important;