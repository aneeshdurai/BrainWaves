import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePageScreen from "./HomePageScreen";
import ListofBuddies from "./ListofBuddies";
import MatchesScreen from "./MatchesScreen";
import RequestScreen from "./RequestScreen";

export type HomeStackParamList = {
    HomePageScreen: undefined;
    ListofBuddies: undefined;
    RequestScreen: undefined;
    MatchesScreen: undefined;
  };

const HomeStack = createStackNavigator<HomeStackParamList>();

export function HomeStackScreen() {
  const options = { headerShown: false }
  return (
    <HomeStack.Navigator
      initialRouteName="HomePageScreen"
      >
      <HomeStack.Screen
        name="ListofBuddies"
        options={options}
        component={ListofBuddies}
      />
      <HomeStack.Screen
        name="HomePageScreen"
        options={options}
        component={HomePageScreen}
      />
      <HomeStack.Screen
        name="MatchesScreen"
        options={options}
        component={MatchesScreen}
      />
      <HomeStack.Screen
        name="RequestScreen"
        options={options}
        component={RequestScreen}
      />
    </HomeStack.Navigator>
  );
}
