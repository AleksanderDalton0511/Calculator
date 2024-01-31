import { Text, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
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
  const [memoWeight, setWeight] = useState();
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
          if (ret.Unit.unit=="American"){
            setWeight(ret.Weight.weight*2.2)
          }
          else{
            setWeight(ret.Weight.weight);
          }
          setName(ret.Name.name);
          setMemoGender(ret.Gender);
          setLimit(ret.Limit.limit/0.1);
          setUnit(ret.Unit.unit);
        })

        .catch(err => {
          switch (err.name) {
            case 'NotFoundError':
              break;
            case 'ExpiredError':
              break;
          }
        });
      
    }, [update]);

  const MinusPerHour = 0.1;  

  const [sumFin, setSumFin] = useState();

  useEffect(() => {
    setSumFin(0);
  }, [route, isFocused]);

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

      let toTop = Date.now();

      if(oldResult[0].toTop==undefined){
        oldResult[0].toTop = toTop;
        storage.save({
          key: 'result1', // Note: Do not use underscore("_") in key!
          data: {
            Data: {oldResult}
          },
          expires: null
        });
      }

      for(let i=1; i<oldResult.length; i++){
        if(oldResult[i].toTop==undefined && oldResult[i]!=undefined){
          oldResult[i].toTop = oldResult[i-1].toTop + (oldResult[i-1].promille/MinusPerHour)*3600000;
        }
      }

      const timeElapsed = Date.now() - oldResult[0].toTop;
      const finalTime = timeElapsed/3600000;

      oldResult[0].promille = oldResult[0].promille-finalTime * 0.1;

      let finaal = [];
      let result0= 0;
      for (let i = 0; i < oldResult.length; i++) {
        finaal.push(oldResult[i].promille);
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

    })

    .catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          break;
        case 'ExpiredError':
          break;
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
      if(sumFin>0){
        navigation.navigate("EditDrinks");
      }
      else{
        navigation.navigate("Drinks");
      }
  }

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
    color = "#e5191c"
  }

  if(memoWeight==undefined && update>1){
    navigation.navigate("User");
  }

  let newNumber3 = Number(memoWeight).toFixed(0)+"kg";
  if(unit=="American"){
    newNumber3 = Number(memoWeight).toFixed(0)+"lbs";
  }
    
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;

  return(
    <SafeAreaView style={{flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${ color }`}}>

      <DataTable style={{marginTop: "8%"}}>

      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell><TouchableOpacity style={{width: "5%", marginLeft: "85%", marginTop: "20%"}} onPress={Selection}><Image style={{width: imageWidth/13, height: imageHeight/7, marginLeft: "91%", marginTop: "25%"}} source={require("./assets/settings_icon.png")}></Image></TouchableOpacity></DataTable.Cell> 
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
      <DataTable.Cell><Text style={{color:"white", fontSize: 22, marginLeft: "6%"}}>DRIVE IN:        <Text style={{color: "#282828"}}>hrs: <Text style={{color: "white"}}>{PureHours|0}        <Text style={{color: "#282828"}}>min: <Text style={{color: "white"}}>{PureMins.toFixed(0)}</Text></Text></Text></Text></Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><TouchableOpacity onPress={Drinks} style={{borderWidth: 1, borderColor: "white", borderRadius: 50}}><Text style={{color: "white", fontSize: 22, paddingLeft: "10%", paddingRight: "10%", paddingTop: "2%", paddingBottom: "2%", opacity: 0.9}}>Add/Edit drinks</Text></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: `${ color }`, borderBottomWidth: 0}}> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "8%", marginTop: "8%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{backgroundColor: "white"}}>

      <DataTable.Row style={{backgroundColor: "#00a400", borderBottomWidth: 0, backgroundColor: "white"}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "black", fontSize: 26}}>{memoName} </Text><TouchableOpacity onPress={Selection}><Image style={{width: imageWidth/18, height: imageHeight/10, opacity: 0.3}} source={require("./assets/Edit33.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderColor: "pink", marginTop: "3%", marginRight: "4.5%"}}> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#a7a7a7"}}>Gender</Text></DataTable.Cell> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{marginTop: "10%", color: "#a7a7a7"}}>Units</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginTop: "10%", marginLeft: "30%", color: "#a7a7a7"}}>Weight</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderBottomWidth: 0, marginRight: "4.5%"}}> 
      <DataTable.Cell><Text style={{marginLeft: "30.2%", marginBottom: "15%", color: "#282828"}}>{memoGender.gender}</Text></DataTable.Cell> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{marginBottom: "15%", color: "#282828"}}>{unit}</Text></DataTable.Cell> 
      <DataTable.Cell><Text style={{marginLeft: "30.2%", marginBottom: "15%", color: "#282828"}}>{newNumber3}</Text></DataTable.Cell> 
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