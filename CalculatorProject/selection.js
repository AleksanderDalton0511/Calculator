import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Selection(){

  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");
  const [memoName2, setName2] = useState("");
  const [memoGender2, setMemoGender2] = useState("");
  const [memoWeight2, setWeight2] = useState("");
  const [memoName3, setName3] = useState("");
  const [memoWeight3, setWeight3] = useState("");
  const [memoGender3, setMemoGender3] = useState("");

  function Select1(){
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });
    storage.save({
      key: 'number', // Note: Do not use underscore("_") in key!
      data: "",
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
    navigation.navigate("Calculator");
  }
  function Select2(){
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });
    storage.save({
      key: 'number', // Note: Do not use underscore("_") in key!
      data: "2",
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
    navigation.navigate("Calculator");
  }
  function Select3(){
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });
    storage.save({
      key: 'number', // Note: Do not use underscore("_") in key!
      data: "3",
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
    navigation.navigate("Calculator");
  }



  useEffect(() => {
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });
  
    // load
    storage
      .load({
        key: 'user',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true
        }
      })
      .then(ret => {
        setWeight(ret.Weight);
        setName(ret.Name);
        setMemoGender(ret.Gender);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      })
      storage
      .load({
        key: 'user2',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true
        }
      })
      .then(ret => {
        setWeight2(ret.Weight);
        setName2(ret.Name);
        setMemoGender2(ret.Gender);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      })
      storage
      .load({
        key: 'user3',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true
        }
      })
      .then(ret => {
        setWeight3(ret.Weight);
        setName3(ret.Name);
        setMemoGender3(ret.Gender);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      })
  }, []);

  const navigation = useNavigation();

  function Edit1(){
    navigation.navigate("Users");
  }
  function Edit2(){
    navigation.navigate("Users2");
  }
  function Edit3(){
    navigation.navigate("Users3");
  }

  return(
  <SafeAreaView style={styles.container}>
  <Text style={{fontSize: 28, color: "white"}}>Settings</Text>
  <Text style={{fontSize: 16, color: "lightgrey"}}>General settings</Text>

  <View style={styles.parent}>
    <Text style={{color: "grey", marginTop: "10%"}}>USERS</Text>
    <TouchableOpacity style={{marginLeft: "65%", marginTop: "10%"}}><Text style={{backgroundColor: "lightgrey", paddingLeft: "15%", paddingRight: "15%", borderRadius: 50}}>Edit</Text></TouchableOpacity>
  </View>

  <View style={{backgroundColor: "white", borderWidth: 1, borderColor: "lightgrey", width: "100%"}}>
    <TouchableOpacity style={{marginLeft: "1.5%"}} onPress={Select1}><Text>{memoName.name}, {memoGender.gender}</Text></TouchableOpacity>
    <TouchableOpacity onPress={Edit1} style={{marginLeft: "60%"}}><Text style={{color: "green"}}>Modify</Text></TouchableOpacity>
    <Text style={{marginLeft: "1.5%"}}>{memoWeight.weight}kg</Text>
  </View>

  <View style={{backgroundColor: "white", borderWidth: 1, borderColor: "lightgrey", width: "100%"}}>
    <TouchableOpacity style={{marginLeft: "1.5%"}} onPress={Select2}><Text>{memoName2.name}, {memoGender2.gender}</Text></TouchableOpacity>
    <TouchableOpacity onPress={Edit2} style={{marginLeft: "60%"}}><Text style={{color: "green"}}>Modify</Text></TouchableOpacity>
    <Text style={{marginLeft: "1.5%"}}>{memoWeight2.weight}kg</Text>
  </View>

  <View style={{backgroundColor: "white", paddingBottom: "2%", paddingTop: "2%", borderWidth: 1, alignItems: 'center', borderColor: "lightgrey", width: "100%"}}>
    <TouchableOpacity><Text style={{color: "green"}}>Add new user</Text></TouchableOpacity>
  </View>

  <View style={{backgroundColor: "white", paddingTop: "5%", borderWidth: 1, borderColor: "lightgrey", width: "100%"}}>
    <Text style={{marginLeft: "1.5%"}}>Application settings</Text>
  </View>

  <View style={styles.parent}>
    <Text style={{marginRight: "65%"}}>BAC units</Text>
    <Text>Permille</Text>
  </View>

  <View style={styles.parent}>
    <Text style={{marginRight: "55%"}}>Send BAC alerts</Text>
    <Text>Permille</Text>
  </View>

  <View style={styles.parent}>
    <Text style={{marginRight: "86.5%"}}>About</Text>
  </View>

  <View style={styles.parent}>
    <Text style={{marginRight: "80%"}}>Disclaimer</Text>
  </View>

  <View style={styles.parent}>
    <Text style={{marginRight: "80%"}}>Rate this app</Text>
  </View>

  <View style={styles.parent}>
    <Text style={{marginRight: "80%"}}>Send feedback</Text>
  </View>

  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#4CBB17",
    borderWidth: 1,
    borderColor: "lightgrey",
    width: "100%"
  },
  parent: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgrey"
  },
});