import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 
import DropDownPicker from 'react-native-dropdown-picker';

export default function Backwards() {

  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");
  const [limit, setLimit] = useState("");

  const navigation = useNavigation();

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
    }
  });

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
        setWeight(ret.Weight);
        setName(ret.Name);
        setMemoGender(ret.Gender);
        setLimit(ret.Limit.limit/0.1);
      });
    
  }, []);

  const [Strongness, setStrongness] = useState("");
  const WeightOfPerson = memoWeight.weight;
  const [gender, setGender] = useState("");
  const [hoursToDrive, setHoursToDrive] = useState("");

  useEffect(() => {
    if (memoGender.gender!="Male"){
      setGender(0.6);
    }
    else{
      setGender(0.7);
    }
  }, [memoGender]);

  // 0 - allowed level
  const AllowedAlcoholInblood = limit * 0.1 + 0.1 * hoursToDrive;
  const allowedToDrinkPureAlcohol = AllowedAlcoholInblood * WeightOfPerson * gender;
  const AllowedToDrinkMl = allowedToDrinkPureAlcohol * 100 / (Strongness * 0.789);

  function BackToCalc(){
    navigation.navigate("Calculator");
  }

  function Selection(){
    navigation.navigate("User");
  }

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: '0.0', value: '0.0'},
    {label: '0.5', value: '0.5'},
    {label: '1.0', value: '1.0'},
    {label: '1.5', value: '1.5'},
    {label: '2.0', value: '2.0'},
    {label: '2.5', value: '2.5'},
    {label: '3.0', value: '3.0'},
    {label: '3.5', value: '3.5'},
    {label: '4.0', value: '4.0'},
    {label: '4.5', value: '4.5'},
    {label: '5.0', value: '5.0'},
    {label: '5.5', value: '5.5'},
    {label: '6.0', value: '6.0'},
    {label: '6.5', value: '6.5'},
    {label: '7.0', value: '7.0'},
    {label: '7.5', value: '7.5'},
    {label: '8.0', value: '8.0'},
    {label: '8.5', value: '8.5'},
    {label: '9.0', value: '9.0'},
  ]);

  const newNumber = Number(AllowedToDrinkMl).toFixed(0);

  return (
    <SafeAreaView style={{flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#61a22d"}}>

      <DataTable style={{marginTop: "20%"}}> 

      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell><TouchableOpacity onPress={Selection}><Image style={{width: 30, height: 30, marginLeft: "91%"}} source={require("./assets/settings_icon.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row>
      
      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell><TouchableOpacity onPress={BackToCalc} style={{fontSize: 16, color: "white", borderWidth: 1, borderColor: "white", borderTopLeftRadius: 6, borderBottomLeftRadius: 6, paddingBottom: "2.5%", paddingTop: "2.5%", width: "70%", marginLeft: "30%"}}><Text style={{marginLeft: "23%", color: "white"}}>REAL TIME</Text></TouchableOpacity></DataTable.Cell> 
        <DataTable.Cell><TouchableOpacity style={{fontSize: 16, color: "green", borderWidth: 1, borderColor: "white", borderTopRightRadius: 6, borderBottomRightRadius: 6, backgroundColor: "white", paddingBottom: "2.5%", paddingTop: "2.5%", width: "70%"}}><Text style={{marginLeft: "34%", color: "green"}}>PLAN</Text></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row>

      </DataTable> 

      <DataTable style={{backgroundColor: "#61a22d", marginTop: "7.5%", paddingBottom: "20%"}}>  

      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "white", fontSize: 22}}>NEED TO DRIVE IN:</Text></DataTable.Cell> 
      </DataTable.Row>

      <View> 
      <DropDownPicker
        style={{
          minHeight: "1%",
          borderColor: "white",
          width: "100%",
          backgroundColor:"#61a22d"
        }} 
        dropDownContainerStyle={{
          width: "100%"
        }}
      placeholder='HRS'
      dropDownDirection="TOP"
      open={open}
      value={hoursToDrive}
      items={items}
      setOpen={setOpen}
      setValue={setHoursToDrive}
      setItems={setItems}
    />
      </View> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "white", fontSize: 22}}>CONTENT:</Text></DataTable.Cell>
      </DataTable.Row> 

      <TextInput
        style={{width: "100%", backgroundColor: "white"}}
        placeholder='CONTENT'
        onChangeText={newText => setStrongness(newText)}
        value={Strongness.toString()}
        keyboardType="numeric"
      />      

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 20, color: "white"}}>You can drink {newNumber}ml</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 18, color: "white"}}>Allowed level {limit*0.1}‰</Text></DataTable.Cell> 
      </DataTable.Row>

      </DataTable> 

      <Image style={{width: "100%", height: "8%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{backgroundColor: "white"}}>

      <DataTable.Row style={{backgroundColor: "#00a400", borderBottomWidth: 0, backgroundColor: "white"}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "black", fontSize: 26}}>name</Text><TouchableOpacity><Image style={{width: 20, height: 20, opacity: 0.5}} source={require("./assets/Edit33.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderColor: "pink"}}> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#6c6c6c"}}>Gender</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#6c6c6c"}}>Units</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#6c6c6c"}}>Weight</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderBottomWidth: 0}}> 
      <DataTable.Cell><Text style={{marginLeft: "30.2%", marginBottom: "15%", color: "#282828"}}>{memoGender.gender}</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginLeft: "36%", marginBottom: "15%", color: "#282828"}}>‰</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginLeft: "33%", marginBottom: "15%", color: "#282828"}}>{memoWeight.weight} kg</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      </DataTable>

      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#4CBB17"
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});