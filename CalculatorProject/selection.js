import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

export default function Selection(){

  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoName2, setName2] = useState("");
  const [memoWeight2, setWeight2] = useState("");
  const [memoName3, setName3] = useState("");
  const [memoWeight3, setWeight3] = useState("");

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
  <View>
  <Text>Select profile:</Text>
  <TouchableOpacity onPress={Select1}><Text>User1: {memoName.name} </Text><TouchableOpacity onPress={Edit1} style={{backgroundColor:"red"}}><Text>EDIT</Text></TouchableOpacity></TouchableOpacity>
  <TouchableOpacity onPress={Select2}><Text>User2: {memoName2.name}</Text><TouchableOpacity onPress={Edit2} style={{backgroundColor:"red"}}><Text>EDIT</Text></TouchableOpacity></TouchableOpacity>
  <TouchableOpacity onPress={Select3}><Text>User3: {memoName3.name}</Text><TouchableOpacity onPress={Edit3} style={{backgroundColor:"red"}}><Text>EDIT</Text></TouchableOpacity></TouchableOpacity>
  </View>
  )
}