import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Calculator from "/calculator.js"; 
import users from "/users.js"; 
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
  const RealAlcoholInBlood= AlcoholInBlood-(AlcoholInBlood/100)*5;
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
  }, [Strongness, DrinkenMl, DrinkedAgo]);

  return (
    <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Calculator"
                    component={Calculator}
                />
                <Stack.Screen name="Users" component={users} />
            </Stack.Navigator>
        </NavigationContainer>
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