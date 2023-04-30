import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BuddySearchScreen from "../BuddySearchScreen/BuddySearchScreen.main";
import ListofBuddies from "./ListofBuddies";
import { TextInput, Button } from "react-native-paper";
import { View } from "react-native";
import { HomeStackParamList } from "./HomeStackScreen";

// This is a TypeScript Type that defines the parameters of this stack.
// Read More: https://reactnavigation.org/docs/typescript/

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, "HomePageScreen">;
}

export default function HomePageScreen({navigation} : Props) {
  const options = { headerShown: false };

  return (
    <View>
        
        <Button onPress = {() => navigation.navigate('ListofBuddies')}>List of Buddies</Button>
        <Button>Requests</Button>
        <Button>Matches</Button>
    </View>
    
  )
}
