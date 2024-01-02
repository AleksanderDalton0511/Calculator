import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function User(){
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
  const [limit, setLimit] = useState("");
  const [unit, setUnit] = useState("European");

  const [noFile, setNoFile] = useState(true);

  useEffect(() => {
    storage
      .load({
        key: 'user1',
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
        setNoFile(false);
        setWeight(ret.Weight.weight);
        setGender(ret.Gender.gender);
        setLimit(ret.Limit.limit);
        setName(ret.Name.name);
        setUnit(ret.Unit.unit);
      });
    
  }, []);

  if(noFile && weight!="" && gender!= ""){
    storage.save({
      key: 'user1', // Note: Do not use underscore("_") in key!
      data: {
        Name: {name},
        Gender: {gender},
        Weight: {weight},
        Limit : {limit}
      },
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
  }

  function Save(){
    storage.save({
      key: 'user1', // Note: Do not use underscore("_") in key!
      data: {
        Name: {name},
        Gender: {gender},
        Weight: {weight},
        Limit : {limit},
        Unit: {unit}
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

  const [open5, setOpen5] = useState(false);
  const [items5, setItems5] = useState([
    {label: 'European', value: 'European'},
    {label: 'American', value: 'American'}
  ]);

  const [open2, setOpen2] = useState(false);
  const [items2, setItems2] = useState([
    {label: '0.0', value: '0.0'},
    {label: '0.1', value: '0.1'},
    {label: '0.2', value: '0.2'},
    {label: '0.3', value: '0.3'},
    {label: '0.4', value: '0.4'},
    {label: '0.5', value: '0.5'},
    {label: '0.6', value: '0.6'},
    {label: '0.7', value: '0.7'},
    {label: '0.8', value: '0.8'},
    {label: '0.9', value: '0.9'}
  ]);

  function Home(){
    navigation.navigate("Calculator");
  }

  return(
    <SafeAreaView style={styles.container}>

      <DataTable style={{marginTop: "8%"}}> 
      
      <DataTable.Row style={{backgroundColor: "#e5191c", borderBottomWidth: 0}}> 
        <DataTable.Cell></DataTable.Cell> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 36, color: "white"}}>Hello!</Text></DataTable.Cell> 
        <DataTable.Cell></DataTable.Cell> 
      </DataTable.Row> 
  
      <DataTable.Row style={{backgroundColor: "#e5191c", borderBottomWidth: 0}}>   
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 20, opacity: 0.7, color: "white"}}>Please tell us about yourself</Text></DataTable.Cell> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "14.5%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{paddingTop: "7%", backgroundColor: "white", paddingBottom: "1%"}}> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 16, color: "#6c6c6c", textAlign: "center"}}>To estimate your blood alcohol level correctly we need some information.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderTopColor: "lightgrey", borderTopWidth: 0.5}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Name</Text></DataTable.Cell>
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
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Gender</Text></DataTable.Cell>
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
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>BAC units</Text></DataTable.Cell>
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
      open={open5}
      value={unit}
      items={items5}
      setOpen={setOpen5}
      setValue={setUnit}
      setItems={setItems5}
    /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Weight</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><TextInput
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setWeight(newText)}
        placeholder="kg"
        keyboardType="numeric"
      /></DataTable.Cell> 
      </DataTable.Row> 

        <View style={{flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "lightgrey", paddingBottom: "2%"}}>
          <Text style={{fontSize: 16, color: "#6c6c6c", marginLeft: "3.5%", marginTop: "2.1%"}}>Allowed level</Text>
          <DropDownPicker
          style={{
            minHeight: "1%",
            borderColor: "red",
            width: "26%",
            marginTop: "1.5%",
            marginLeft: "46%",
          }} 
          dropDownContainerStyle={{
            width: "110%"
          }}
          placeholder='Select'
          dropDownDirection="TOP"
          open={open2}
          value={limit}
          items={items2}
          setOpen={setOpen2}
          setValue={setLimit}
          setItems={setItems2}
        />
      </View>

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 
      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row>     

      </DataTable> 

      <View style={styles.parent}>
        <TouchableOpacity onPress={Home} style={{backgroundColor: "#f4f6f5", width:"50%"}}><Text style={{marginTop: "15%", marginLeft: "42%"}}>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={Save} style={{backgroundColor: "#81b458", width:"50%"}}><Text style={{color: "white", marginTop: "15%", marginLeft: "42%"}}>Save</Text></TouchableOpacity>
      </View>

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5191c"
  },
  parent: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "10%"
  },
});