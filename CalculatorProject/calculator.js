import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

export default function Calculator() {

  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");
  const [number, setNumber] = useState("");

  const navigation = useNavigation();

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
  const [LeftAlcohol, setLeftAlcohol] = useState(AlcoholInBlood-losen);

  const OutIn = LeftAlcohol/MinusPerHour;
  const OutInMin = OutIn*60;
  const PureHours = OutInMin/60;
  const PureMins = OutInMin% 60;

  if(LeftAlcohol<0){
    setLeftAlcohol(0);
  }

  useEffect(() => {
    (async () => {
      setLeftAlcohol(AlcoholInBlood-losen);
    })();
  }, [Strongness, DrinkenMl, DrinkedAgo]);

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

  return (
    <SafeAreaView style={styles.container}>
    
      <TouchableOpacity onPress={Selection} style={{backgroundColor: "#00a400", marginLeft: "80%", paddingBottom: "5%", marginTop: "15%"}}><Image style={{width: 30, height: 30}} source={require("./assets/settings_icon.png")}></Image></TouchableOpacity>

      <View style={styles.parent}>

      <TouchableOpacity style={{backgroundColor: "white", borderLeftWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: "white", borderTopLeftRadius: 8, borderBottomLeftRadius: 8, width: "30%"}}>
      <Text style={{color: "#00a400"}}>REAL TIME</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={Backwards} style={{backgroundColor:"#00a400",borderRightWidth:2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: "white", borderTopRightRadius:8, borderBottomRightRadius:8, width: "30%"}}>
      <Text>PLAN</Text>
      </TouchableOpacity>

      </View>

      <Text style={{fontSize: 50, color: "white"}}>{LeftAlcohol.toFixed(4)}‰</Text>
      <Text style={{color: "lightgrey"}}>Current level</Text>
      <Text style={{color: "white", fontSize: 18}}>Allowed level 0.20‰</Text>
      <Text style={{color:"white", fontSize: 26, marginTop: "8%"}}>DRIVE IN: <Text style={{color: "black"}}>hrs:<Text style={{color: "white"}}>{PureHours|0} <Text style={{color: "black"}}>min: <Text style={{color: "white"}}>{PureMins.toFixed(0)}</Text></Text></Text></Text></Text>
      
      <TouchableOpacity style={{borderWidth: 1, borderColor: "white", borderRadius: 50, marginTop: "8%", marginBottom: "45%"}}><Text style={{color: "white", fontSize: 22, paddingLeft: "10%", paddingRight: "10%", paddingTop: "1%", paddingBottom: "1%"}}>Add/Edit drinks</Text></TouchableOpacity>

      <Text style={{fontSize: 24, paddingBottom: "5%"}}>{memoName.name}</Text>

      <View style={{flex: 1,
    flexDirection: "row",
    justifyContent: "space-around", borderBottomWidth: 1, borderColor: "lightgrey"}}>
      <Text style={{color: "lightgrey", marginRight: "50%"}}>Gender</Text>
      <Text style={{color: "lightgrey"}}>Weight</Text>
    </View>

    <View style={{flex: 1,
    flexDirection: "row",
    justifyContent: "space-around", marginBottom: "35%"}}>
      <Text style={{marginRight: "55%"}}>{memoGender.gender}</Text>
      <Text>{memoWeight.weight}kg</Text>
    </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#00a400"
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});