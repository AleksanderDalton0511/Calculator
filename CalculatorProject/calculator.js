import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Calculator() {

  const navigation = useNavigation();

  const number = localStorage.getItem("number");

  const data = localStorage.getItem("userData"+number);
  console.log("data: ", JSON.parse(data));
  const data2 = JSON.parse(data);
  console.log("test:"+data2.Name.name);

  const [DrinkedAgo, setDrinkedAgo] = useState(0);
  const MinusPerHour = 0.1;
  const losen = MinusPerHour*DrinkedAgo;
  
  const WeightOfPerson = data2.Weight.weight;
  const [Gender, setGender] = useState(0.7);

  const [DrinkenMl, setDrinkenMl] = useState(50);
  const [Strongness, setStrongness] = useState(40);
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

      <Text>Name:{data2.Name.name}</Text>
      <Text>Gender:{data2.Gender.gender}</Text>
      <Text>Weight:{data2.Weight.weight}</Text>

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