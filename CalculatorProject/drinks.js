import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, NativeModules  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Drinks(){
  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");

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

  const [amount, setAmount] = useState("");
  const [content, setContent] = useState("");
  const [ago, setAgo] = useState("");
  const PureAlcohol = (amount/100)*content*0.789;
  
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
    storage.save({
      key: 'result1', // Note: Do not use underscore("_") in key!
      data: {
        Data: {oldResult}
      },
      expires: null
    });
    if(AlcoholInBlood>0){
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
    {label: '5.0', value: '5.0'}
  ]);
  
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

      <DataTable style={{paddingTop: "7%", backgroundColor: "white"}}> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Alcohol content</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell>
      <TextInput
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setContent(newText)}
        placeholder="ml"
        keyboardType="numeric"
      /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Amount</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><TextInput
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setAmount(newText)}
        placeholder="ml"
        keyboardType="numeric"
      /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Time finished</Text></DataTable.Cell>
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
      placeholder='Hrs ago'
      dropDownDirection="TOP"
      open={open}
      value={ago}
      items={items}
      setOpen={setOpen}
      setValue={setAgo}
      setItems={setItems}
    /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
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