import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

export default function Backwards() {

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

  const [Strongness, setStrongness] = useState(40);
  const WeightOfPerson = memoWeight.weight;
  const [Gender, setGender] = useState(0.7);
  const [hoursToDrive, setHoursToDrive] = useState(5);

  // 0 - allowed level
  const AllowedAlcoholInblood = 0 + 0.1 * hoursToDrive;
  const allowedToDrinkPureAlcohol = AllowedAlcoholInblood * WeightOfPerson * Gender;
  const AllowedToDrinkMl = allowedToDrinkPureAlcohol * 100 / (Strongness * 0.789);

  function BackToCalc(){
    navigation.navigate("Calculator");
  }

  function Selection(){
    navigation.navigate("Selection");
  }

  return (
    <SafeAreaView style={styles.container}>

    <TouchableOpacity onPress={Selection} style={{backgroundColor: "#4CBB17", marginLeft: "80%", paddingBottom: "5%", marginTop: "15%"}}><Image style={{width: 30, height: 30}} source={require("./assets/settings_icon.png")}></Image></TouchableOpacity>

<   View style={styles.parent}>

    <TouchableOpacity onPress={BackToCalc} style={{backgroundColor: "#4CBB17", borderLeftWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: "white", borderTopLeftRadius: 8, borderBottomLeftRadius: 8, height: "15%", width: "30%"}}>
    <Text>REAL TIME</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:"white",borderRightWidth:2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: "white", borderTopRightRadius:8, borderBottomRightRadius:8, height: "15%", width: "30%"}}>
    <Text>PLAN</Text>
    </TouchableOpacity>

</View>

      <Text>Can drink {AllowedToDrinkMl.toFixed(0)} ml</Text>

      <Text>Strongness:</Text>
      <TextInput
        style={{backgroundColor: "red"}}
        onChangeText={newText => setStrongness(newText)}
        value={Strongness.toString()}
        keyboardType="numeric"
      />
      <Text>Driving after:</Text>
      <TextInput
        style={{backgroundColor: "grey"}}
        onChangeText={newText => setHoursToDrive(newText)}
        value={hoursToDrive.toString()}
        keyboardType="numeric"
      />
      
      <Text>Name:{memoName.name}</Text>
      <Text>Gender:{memoGender.gender}</Text>
      <Text>Weight:{memoWeight.weight}</Text>
      <Text>Gender coefficent:{Gender}</Text>

      <StatusBar style="auto" />
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