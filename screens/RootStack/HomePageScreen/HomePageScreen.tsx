import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BuddySearchScreen from "../BuddySearchScreen/BuddySearchScreen.main";
import ListofBuddies from "./ListofBuddies";
import MatchesScreen from "./MatchesScreen";
import RequestScreen from "./RequestScreen";
import { TextInput, Button, Appbar } from "react-native-paper";
import { View, Image} from "react-native";
import { HomeStackParamList } from "./HomeStackScreen";
import { getAuth, signOut } from "firebase/auth";
import { styles } from "./ListofBuddies.styles";

// This is a TypeScript Type that defines the parameters of this stack.
// Read More: https://reactnavigation.org/docs/typescript/

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, "HomePageScreen">;
}

export default function HomePageScreen({navigation} : Props) {
  const options = { headerShown: false };
  const auth = getAuth();

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Content title="BrainWaves" />
      </Appbar.Header>
    );
  };
  
  return (
    <>
    <Bar/>
    <View>
        <Button onPress = {() => navigation.navigate('ListofBuddies')}>List of Buddies</Button>
        <Button onPress = {() => navigation.navigate('RequestScreen')}>Requests</Button>
        <Button onPress = {() => navigation.navigate('MatchesScreen')}>Matches</Button>
        <Image
          style={styles.tinyLogo}
          source={{
          uri: '../../../assets/logo.png',
          }}
        />
    </View>
    </>
  )
}
