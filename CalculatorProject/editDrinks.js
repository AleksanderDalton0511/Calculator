import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Drinks(){

  const navigation = useNavigation();

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
    }
  });

  const [unit, setUnit] = useState("");

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
      
    }, []);

    let factor;

    if(unit=="American"){
      factor = 29.573;
    }
    else{
      factor = 1;
    }

  function AddNew(){
    navigation.navigate("Drinks");
}

  const[oldResult, setList] = useState();

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
      const th = Date.now()-ret.Data.oldResult[0].timeOfDrink;
      const OutIn = th / 3600000;
      const OutInMin = OutIn*60;
      const PureHours = OutInMin/60;
      const PureMins = OutInMin% 60;
      setList(ret.Data.oldResult.map(person => ({ promille: person.promille, timeOfDrink: person.timeOfDrink, content: person.content, amount: person.amount })));
    });
  
}, [factor]);

const [sliced, setSliced] = useState(0);

useEffect(() => {
  setSliced(sliced+1);
}, [oldResult]);

  if(sliced>1){
  storage.save({
    key: 'result1', // Note: Do not use underscore("_") in key!
    data: {
      Data: {oldResult}
    },
    expires: null
  });
}

  function GoHome(){
    navigation.navigate("Calculator");
  }

  let padding = "93.5";

  if(oldResult!=undefined){
    padding = padding - oldResult.length*15.5+"%";
  }
  else{
    padding = "93.5%";
  }

  let visualUnit;

  if(unit == "American"){
    visualUnit="oz";
  }
  else{
    visualUnit="ml";
  }

  return(
    <SafeAreaView style={styles.container}>

      <DataTable style={{marginTop: "8%"}}> 
      
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 36, color: "white"}}>Manage drinks</Text></DataTable.Cell> 
      </DataTable.Row> 
  
      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}>   
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 20, opacity: 0.7, color: "white"}}>Modify existing drinks</Text></DataTable.Cell> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "14.5%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{paddingTop: "7%", backgroundColor: "white"}}> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <Text style={{color: "red"}}>TAP TO DELETE</Text>
      </DataTable.Row> 

      <FlatList
         style={{paddingBottom: `${ padding }`}} 
         data={oldResult}
         renderItem={({item}) => <TouchableOpacity style={{backgroundColor: "white", borderColor: "lightgrey", borderWidth: 0.5}} onPress={() => setList(oldResult.slice(0, oldResult.indexOf(item)).concat(oldResult.slice(oldResult.indexOf(item)+1)))}><Text style={{paddingBottom: "2%", marginLeft: "3.5%", paddingTop: "2%"}}>{item.amount/factor}{visualUnit}, {item.content}%</Text><Text style={{paddingBottom: "2%", marginLeft: "3.5%", color: "#6c6c6c"}}>Created {(Date.now()-item.timeOfDrink)/3600000|0} hours and {(((Date.now()-item.timeOfDrink)/3600000*60)%60).toFixed(0)} minutes ago</Text></TouchableOpacity> }
         keyExtractor={(item) => item.timeOfDrink}
      />
      
      </DataTable> 

      <View style={styles.parent}>
        <TouchableOpacity onPress={GoHome} style={{backgroundColor: "#f4f6f5", width:"50%"}}><Text style={{marginTop: "15%", marginLeft: "42%"}}>Done</Text></TouchableOpacity>
        <TouchableOpacity onPress={AddNew} style={{backgroundColor: "#81b458", width:"50%"}}><Text style={{color: "white", marginTop: "15%", marginLeft: "26%"}}>Add new drink</Text></TouchableOpacity>
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