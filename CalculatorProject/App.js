import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [DrinkedAgo, setDrinkedAgo] = useState(5);
  const MinusPerHour = 0.1;
  const losen = MinusPerHour*DrinkedAgo;
  
  const [WeightOfPerson, setWeightOfPerson] = useState(75);
  const [Gender, setGender] = useState(0.7);

  const [DrinkenMl, setDrinkenMl] = useState(50);
  const [Strongness, setStrongness] = useState(40);
  const [PureAlcohol, setPureAlcohol] = useState(((DrinkenMl/100)*Strongness));
  
  const [AlcoholInBlood, setAlcoholInBlood] = useState(PureAlcohol/(WeightOfPerson*Gender));
  const [RealAlcoholInBlood, setRealAlcoholInBlood] = useState(AlcoholInBlood-(AlcoholInBlood/100)*6);
  const [LeftAlcohol, setLeftAlcohol] = useState(RealAlcoholInBlood-losen);

  if(LeftAlcohol<0){
    setLeftAlcohol(0);
  }
  return (
    <View style={styles.container}>
      <Text>{LeftAlcohol.toFixed(1)}</Text>
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