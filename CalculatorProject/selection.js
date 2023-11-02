import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataTable } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

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

  function EditX(){
    if (memoName2.name==""){
      Edit2();
    }
    else if (memoName2.name!="" && memoName3.name==""){
      Edit3();
    }
  }

  let UserPackage = <View style={{backgroundColor: "white", borderColor: "lightgrey", width: "100%", borderBottomWidth: 0.5,  borderColor: "lightgrey"}}>
    <TouchableOpacity style={{marginLeft: "3.5%"}} onPress={Select1}><Text>{memoName.name}, {memoGender.gender}</Text></TouchableOpacity>
    <TouchableOpacity onPress={Edit1} style={{marginLeft: "80%"}}><Text style={{color: "green"}}>Modify</Text></TouchableOpacity>
    <Text style={{marginLeft: "3.5%"}}>{memoWeight.weight}kg</Text>
  </View>

  let UserPackage2 = <View style={{backgroundColor: "white", borderColor: "lightgrey", width: "100%", borderBottomWidth: 0.5,  borderColor: "lightgrey"}}>
    <TouchableOpacity style={{marginLeft: "3.5%"}} onPress={Select1}><Text>{memoName2.name}, {memoGender2.gender}</Text></TouchableOpacity>
    <TouchableOpacity onPress={Edit2} style={{marginLeft: "80%"}}><Text style={{color: "green"}}>Modify</Text></TouchableOpacity>
    <Text style={{marginLeft: "3.5%"}}>{memoWeight2.weight}kg</Text>
  </View>

  let UserPackage3 = <View style={{backgroundColor: "white", borderColor: "lightgrey", width: "100%", borderBottomWidth: 0.5,  borderColor: "lightgrey"}}>
    <TouchableOpacity style={{marginLeft: "3.5%"}} onPress={Select1}><Text>{memoName3.name}, {memoGender3.gender}</Text></TouchableOpacity>
    <TouchableOpacity onPress={Edit3} style={{marginLeft: "80%"}}><Text style={{color: "green"}}>Modify</Text></TouchableOpacity>
    <Text style={{marginLeft: "3.5%"}}>{memoWeight3.weight}kg</Text>
  </View>

  let buttonAvailable = <DataTable.Row style={{backgroundColor: "white"}}> 
    <DataTable.Cell style={{justifyContent: "center"}}><TouchableOpacity onPress={EditX}><Text style={{color: "green"}}>Add new user</Text></TouchableOpacity></DataTable.Cell>  
  </DataTable.Row>

  if(memoName.name!="" && memoName2.name!="" && memoName3.name!=""){
    buttonAvailable = "";
  }

  if (memoName.name==""){
    UserPackage = "";
  }
  if (memoName2.name==""){
    UserPackage2 = "";
  }
  if (memoName3.name==""){
    UserPackage3 = "";
  }

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

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'}
  ]);

  const [alerts, setAlerts] = useState("");

  return(
    <ScrollView style={styles.container}>

      <DataTable style={{marginTop: "8%"}}> 
      
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 36, color: "white"}}>Settings</Text></DataTable.Cell> 
      </DataTable.Row> 
  
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}>   
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 20, opacity: 0.7, color: "white"}}>General settings</Text></DataTable.Cell> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "14.5%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{paddingTop: "7%", backgroundColor: "white"}}> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>USERS</Text></DataTable.Cell>
        <DataTable.Cell><TouchableOpacity style={{marginLeft: "60%", borderRadius: 15, backgroundColor: "lightgrey"}}><Text style={{fontSize: 16, color: "#6c6c6c", paddingLeft: "20%", paddingRight: "20%", paddingBottom: "2%", paddingTop: "2%"}}>Delete</Text></TouchableOpacity></DataTable.Cell>  
      </DataTable.Row> 

    {UserPackage}

    {UserPackage2}

    {UserPackage3}

    {buttonAvailable}

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c", marginTop: "8%"}}>APPLICATION SETTINGS</Text></DataTable.Cell>
        <DataTable.Cell>
      </DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "black"}}>Send alerts</Text></DataTable.Cell>
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
      value={alerts}
      items={items}
      setOpen={setOpen}
      setValue={setAlerts}
      setItems={setItems}
    /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>ABOUT</Text></DataTable.Cell>
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><TouchableOpacity><Text style={{fontSize: 16, color: "black"}}>Disclaimer</Text></TouchableOpacity></DataTable.Cell>
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><TouchableOpacity><Text style={{fontSize: 16, color: "black"}}>Rate this app</Text></TouchableOpacity></DataTable.Cell>
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row> 
        <DataTable.Cell><TouchableOpacity style={{backgroundColor: "grey"}}><Text style={{fontSize: 16, color: "black"}}>Done</Text></TouchableOpacity></DataTable.Cell>
      </DataTable.Row> 

      </DataTable> 

      </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#61a22d",
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