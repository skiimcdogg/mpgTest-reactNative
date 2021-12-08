import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import Clubs from './../Components/Clubs'
import Players from './../Components/Players'
import PlayerDetails from './../Components/PlayerDetails'
import Header from './../shared/header'

const screens = {
    Clubs: {
        screen: Clubs,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            }
        }
    },
    Players: {
        screen: Players,
        navigationOptions: {
            title: 'Liste des joueurs',
        }
    },
    PlayerDetails: {
        screen: PlayerDetails,
        navigationOptions: {
            title: 'Détails joueur',
        }
    }
}

const homeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#233',
        headerStyle: { backgroundColor: '#687'}
    }
});

export default homeStack;