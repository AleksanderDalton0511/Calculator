import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native';
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
      setList(ret.Data.oldResult.map(person => ({ promille: person.promille, timeOfDrink: person.timeOfDrink })));
    });
  
}, []);

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


console.log(sliced);

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
        <Text>Active drinks</Text>
      </DataTable.Row> 

      <FlatList
         style={{marginLeft: "10%"}} 
         data={oldResult}
         renderItem={({item}) => <TouchableOpacity style={{backgroundColor: "red"}} onPress={() => setList(oldResult.slice(0, oldResult.indexOf(item)).concat(oldResult.slice(oldResult.indexOf(item)+1)))}><Text>{item.promille}</Text></TouchableOpacity> }
         keyExtractor={(item) => item.timeOfDrink}
      />

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
      </DataTable.Row> 

      </DataTable> 

      <View style={styles.parent}>
        <TouchableOpacity style={{backgroundColor: "#f4f6f5", width:"50%"}}><Text style={{marginTop: "15%", marginLeft: "42%"}}>Done</Text></TouchableOpacity>
        <TouchableOpacity onPress={AddNew} style={{backgroundColor: "#81b458", width:"50%"}}><Text style={{color: "white", marginTop: "15%", marginLeft: "42%"}}>Add new drinks</Text></TouchableOpacity>
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