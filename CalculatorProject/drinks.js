import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, NativeModules  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Drinks(){
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");
  const [unit, setUnit] = useState("");

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
          setUnit(ret.Unit.unit)
          setMemoGender(ret.Gender)
        })
        .catch(err => {
          switch (err.name) {
            case 'NotFoundError':
              break;
            case 'ExpiredError':
              break;
          }
        });
      
    }, []);

  const WeightOfPerson = memoWeight.weight;
  const [Gender, setGender] = useState("");

  const [amount, setAmount] = useState(0);
  const [content, setContent] = useState(15);
  const [ago, setAgo] = useState(0);
  const PureAlcohol = (amount/100)*content*0.789;

  let OutInMin = ago*60;
  let PureHours = ago|0;
  let PureMins = OutInMin% 60;
  
  const AlcoholInBlood = PureAlcohol / (WeightOfPerson*Gender) - 0.1*ago;

  useEffect(() => {
    if (memoGender.gender!="Male"){
      setGender(0.6);
    }
    else{
      setGender(0.7);
    }
  }, [memoGender]);

  let oldResult = [];

  let newResult = {
    "promille": AlcoholInBlood,
    "timeOfDrink": Date.now(),
    "amount": amount,
    "content": content
  }

  const [noFile, setNoFile] = useState(true);

  useEffect(() => {
    storage
    .load({
      key: 'result1',
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

      if(ret.Data.oldResult.length!=0){
        oldResult = ret.Data.oldResult;
      }

      oldResult.push(newResult);
      
    });
  
}, [newResult]);

if(noFile && amount!="" && content!= ""){
  storage.save({
    key: 'result1', // Note: Do not use underscore("_") in key!
    data: {
      Data: {oldResult}
    },
    // if expires not specified, the defaultExpires will be applied instead.
    // if set to null, then it will never expire.
    expires: null
  });
}

  const[text, setText] = useState(<Text style={{fontSize: 20, opacity: 0.7, color: "white"}}>Please enter data about your drink</Text>);

  function SaveResult(){

    if(amount == 0 || content == 0){
    }

    else{
    if(AlcoholInBlood>0){
      storage.save({
        key: 'result1', // Note: Do not use underscore("_") in key!
        data: {
          Data: {oldResult}
        },
        expires: null
      });
      navigation.navigate("Calculator");
    }
    else{
      setText(<Text style={{fontSize: 20, opacity: 0.7, color: "red"}}>This drink has already gone</Text>);
    }

    }

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

  function GoBack(){
    navigation.navigate("EditDrinks");
  }

  let input1 = <TextInput
  style={{fontWeight: "bold", width: "100%", fontSize: 20}}
  onChangeText={newText => setAmount(newText)}
  placeholder="ml"
  keyboardType="numeric"
/>

  if (unit=="American"){
    input1 = <TextInput
  style={{fontWeight: "bold", width: "100%", fontSize: 20}}
  onChangeText={newText => setAmount(newText*29,573)}
  placeholder="oz"
  keyboardType="numeric"
/>
  }

  let minus = <TouchableOpacity onPress={() => setContent(content-1)}><Image style={{width: 24, height: 24}} source={require("./assets/minus.png")}></Image></TouchableOpacity>
  
  if (content==0){
    minus = <Image style={{width: 24, height: 24, opacity: 0.5}} source={require("./assets/minus.png")}></Image>
  }

  let minus2= <TouchableOpacity style={{marginLeft: "7.5%"}} onPress={() => setAgo(ago-0.25)}><Image style={{width: 24, height: 24}} source={require("./assets/minus.png")}></Image></TouchableOpacity>

  if (ago==0){
    minus2 = <Image style={{width: 24, height: 24, opacity: 0.5, marginLeft: "7.5%"}} source={require("./assets/minus.png")}></Image>
  }

  return(
    <SafeAreaView style={styles.container}>

      <DataTable style={{marginTop: "8%"}}> 
      
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 36, color: "white"}}>{AlcoholInBlood.toFixed(4)}‰</Text></DataTable.Cell> 
      </DataTable.Row> 
  
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}>   
        <DataTable.Cell style={{justifyContent: "center"}}>{text}</DataTable.Cell> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "14.5%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{paddingTop: "7%", backgroundColor: "white", paddingBottom: "22.5%"}}> 

      <DataTable.Row style={{borderColor: "white"}}> 
        <DataTable.Cell style={{justifyContent: "left"}}><Text style={{fontSize: 18, color: "grey"}}>CONTENT</Text></DataTable.Cell>
      </DataTable.Row> 

      <DataTable.Row style={{borderColor: "white"}}> 
        <DataTable.Cell style={{justifyContent: "center"}}>{minus}</DataTable.Cell>
        <DataTable.Cell style={{justifyContent: "center"}}><TouchableOpacity style={{backgroundColor: "lightgrey", padding: "15%"}} onPress={() => setContent(5)}><Text>5%</Text></TouchableOpacity></DataTable.Cell>
        <DataTable.Cell style={{justifyContent: "center"}}><TouchableOpacity style={{backgroundColor: "lightgrey", padding: "15%"}} onPress={() => setContent(10)}><Text>10%</Text></TouchableOpacity></DataTable.Cell>
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "red", fontSize: 20}}>{content}%</Text></DataTable.Cell>
        <DataTable.Cell style={{justifyContent: "center"}}><TouchableOpacity style={{backgroundColor: "lightgrey", padding: "15%"}} onPress={() => setContent(20)}><Text>20%</Text></TouchableOpacity></DataTable.Cell>
        <DataTable.Cell style={{justifyContent: "center"}}><TouchableOpacity style={{backgroundColor: "lightgrey", padding: "15%"}} onPress={() => setContent(40)}><Text>40%</Text></TouchableOpacity></DataTable.Cell>
        <DataTable.Cell style={{justifyContent: "center"}}><TouchableOpacity onPress={() => setContent(content+1)}><Image style={{width: 24, height: 24}} source={require("./assets/plus.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{borderColor: "white"}}> 
        <DataTable.Cell style={{justifyContent: "left"}}><Text style={{fontSize: 18, color: "grey"}}>AMOUNT</Text></DataTable.Cell>
      </DataTable.Row> 

      <DataTable.Row style={{borderColor: "white"}}> 
        <DataTable.Cell style={{borderColor: "lightgrey", justifyContent: "center", borderWidth: 0.5}}>{input1}</DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{borderColor: "white"}}> 
        <DataTable.Cell style={{justifyContent: "left"}}><Text style={{fontSize: 18, color: "grey"}}>DRINKED AGO</Text></DataTable.Cell>
      </DataTable.Row> 

      <View style={{flexDirection: "row", height: "15%"}}>
        {minus2}
        <Text style={{color: "red", fontSize: 20, marginLeft: "30%", width: "20%"}}>{PureHours}h, {PureMins}m</Text>
        <TouchableOpacity style={{marginLeft: "22.5%"}} onPress={() => setAgo(ago+0.25)}><Image style={{width: 24, height: 24}} source={require("./assets/plus.png")}></Image></TouchableOpacity>
      </View>

      </DataTable> 

      <View style={styles.parent}>
        <TouchableOpacity onPress={GoBack} style={{backgroundColor: "#f4f6f5", width:"50%"}}><Text style={{marginTop: "15%", marginLeft: "42%"}}>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={SaveResult} style={{backgroundColor: "#81b458", width:"50%"}}><Text style={{color: "white", marginTop: "15%", marginLeft: "42%"}}>Save</Text></TouchableOpacity>
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