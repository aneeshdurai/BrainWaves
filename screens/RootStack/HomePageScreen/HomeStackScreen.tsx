import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePageScreen from "./HomePageScreen";
import ListofBuddies from "./ListofBuddies";

export type HomeStackParamList = {
    HomePageScreen: undefined;
    ListofBuddies: undefined;
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
    </HomeStack.Navigator>
  );
}
