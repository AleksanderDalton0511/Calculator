import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function selection(){
  const user = localStorage.getItem("userData");
  console.log("data: ", JSON.parse(user));
  const data = JSON.parse(user);

  const user2 = localStorage.getItem("userData2");
  console.log("data: ", JSON.parse(user2));
  const data2 = JSON.parse(user2);

  const user3 = localStorage.getItem("userData3");
  console.log("data: ", JSON.parse(user3));
  const data3 = JSON.parse(user3);
  return(
  <View>
  <Text>Select profile:</Text>
  <Text>{data.Name.name}</Text>
  <Text>{data2.Name.name}</Text>
  <Text>{data3.Name.name}</Text>
  </View>
  )
}