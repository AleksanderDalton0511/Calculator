import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
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
      console.log(memoGender.gender)
    }
    else{
      setGender(0.7);
    }
  }, [memoGender]);

  return (
    <View style={styles.container}>
      <Text>{LeftAlcohol.toFixed(4)}</Text>
      <Text>Sober after {PureHours|0} hours and {PureMins.toFixed(0)} minutes.</Text>
      <Text>Strongness:</Text>
      <TextInput
        style={{backgroundColor: "red"}}
        onChangeText={newText => setStrongness(newText)}
        value={Strongness.toString()}
        keyboardType="numeric"
      />
      <Text>Amount:</Text>
      <TextInput
        style={{backgroundColor: "blue"}}
        onChangeText={newText => setDrinkenMl(newText)}
        value={DrinkenMl.toString()}
        keyboardType="numeric"
      />
      <Text>Drinked ago:</Text>
      <TextInput
        style={{backgroundColor: "green"}}
        onChangeText={newText => setDrinkedAgo(newText)}
        value={DrinkedAgo.toString()}
        keyboardType="numeric"
      />

      <Text>Name:{memoName.name}</Text>
      <Text>Gender:{memoGender.gender}</Text>
      <Text>Weight:{memoWeight.weight}</Text>
      <Text>Gender coefficent:{Gender}</Text>

      <TouchableOpacity onPress={Selection} style={{backgroundColor: "orange"}}><Text>Users</Text></TouchableOpacity>
      <TouchableOpacity onPress={Backwards} style={{backgroundColor: "green"}}><Text>Backwards</Text></TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});