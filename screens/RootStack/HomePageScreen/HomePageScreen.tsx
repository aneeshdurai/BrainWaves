import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BuddySearchScreen from "../BuddySearchScreen/BuddySearchScreen";
import { TextInput, Button } from "react-native-paper";
import { View } from "react-native";

// This is a TypeScript Type that defines the parameters of this stack.
// Read More: https://reactnavigation.org/docs/typescript/


export function HomePageScreen() {
  return (
    <View>
        <Button>List of Buddies</Button>
        <Button>Map of Buddies</Button>
        <Button>Requests</Button>
        <Button>Matches</Button>
    </View>
    
  )
}
