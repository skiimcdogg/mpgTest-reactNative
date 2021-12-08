import React from 'react';
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createAppContainer, SafeAreaView } from "react-navigation";
import homeStack from "./homeStack";
import searchStack from "./searchStack";

const DefaultDrawer = (props) => (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );

const rootDrawerNavigation = createDrawerNavigator({
    Acceuil: {
        screen: homeStack,
    },
    'Recherche Joueur': {
        screen: searchStack,
    }
}, {
    contentComponent: DefaultDrawer,
});

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#ced',
        paddingTop: '15%',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 16,
    }
})

export default createAppContainer(rootDrawerNavigation);