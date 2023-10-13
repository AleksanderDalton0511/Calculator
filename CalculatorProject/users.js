import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function users(){
    const [memory, setMemory] = useState({
    "Name": "",
    "Gender": "",
    "Weight": "",

  });
  localStorage.setItem("userData", JSON.stringify(memory));
  const data = localStorage.getItem("userData");
  console.log("data: ", JSON.parse(data));
  return(
    <View>
    <Text>Name</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setMemory(
        {"name": {newText},
        "email": "stets",
        "password": "iy@test"})}
      />
      <Text>Gender</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setMemory(
        {"name": {newText},
        "email": "stets",
        "password": "iy@test"})}
      />
      <Text>Weight</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setMemory(
        {"name": {newText},
        "email": "stets",
        "password": "iy@test"})}
      />

      <TouchableOpacity><Text style={{backgroundColor: "lightgrey"}}>Cancel</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{backgroundColor: "green"}}>Save</Text></TouchableOpacity>
      </View>
  )
}