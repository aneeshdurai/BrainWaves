import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BuddySearchScreen from "./BuddySearchScreen/BuddySearchScreen";
import {HomePageScreen } from "./HomePageScreen/HomePageScreen";


export type RootStackParamList = {
  Home: undefined;
  BuddySearchScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{ presentation: "modal" }}
        initialRouteName="BuddySearchScreen"
      >
        <RootStack.Screen
          name="BuddySearchScreen"
          options={options}
          component={BuddySearchScreen}
        />
        <RootStack.Screen
          name="Home"
          component={HomePageScreen}
          options={options}
        />
        
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
