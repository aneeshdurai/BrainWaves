import React, { useState, useEffect } from "react";
import { Platform, View, Image } from "react-native";
import { Appbar, TextInput, Snackbar, Button} from "react-native-paper";
import { getFileObjectAsync, uuid } from "../../../Utils";
import { getApp, initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackScreen";

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "BuddySearchScreen">;
  }

export default function BuddySearchScreen({navigation}: Props) {
    
    const [name, setName] = useState<string>('')
    const [course, setCourse] = useState<string>('')
    const [loc, setLoc] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const courseList = [
        {
            label: "CS 61A",
            value: "CS 61A",
        },
        {
            label: "CS 61B",
            value: "CS 61B",
        },
        {
            label: "CS 61C",
            value: "CS 61C",
        },

    ]

    const match = () => {
        navigation.navigate('Home')
    }

    return (
        <>
            <View>
                {<TextInput 
                    label = "Course"
                    value = {course}
                    onChangeText = {course => setCourse(course)}
                    autoComplete = "off"
                />}
                {<TextInput 
                    label = "Location"
                    value = {loc}
                    onChangeText = {loc => setLoc(loc)}
                    autoComplete = "off"
                />}
                {<TextInput 
                    label = "Description"
                    value = {desc}
                    onChangeText = {desc => setDesc(desc)}
                    autoComplete = "off"
                />}
                {<Button onPress = {match}>Match</Button>}
            </View>
        
        
        
        </>
    )
}