import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function users(){
    const [memory, setMemory] = useState({
    "username": "test2",
    "email": "stets",
    "password": "iy@test"
  });
  localStorage.setItem("userData", JSON.stringify(memory));
  const data = localStorage.getItem("userData");
  console.log("data: ", JSON.parse(data));
  return(
    <View>
    <Text>user2:</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setMemory(
        {"username": {newText},
        "email": "stets",
        "password": "iy@test"})}
      />
      </View>
  )
}