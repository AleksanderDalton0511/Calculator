import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

export default function Users(){
  const navigation = useNavigation();
  
  const storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,
   
    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage
   
    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,
   
    // cache data in the memory. default is true.
    enableCache: true,
   
    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      // we'll talk about the details later.
    }
  });
   
  // load
  storage
    .load({
      key: 'user',
   
      // autoSync (default: true) means if data is not found or has expired,
      // then invoke the corresponding sync method
      autoSync: true,
   
      // syncInBackground (default: true) means if data expired,
      // return the outdated data first while invoking the sync method.
      // If syncInBackground is set to false, and there is expired data,
      // it will wait for the new data and return only after the sync completed.
      // (This, of course, is slower)
      syncInBackground: true,
   
      // you can pass extra params to the sync method
      // see sync example below
      syncParams: {
        extraFetchOptions: {
          // blahblah
        },
        someFlag: true
      }
    })
    .then(ret => {
      // found data go to then()
    })
    .catch(err => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");

  function Save(){
    storage.save({
      key: 'user', // Note: Do not use underscore("_") in key!
      data: {
        Name: {name},
        Gender: {gender},
        Weight: {weight}
      },
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
    navigation.navigate("Calculator");
  }

  return(
    <View>
    <Text>Name</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setName(newText)}
      />
      <Text>Gender</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setGender(newText)}
      />
      <Text>Weight</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setWeight(newText)}
      />

      <TouchableOpacity><Text style={{backgroundColor: "lightgrey"}}>Cancel</Text></TouchableOpacity>
      <TouchableOpacity onPress={Save}><Text style={{backgroundColor: "green"}}>Save</Text></TouchableOpacity>
      </View>
  )
}