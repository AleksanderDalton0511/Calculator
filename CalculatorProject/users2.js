import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Users2(){
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

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");

  function Save(){
    storage.save({
      key: 'user2', // Note: Do not use underscore("_") in key!
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

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'}
  ]);

  return(
    <View style={styles.container}>

    <View style={{alignItems: 'center',
    justifyContent: 'top', marginTop: "15%"}}>
    <Text style={{color: "white", fontSize: 32}}>Hello!</Text>
    <Text style={{color: "lightgrey", fontSize: 18}}>Please tell us about yourself</Text>
    </View>

    <View style={{backgroundColor: "white", marginTop: "15%", alignItems: "center", width: "100%", borderWidth: 1, borderColor: "grey", paddingBottom: "10%"}}>
    <Text>To estimate your blood alcohol level correctly we need some information</Text>
    </View>

    <View style={{flexDirection: "row", backgroundColor: "white", width: "100%", height: "5%", borderWidth: 1, borderColor: "lightgrey"}}>
      <Text style={{paddingRight: "10%"}}>Name</Text>
      <TextInput
        style={{paddingLeft: "25%", width: "20%" }}
        onChangeText={newText => setName(newText)}
      />
    </View>

    <View style={{flexDirection: "row", backgroundColor: "white", width: "100%", height: "5%", borderWidth: 1, borderColor: "lightgrey"}}>
      <Text>Gender</Text>
      <DropDownPicker
      open={open}
      value={gender}
      items={items}
      setOpen={setOpen}
      setValue={setGender}
      setItems={setItems}
    />
    </View>

    <View style={{flexDirection: "row", backgroundColor: "white", width: "100%", height: "5%", borderWidth: 1, borderColor: "lightgrey"}}>
      <Text>Weight</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setWeight(newText)}
      />
    </View>

      <View style={styles.parent}>
      <TouchableOpacity style={{width: "50%"}}><Text style={{backgroundColor: "lightgrey"}}>Cancel</Text></TouchableOpacity>
      <TouchableOpacity style={{width: "50%"}} onPress={Save}><Text style={{backgroundColor: "green"}}>Save</Text></TouchableOpacity>
      </View>

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red"
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white"
  },
});