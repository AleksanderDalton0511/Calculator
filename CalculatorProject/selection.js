import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Selection(){
  const user = localStorage.getItem("userData");
  console.log("data: ", JSON.parse(user));
  const data = JSON.parse(user);

  const user2 = localStorage.getItem("userData2");
  console.log("data: ", JSON.parse(user2));
  const data2 = JSON.parse(user2);

  const user3 = localStorage.getItem("userData3");
  console.log("data: ", JSON.parse(user3));
  const data3 = JSON.parse(user3);

  const navigation = useNavigation();

  function Select1(){
    localStorage.setItem("number", "");
    navigation.navigate("Calculator");
  }
  function Select2(){
    localStorage.setItem("number", 2);
    navigation.navigate("Calculator");
  }
  function Select3(){
    localStorage.setItem("number", 3);
    navigation.navigate("Calculator");
  }

  function Edit3(){
    navigation.navigate("Users3");
  }

  return(
  <View>
  <Text>Select profile:</Text>
  <TouchableOpacity onPress={Select1}><Text>User1: {data.Name.name} </Text><TouchableOpacity style={{backgroundColor:"red"}}><Text>EDIT</Text></TouchableOpacity></TouchableOpacity>
  <TouchableOpacity onPress={Select2}><Text>User2: {data2.Name.name}</Text><TouchableOpacity style={{backgroundColor:"red"}}><Text>EDIT</Text></TouchableOpacity></TouchableOpacity>
  <TouchableOpacity onPress={Select3}><Text>User3: {data3.Name.name}</Text><TouchableOpacity onPress={Edit3} style={{backgroundColor:"red"}}><Text>EDIT</Text></TouchableOpacity></TouchableOpacity>
  </View>
  )
}