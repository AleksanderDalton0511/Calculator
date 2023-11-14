import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 

export default function Calculator() {

  const [finalHolder, setFinalHolder] = useState("");

  useEffect(() => {
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });

    storage
      .load({
        key: 'FinalResultBAC',
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
        console.log(ret);
        setFinalHolder(ret.TheResult.finalResult.toFixed(4))
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

  const [extraHelper, setExtraHelper] = useState("");

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
        setExtraHelper(ret.Num.drinkHelper);
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

  let drinkHelper = extraHelper;

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

  const [DrinkedAgo, setDrinkedAgo] = useState("");
  const MinusPerHour = 0.1;
  const losen = MinusPerHour*DrinkedAgo;
  
  const WeightOfPerson = memoWeight.weight;
  const [Gender, setGender] = useState("");

  const [DrinkenMl, setDrinkenMl] = useState("");
  const [Strongness, setStrongness] = useState("");
  const PureAlcohol = (DrinkenMl/100)*Strongness*0.789;
  
  const AlcoholInBlood = PureAlcohol / (WeightOfPerson*Gender);
  const LeftAlcohol = AlcoholInBlood-losen;

  const OutIn = finalHolder/MinusPerHour;
  const OutInMin = OutIn*60;
  const PureHours = OutInMin/60;
  const PureMins = OutInMin% 60;

  function Selection(){
    navigation.navigate("Selection");
  }

  function Backwards(){
    navigation.navigate("Backwards");
  }

  function Drinks(){
    drinkHelper++;

    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });

      storage.save({
        key: 'drinkNum', // Note: Do not use underscore("_") in key!
        data: {
          Num : {drinkHelper}
        },
        expires: null
      });

      navigation.navigate("Drinks");
  }

  useEffect(() => {
    if (memoGender.gender!="Male"){
      setGender(0.6);
    }
    else{
      setGender(0.7);
    }
  }, [memoGender]);

  useEffect(() => {
    const storage3 = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });

    // load
    storage3
      .load({
        key: 'drink',
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
        setDrinkedAgo(ret.Ago.ago);
        setDrinkenMl(ret.Amount.amount);
        setStrongness(ret.Content.content);
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

    if (finalHolder == 0 || finalHolder < 0){
      drinkHelper = 0;
    }

    /*setTimeout(() => {
      if (finalHolder>0){
        setFinalHolder(finalHolder-0.00005);
      }
  }, 1000);*/
    
  return(
    <SafeAreaView style={styles.container}>

      <DataTable style={{marginTop: "13%"}}> 

      <DataTable.Row style={{borderBottomWidth: 0}}> 
        <DataTable.Cell><TouchableOpacity onPress={Selection}><Image style={{width: 30, height: 30, marginLeft: "91%", marginTop: "25%"}} source={require("./assets/settings_icon.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row>
      
      <DataTable.Row style={{borderBottomWidth: 0, marginTop: "10%"}}> 
        <DataTable.Cell><TouchableOpacity style={{fontSize: 16, color: "white", borderWidth: 1, borderColor: "white", backgroundColor: "white", borderTopLeftRadius: 6, borderBottomLeftRadius: 6, color: "green", paddingBottom: "2.5%", paddingTop: "2.5%", width: "70%", marginLeft: "30%"}}><Text style={{marginLeft: "23%", color: "green"}}>REAL TIME</Text></TouchableOpacity></DataTable.Cell> 
        <DataTable.Cell><TouchableOpacity style={{fontSize: 16, color: "white", borderWidth: 1, borderColor: "white", borderTopRightRadius: 6, borderBottomRightRadius: 6, paddingBottom: "2.5%", paddingTop: "2.5%", width: "70%"}}><Text style={{marginLeft: "34%", color: "white"}}>PLAN</Text></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row>

      </DataTable> 

      <DataTable style={{paddingTop: "7%", backgroundColor: "#61a22d"}}> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text style={{fontSize: 44.5, color: "white", marginLeft: "25%"}}>{finalHolder}‰</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
      <DataTable.Cell><Text style={{fontSize: 14, color: "white", marginLeft: "35%", marginBottom: "3%", opacity: 0.7}}>CURRENT LEVEL</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
      <DataTable.Cell><Text style={{fontSize: 18, color: "white", marginLeft: "27.5%", marginBottom: "6%"}}>Allowed level 0.20‰</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#61a22d"}}> 
      <DataTable.Cell><Text style={{color:"white", fontSize: 22, marginLeft: "6%"}}>DRIVE IN:           <Text style={{color: "#282828"}}>hrs:<Text style={{color: "white"}}>{PureHours|0}          <Text style={{color: "#282828"}}>min: <Text style={{color: "white"}}>{PureMins.toFixed(0)}</Text></Text></Text></Text></Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
      <DataTable.Cell><TouchableOpacity onPress={Drinks} style={{borderWidth: 1, borderColor: "white", borderRadius: 50, marginLeft: "20%"}}><Text style={{color: "white", fontSize: 22, paddingLeft: "10%", paddingRight: "10%", paddingTop: "2%", paddingBottom: "2%", opacity: 0.9}}>Add/Edit drinks</Text></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#61a22d", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "8%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{backgroundColor: "white"}}>

      <DataTable.Row style={{backgroundColor: "#00a400", borderBottomWidth: 0, backgroundColor: "white"}}> 
      <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "black", fontSize: 26}}>{memoName.name} </Text><TouchableOpacity><Image style={{width: 20, height: 20, opacity: 0.5}} source={require("./assets/Edit33.png")}></Image></TouchableOpacity></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "#00a400", backgroundColor: "white", borderColor: "pink", marginTop: "3%"}}> 
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#61a22d"
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});