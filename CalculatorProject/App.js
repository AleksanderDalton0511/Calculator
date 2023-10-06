import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [DrinkedAgo, setDrinkedAgo] = useState(0);
  const MinusPerHour = 0.1;
  const losen = MinusPerHour*DrinkedAgo;
  
  const [WeightOfPerson, setWeightOfPerson] = useState(75);
  const [Gender, setGender] = useState(0.7);

  const [DrinkenMl, setDrinkenMl] = useState(50);
  const [Strongness, setStrongness] = useState(40);
  const PureAlcohol = (DrinkenMl/100)*Strongness;
  
  const AlcoholInBlood = PureAlcohol / (WeightOfPerson*Gender);
  const RealAlcoholInBlood= AlcoholInBlood-(AlcoholInBlood/100)*6;
  const [LeftAlcohol, setLeftAlcohol] = useState(RealAlcoholInBlood-losen);

  const OutIn = LeftAlcohol/MinusPerHour;
  const OutInMin = OutIn*60;
  const PureHours = OutInMin/60;
  const PureMins = OutInMin% 60;

  if(LeftAlcohol<0){
    setLeftAlcohol(0);
  }

  useEffect(() => {
    (async () => {
      setLeftAlcohol(RealAlcoholInBlood-losen);
    })();
  }, [Strongness]);

  return (
    <View style={styles.container}>
      <Text>{LeftAlcohol.toFixed(4)}</Text>
      <Text>Sober after {PureHours|0} hours and {PureMins.toFixed(0)} minutes</Text>

      <TextInput
        onChangeText={newText => setStrongness(newText)}
        value={Strongness}
      />

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