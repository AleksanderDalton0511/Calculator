import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Drinks(){
  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");
  const [number, setNumber] = useState("");

  const navigation = useNavigation();

  if (number == 3 && memoName == ""){
    setNumber(2);
  }
  else if (number == 2 && memoName == ""){
    setNumber("");
  }

  const storage2 = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
    }
  });

  useEffect(() => {
    // load
  storage2
  .load({
    key: 'number',
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
    setNumber(ret);
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
          key: 'user'+number,
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
      
    }, [number]);

    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });

    const [index, setIndex] = useState();

    useEffect(() => {
      storage
        .load({
          key: 'drinkNum',
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
          setIndex(ret.Num.drinkHelper);
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

    function SaveResult(){
      console.log('result'+index);
      storage.save({
        key: 'result'+index, // Note: Do not use underscore("_") in key!
        data: {
          alcInBlood : {LeftAlcohol}
        },
        expires: null
      });
    }

  const [ago, setAgo] = useState("");
  const MinusPerHour = 0.1;
  const losen = MinusPerHour*ago;
  
  const WeightOfPerson = memoWeight.weight;
  const [Gender, setGender] = useState("");

  const [amount, setAmount] = useState("");
  const [content, setContent] = useState("");
  const PureAlcohol = (amount/100)*content*0.789;
  
  const AlcoholInBlood = PureAlcohol / (WeightOfPerson*Gender);
  const LeftAlcohol = AlcoholInBlood-losen;

  const OutIn = LeftAlcohol/MinusPerHour;
  const OutInMin = OutIn*60;
  const PureHours = OutInMin/60;
  const PureMins = OutInMin% 60;

  function Selection(){
    navigation.navigate("Selection");
  }

  function Backwards(){
    navigation.navigate("Backwards");
  }

  useEffect(() => {
    if (memoGender.gender!="Male"){
      setGender(0.6);
    }
    else{
      setGender(0.7);
    }
  }, [memoGender]);

  return(
    <SafeAreaView style={styles.container}>

      <DataTable style={{marginTop: "8%"}}> 
      
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 36, color: "white"}}>{LeftAlcohol.toFixed(4)}‰</Text></DataTable.Cell> 
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
        <DataTable.Cell><TextInput
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setAgo(newText)}
        placeholder="hrs"
        keyboardType="numeric"
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