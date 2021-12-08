import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';


const PlayerDetails = ({ navigation }) => {
  const [playerDetails, setPlayersDetails] = useState([])

  const playerId = navigation.state.params.id

  const playerUrl = `https://api.mpg.football/api/data/championship-player-stats/${playerId}/summary`;

  const fetchPlayerDetails = () => {
    axios
    .get(playerUrl)
    .then((response) => {
      setPlayersDetails(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    fetchPlayerDetails();
  }, []);

  
  const playerDetailsArray = Object.values( playerDetails )
  const years = playerDetailsArray[2]
  
  console.log(years);
    return (
      <View style={styles.mainView}>
        <Text style={styles.detail}>{playerDetails.id}</Text>
        <Text style={styles.detail}>{playerDetails.type}</Text>
        <Text style={styles.subTitle}>Statistiques des saisons :</Text>
        <FlatList
       data={years}
       renderItem={({ item }) => (   
         <View>
           <Text style={styles.detail}>{item}</Text>       
         </View>     
       )}
       keyExtractor={(item, index) => index.toString()}
       />
      </View>
    );
  }

  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: '2%',
      marginTop: '5%',
    },
    detail: {
      letterSpacing: 1,
      margin: '3%',
      fontSize: 18,
    },
    subTitle: {
      letterSpacing: 1,
      margin: '3%',
      fontSize: 18,
      textDecorationLine: 'underline',
    }
  });

  export default PlayerDetails;