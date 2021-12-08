import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import SearchPlayer from '../Components/SearchPlayer';
import HeaderSearch from '../shared/headerSearch';


const screens = {
    SearchPlayer: {
        screen: SearchPlayer,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <HeaderSearch navigation={navigation} />,
            }
        }
    
    }
}

const disclaimerStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#687'}
    }
});

export default disclaimerStack;