import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 

export default function Backwards() {

  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");
  const [limit, setLimit] = useState("");
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
        setName(ret.Name);
        setMemoGender(ret.Gender);
        setLimit(ret.Limit.limit/0.1);
        setUnit(ret.Unit.unit);
      });
    
  }, []);

  const [Strongness, setStrongness] = useState(15);
  const WeightOfPerson = memoWeight.weight;
  const [gender, setGender] = useState("");
  const [hoursToDrive, setHoursToDrive] = useState(2);

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

  let newNumber = Number(AllowedToDrinkMl).toFixed(0)+"ML";
  if(unit == "American"){
    newNumber = Number(AllowedToDrinkMl/29.573).toFixed(1)+"OZ";
  }

  let OutInMin = hoursToDrive*60;
  let PureHours = hoursToDrive|0;
  let PureMins = OutInMin% 60;

  let minus2= <TouchableOpacity style={{marginLeft: "7.5%", marginTop: "5%"}} onPress={() => setHoursToDrive(hoursToDrive-0.25)}><Image style={{width: 24, height: 24}} source={require("./assets/minus.png")}></Image></TouchableOpacity>

  if (hoursToDrive==0){
    minus2 = <Image style={{width: 24, height: 24, opacity: 0.5, marginLeft: "7.5%"}} source={require("./assets/minus.png")}></Image>
  }

  let minus3= <TouchableOpacity style={{marginLeft: "7.5%", marginTop: "5%"}} onPress={() => setStrongness(Strongness-1)}><Image style={{width: 24, height: 24}} source={require("./assets/minus.png")}></Image></TouchableOpacity>

  if (Strongness==0){
    minus3 = <Image style={{width: 24, height: 24, opacity: 0.5, marginLeft: "7.5%"}} source={require("./assets/minus.png")}></Image>
  }

  let newNumber5 = Number(memoWeight.weight).toFixed(0)+"kg";
  if(unit=="American"){
    newNumber5 = Number(memoWeight.weight*2.2).toFixed(0)+"lbs";
  }

  let newNumber2 = Number(limit*0.1).toFixed(1)+"‰";

  if(unit=="American"){
    newNumber2 = Number(limit*0.01).toFixed(2)+"%";
  }

  return (
    <SafeAreaView style={{flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#61a22d"}}>

      <DataTable style={{marginTop: "40%"}}> 

      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell><TouchableOpacity onPress={Selection}><Image style={{width: 30, height: 30, marginLeft: "91%"}} source={require("./assets/settings_icon.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row>
      
      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell><TouchableOpacity onPress={BackToCalc} style={{fontSize: 16, color: "white", borderWidth: 1, borderColor: "white", borderTopLeftRadius: 6, borderBottomLeftRadius: 6, paddingBottom: "2.5%", paddingTop: "2.5%", width: "70%", marginLeft: "30%"}}><Text style={{marginLeft: "23%", color: "white"}}>REAL TIME</Text></TouchableOpacity></DataTable.Cell> 
        <DataTable.Cell><TouchableOpacity style={{fontSize: 16, color: "green", borderWidth: 1, borderColor: "white", borderTopRightRadius: 6, borderBottomRightRadius: 6, backgroundColor: "white", paddingBottom: "2.5%", paddingTop: "2.5%", width: "70%"}}><Text style={{marginLeft: "34%", color: "green"}}>PLAN</Text></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row>

      </DataTable> 

      <DataTable style={{backgroundColor: "#61a22d", marginTop: "7.5%"}}>  

      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "white", fontSize: 22}}>NEED TO DRIVE IN:</Text></DataTable.Cell> 
      </DataTable.Row>

      <View style={{flexDirection: "row", height: "15%", borderRadius:55, borderColor: "white", borderWidth: 0.5}}>
        {minus2}
        <Text style={{color: "white", fontSize: 20, marginLeft: "30.5%", width: "20%", marginTop: "5%"}}>{PureHours}h, {PureMins}m</Text>
        <TouchableOpacity style={{marginLeft: "22.5%", marginTop: "5%"}} onPress={() => setHoursToDrive(hoursToDrive+0.25)}><Image style={{width: 24, height: 24}} source={require("./assets/plus.png")}></Image></TouchableOpacity>
      </View>

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "white", fontSize: 22}}>CONTENT:</Text></DataTable.Cell>
      </DataTable.Row> 

      <View style={{flexDirection: "row", height: "15%", borderRadius:55, borderColor: "white", borderWidth: 0.5}}>
        {minus3}
        <Text style={{color: "white", fontSize: 20, marginLeft: "30.5%", width: "20%", marginTop: "5%"}}>{Strongness}%</Text>
        <TouchableOpacity style={{marginLeft: "22.5%", marginTop: "5%"}} onPress={() => setStrongness(Strongness+1)}><Image style={{width: 24, height: 24}} source={require("./assets/plus.png")}></Image></TouchableOpacity>
      </View>    

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0, borderTopWidth:0.5, borderColor: "white", borderTopLeftRadius:35, borderTopRightRadius: 35, marginTop: "10%", borderLeftWidth: 0.5, borderRightWidth: 0.5}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 20, color: "lightgrey"}}>YOU CAN DRINK {newNumber}</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderColor: "white", borderBottomLeftRadius:35, borderBottomRightRadius: 35, borderBottomWidth:0.5, borderLeftWidth: 0.5, borderRightWidth: 0.5}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 18, color: "white"}}>Allowed level {newNumber2}</Text></DataTable.Cell> 
      </DataTable.Row>

      </DataTable> 

      <Image style={{width: "100%", height: "8%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{backgroundColor: "white"}}>

      <DataTable.Row style={{backgroundColor: "#00a400", borderBottomWidth: 0, backgroundColor: "white"}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "black", fontSize: 26}}>{memoName.name}</Text><TouchableOpacity><Image style={{width: 20, height: 20, opacity: 0.5}} source={require("./assets/Edit33.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderColor: "pink"}}> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#6c6c6c"}}>Gender</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#6c6c6c"}}>Units</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#6c6c6c"}}>Weight</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderBottomWidth: 0}}> 
      <DataTable.Cell><Text style={{marginLeft: "30.2%", marginBottom: "15%", color: "#282828"}}>{memoGender.gender}</Text></DataTable.Cell> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{marginBottom: "15%", color: "#282828"}}>{unit}</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginLeft: "33%", marginBottom: "15%", color: "#282828"}}>{newNumber5}</Text></DataTable.Cell> 
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