import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

const Players = ({ navigation }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const playersArray = Object.values(players);

  const clubId = navigation.state.params.id;

  let filteredPlayersArray = playersArray.filter((e) => {
    return e.clubId.normalize() === clubId.normalize();
  });

  return (
    <View style={styles.list}>
      {loading ? <ActivityIndicator size="large" color="#00ff00" /> : 
      filteredPlayersArray.length === 0 ? (
        <Text style={styles.messageText}>Ce club ne dispose pas de joueurs pour ce pool</Text>
      ) : (
        <FlatList
        style={styles.club}
          data={filteredPlayersArray}
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
      )
      }
    </View>
  );
};

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
  }
});

export default Players;
