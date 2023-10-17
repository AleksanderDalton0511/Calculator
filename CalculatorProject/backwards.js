import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function backwards() {

  const navigation = useNavigation();

  const number = localStorage.getItem("number");

  const data = localStorage.getItem("userData"+number);
  console.log("data: ", JSON.parse(data));
  const data2 = JSON.parse(data);
  console.log("test:"+data2.Name.name);

  const [Strongness, setStrongness] = useState(40);
  const WeightOfPerson = data2.Weight.weight;
  const [Gender, setGender] = useState(0.7);
  const [hoursToDrive, setHoursToDrive] = useState(5);

  // 0 - allowed level
  const AllowedAlcoholInblood = 0 + 0.1 * hoursToDrive;
  const allowedToDrinkPureAlcohol = AllowedAlcoholInblood * WeightOfPerson * Gender;
  const AllowedToDrinkMl = allowedToDrinkPureAlcohol * 100 / (Strongness * 0.789);

  return (
    <View style={styles.container}>

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
      
      <Text>Name:{data2.Name.name}</Text>
      <Text>Gender:{data2.Gender.gender}</Text>
      <Text>Weight:{data2.Weight.weight}</Text>

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