import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Appbar, Button, Card } from "react-native-paper";
import firebase from "firebase/app"
import { getFirestore, collection, query, onSnapshot, orderBy, setDoc, doc, deleteDoc } from "firebase/firestore";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { getAuth, signOut } from "firebase/auth";
import { Ticket } from "../../../models/ticket";
import { styles } from "./ListofBuddies.styles";
import { HomeStackParamList } from "./HomeStackScreen";


interface Props {
    navigation: StackNavigationProp<HomeStackParamList, "ListofBuddies">;
  }


export default function ListofBuddies({navigation}: Props) {
     
    //const RootStack = createStackNavigator<RootStackParamList>();

    const [tickets, setTickets] = useState<Ticket[]>([]);

    const auth = getAuth();
    const currentUserId = auth.currentUser!.uid;
    console.log(auth.currentUser)
    const db = getFirestore();
    const ticketCollection = collection(db, "tickets");

    useEffect(() => {
        const unsubscribe = onSnapshot(query(ticketCollection, orderBy("course")), (querySnapshot) => {
        var newTickets: Ticket[] = [];
            querySnapshot.forEach((ticket: any) => {
              const newTicket = ticket.data() as Ticket;
              newTicket.id = ticket.id;
              newTickets.push(newTicket);
            });
            setTickets(newTickets);
        });
        return unsubscribe;
    }, []);

    const deleteTicket = async (ticket: Ticket) => {
      
      if (ticket.id) {
        await deleteDoc(doc(db, "tickets", ticket.id));
      }
    };

    const match = async (ticket: Ticket) => {
      if (ticket.id) {
        await setDoc(doc(db, "tickets", ticket.id), ticket);
      }
      else {
        await setDoc(doc(db, "tickets", "1"), ticket);
      }
    }

    const renderTicket = ({ item }: { item: Ticket }) => {
        
        if (currentUserId != item.id) {
          return (

            <Card style={{ margin: 16 }}>
              <Card.Title
                title={item.name +
                  ", " + item.location}
                subtitle={
                  item.description
                }
              />
              <Card.Actions>
                <Button onPress={() => {match(item)}}>
                  MATCH
                </Button>
              </Card.Actions>
            </Card>
          );
        }
        else {
          return (
            <Card style={{ margin: 16 }}>
              <Card.Title
                title={item.name +
                  ", " + item.location}
                subtitle={
                  item.description
                }
              />
            </Card>
          )
        }
      };


      const Bar = () => {
        return (
          <Appbar.Header>
            <Appbar.Action
              icon="exit-to-app"
              onPress={() => {
                signOut(auth);
              }}
            />
            <Appbar.Content title="List of Buddies" />
            <Appbar.Action
              icon="close"
              onPress={() => {
                navigation.navigate("HomePageScreen");
                
              }}
            />
          </Appbar.Header>
        );
      };

    const ListEmptyComponent = () => {
        return (
            <Button onPress = {() => navigation.navigate('HomePageScreen')}>No Tickets At This Time</Button>
        )
      }

    return (
        <>
            <Bar/>
            <View style={styles.container}>
                <FlatList
                    data={tickets}
                    renderItem={renderTicket}
                    keyExtractor={(_: any, index: number) => "key-" + index}
                    // TODO: Uncomment the following line, and figure out how it works
                    // by reading the documentation :)
                    // https://reactnative.dev/docs/flatlist#listemptycomponent

                    ListEmptyComponent={ListEmptyComponent}
                 />
             </View>
        </>
        
    )
}