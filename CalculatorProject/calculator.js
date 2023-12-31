import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 

export default function Calculator(route) {

  const [update, setUpdate] = useState(1);

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
    }
  });

  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");
  const [limit, setLimit] = useState("");
  const [unit, setUnit] = useState("");

  const navigation = useNavigation();

  const isFocused = useIsFocused();

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
          setName(ret.Name.name);
          setMemoGender(ret.Gender);
          setLimit(ret.Limit.limit/0.1);
          setUnit(ret.Unit.unit);
        });
      
    }, [update]);

  const MinusPerHour = 0.1;  
  const WeightOfPerson = memoWeight.weight;
  const [Gender, setGender] = useState("");

  const [sumFin, setSumFin] = useState();

  useEffect(() => {
    storage
    .load({
      key: 'result1',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
        },
        someFlag: true
      }
    })
    .then(ret => {
      let oldResult = ret.Data.oldResult;

      const timeElapsed = Date.now() - oldResult[0].timeOfDrink;
      const finalTime = timeElapsed/3600000;

      ret.Data.oldResult[0].promille = ret.Data.oldResult[0].promille-finalTime * 0.1;

      let finaal = [];
      let result0= 0;
      for (let i = 0; i < ret.Data.oldResult.length; i++) {
        finaal.push(ret.Data.oldResult[i].promille);
      }
      for (let i = 0; i < finaal.length; i++) {
        result0 += finaal[i]
      }
      setSumFin(result0);

      if(oldResult[0].promille<0){
        oldResult.shift();
        storage.save({
          key: 'result1', // Note: Do not use underscore("_") in key!
          data: {
            Data: {oldResult}
          },
          expires: null
        });
      }

    });
  
}, [route, isFocused, update]);

  function Selection(){
    navigation.navigate("User");
  }

  function Backwards(){
    navigation.navigate("Backwards");
  }

  function Drinks(){
      navigation.navigate("EditDrinks");
  }

  useEffect(() => {
    if (memoGender.gender!="Male"){
      setGender(0.6);
    }
    else{
      setGender(0.7);
    }
  }, [memoGender]);

  if(sumFin==undefined || sumFin < 0){
    setSumFin(0);
  }

    setTimeout(() => {
        setUpdate((update+0.1/3600));
  }, 1000);

  let newNumber = Number(sumFin).toFixed(4)+"‰";

  let newNumber2 = Number(limit*0.1).toFixed(1)+"‰";

  if(unit=="American"){
    newNumber2 = Number(limit*0.01).toFixed(2)+"%";
  }

  if(unit=="American"){
    newNumber = Number(sumFin*0.1).toFixed(4)+"%";
  }

  let OutIn = sumFin/MinusPerHour - limit;
  let OutInMin = OutIn*60;
  let PureHours = OutInMin/60;
  let PureMins = OutInMin% 60;

  if(OutIn<0){
    PureHours=0;
    PureMins = 0;
  }

  let color = "#61a22d";

  if (OutIn>0){
    color = "red"
  }

  if(memoWeight.weight==undefined && update>1){
    navigation.navigate("User");
  }
    
  return(
    <SafeAreaView style={{flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${ color }`}}>

      <DataTable style={{marginTop: "13%"}}> 

      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell><TouchableOpacity onPress={Selection}><Image style={{width: 30, height: 30, marginLeft: "91%", marginTop: "25%"}} source={require("./assets/settings_icon.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row>
      
      <DataTable.Row style={{borderBottomWidth: 0, marginTop: "10%"}}> 
        <DataTable.Cell><TouchableOpacity style={{fontSize: 16, color: "white", borderWidth: 1, borderColor: "white", backgroundColor: "white", borderTopLeftRadius: 6, borderBottomLeftRadius: 6, color: "green", paddingBottom: "2.5%", paddingTop: "2.5%", width: "70%", marginLeft: "30%"}}><Text style={{marginLeft: "23%", color: `${ color }`}}>REAL TIME</Text></TouchableOpacity></DataTable.Cell> 
        <DataTable.Cell><TouchableOpacity onPress={Backwards} style={{fontSize: 16, color: "white", borderWidth: 1, borderColor: "white", borderTopRightRadius: 6, borderBottomRightRadius: 6, paddingBottom: "2.5%", paddingTop: "2.5%", width: "70%"}}><Text style={{marginLeft: "34%", color: "white"}}>PLAN</Text></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row>

      </DataTable> 

      <DataTable style={{paddingTop: "7%", backgroundColor: `${ color }`}}> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 44.5, color: "white"}}>{newNumber}</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 14, color: "white", marginBottom: "3%", opacity: 0.7}}>CURRENT LEVEL</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 18, color: "white", marginBottom: "6%"}}>Allowed level {newNumber2}</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`}}> 
      <DataTable.Cell><Text style={{color:"white", fontSize: 22, marginLeft: "6%"}}>DRIVE IN:           <Text style={{color: "#282828"}}>hrs: <Text style={{color: "white"}}>{PureHours|0}          <Text style={{color: "#282828"}}>min: <Text style={{color: "white"}}>{PureMins.toFixed(0)}</Text></Text></Text></Text></Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><TouchableOpacity onPress={Drinks} style={{borderWidth: 1, borderColor: "white", borderRadius: 50}}><Text style={{color: "white", fontSize: 22, paddingLeft: "10%", paddingRight: "10%", paddingTop: "2%", paddingBottom: "2%", opacity: 0.9}}>Add/Edit drinks</Text></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "8%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{backgroundColor: "white"}}>

      <DataTable.Row style={{backgroundColor: "#00a400", borderBottomWidth: 0, backgroundColor: "white"}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "black", fontSize: 26}}>{memoName}</Text><TouchableOpacity><Image style={{width: 20, height: 20, opacity: 0.5}} source={require("./assets/Edit33.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderColor: "pink", marginTop: "3%"}}> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#6c6c6c"}}>Gender</Text></DataTable.Cell> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{marginTop: "10%", color: "#6c6c6c"}}>Units</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#6c6c6c"}}>Weight</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderBottomWidth: 0}}> 
      <DataTable.Cell><Text style={{marginLeft: "30.2%", marginBottom: "15%", color: "#282828"}}>{memoGender.gender}</Text></DataTable.Cell> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{marginBottom: "15%", color: "#282828"}}>{unit}</Text></DataTable.Cell> 
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
  )
}