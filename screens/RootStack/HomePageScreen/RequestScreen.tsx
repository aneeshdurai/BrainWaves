import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { Appbar, Button, Card} from "react-native-paper";
import Dialog from "react-native-dialog";
import firebase from "firebase/app"
import { getFirestore, collection, query, onSnapshot, orderBy, setDoc, doc, deleteDoc } from "firebase/firestore";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { getAuth, signOut } from "firebase/auth";
import { Ticket } from "../../../models/ticket";
import { styles } from "./ListofBuddies.styles";
import { HomeStackParamList } from "./HomeStackScreen";


interface Props {
    navigation: StackNavigationProp<HomeStackParamList, "RequestScreen">;
  }


export default function ListofBuddies({navigation}: Props) {
     
    //const RootStack = createStackNavigator<RootStackParamList>();

    const [tickets, setTickets] = useState<Ticket[]>([]);

    const auth = getAuth();
    const currentUserId = auth.currentUser!.uid;
    //console.log(auth.currentUser)
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
            //console.log(newTickets);
            setTickets(newTickets);
        });
        return unsubscribe;
    }, []);

    const findATicket = (uid: string) => {
        var id: Ticket = tickets[0]
        tickets.forEach((ticket: Ticket) => {
         // const newTicket = ticket.data() as Ticket;
          if (ticket.uid === uid) {
            //console.log("FOUND!!", ticket.id, "+", uid, "+", ticket.uid)
            id = ticket;
          }
          }
        )
        return id
        
      }

    const myticket = findATicket(currentUserId);

    const request = async (ticket: Ticket) => {
        return (
          console.log(findATicket(ticket.uid))
        )
      }

    const accept = async (ticket: Ticket) => {
        myticket.matched = true
        myticket.matchedID = ticket.uid
        ticket.matched = true
        ticket.matchedID = myticket.uid
        myticket.requests = []
        ticket.requests = []
        
        if (ticket.id) {
            await setDoc(doc(db, "tickets", ticket.id), ticket);
        }
        if (myticket.id) {
            await setDoc(doc(db, "tickets", myticket.id), myticket);
        }

        //const [visible, setVisible] = React.useState(false);

        //const hideDialog = () => setVisible(false);


        
        /*return (
            <Card style={{ margin: 16 }}>
              <Card.Title
                title={"You have matched with " + ticket.name +
                  " at " + ticket.location}
                subtitle={
                  ticket.description
                }
              />
            </Card>
          );*/
          Alert.alert(('You have matched with ' + ticket.name + ' at ' + ticket.location), (ticket.description), [
            
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
    }

    const decline = async (ticket: Ticket) => {
        myticket.requests.splice(myticket.requests.indexOf(ticket.uid), 1)
        ticket.requests.splice(ticket.requests.indexOf(myticket.uid), 1)
        console.log(myticket)
        console.log(ticket)

        if (ticket.id) {
            await setDoc(doc(db, "tickets", ticket.id), ticket);
        }
        if (myticket.id) {
            await setDoc(doc(db, "tickets", myticket.id), myticket);
        }
        
        Alert.alert(('You have declined the request from ' + ticket.name), (ticket.description), [
            
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
    }

    const renderTicket = ({ item }: { item: Ticket }) => {
        
        //console.log(item)
        //console.log("UID", currentUserId)
        //const item = findATicket(uid)
        //console.log(item)
        if (myticket.requests.includes(item.uid)){
          return (

            <Card style={{ margin: 16 }}>
              <Card.Title
                title={item.name +
                  " at " + item.location}
                subtitle={
                  item.description
                }
              />
              <Card.Actions>
                <Button onPress={() => {accept(item)}}>
                  ACCEPT
                </Button>
                <Button onPress={() => {decline(item)}}>
                  DECLINE
                </Button>
              </Card.Actions>
            </Card>
          );
        }
        /*else {
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
              ); 
        }*/
        
      };
    
      const deleteTicket = async (ticket: Ticket) => {
      
        if (ticket.id) {
          await deleteDoc(doc(db, "tickets", ticket.id));
        }
      };

      const Bar = () => {
        return (
          <Appbar.Header>
            <Appbar.Action
              icon="exit-to-app"
              onPress={() => {
                deleteTicket(myticket);
                if (auth.currentUser?.uid != null) {
                  signOut(auth);
                }
              }}
            />
            <Appbar.Content title="Requests" />
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
            <Button onPress = {() => navigation.navigate('HomePageScreen')}>No Requests At This Time</Button>
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