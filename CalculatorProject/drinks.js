import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Drinks(){
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
    <SafeAreaView style={styles.container}>

      <DataTable style={{marginTop: "8%"}}> 
      
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 36, color: "white"}}>Add new drink</Text></DataTable.Cell> 
      </DataTable.Row> 
  
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}>   
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 20, opacity: 0.7, color: "white"}}>Please enter data about your drink</Text></DataTable.Cell> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "14.5%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{paddingTop: "7%", backgroundColor: "white"}}> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Drink type</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><DropDownPicker
        style={{
          minHeight: "1%",
          borderColor: "red",
          width: "110%"
        }} 
        dropDownContainerStyle={{
          width: "110%"
        }}
      placeholder='Select'
      dropDownDirection="TOP"
      open={open}
      value={gender}
      items={items}
      setOpen={setOpen}
      setValue={setGender}
      setItems={setItems}
    /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Alcohol content</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell>
      <TextInput
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setName(newText)}
        placeholder="Your name"
      /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Amount</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><TextInput
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setWeight(newText)}
        placeholder="kg"
        keyboardType="numeric"
      /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Time finished</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><TextInput
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setWeight(newText)}
        placeholder="kg"
        keyboardType="numeric"
      /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
      </DataTable.Row> 

      </DataTable> 

      <View style={styles.parent}>
        <TouchableOpacity style={{backgroundColor: "#f4f6f5", width:"50%"}}><Text style={{marginTop: "15%", marginLeft: "42%"}}>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={Save} style={{backgroundColor: "#81b458", width:"50%"}}><Text style={{color: "white", marginTop: "15%", marginLeft: "42%"}}>Save</Text></TouchableOpacity>
      </View>

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#61a22d"
  },
  parent: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "10%",
  },
});