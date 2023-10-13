import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function users(){
    const [memory, setMemory] = useState({
    "Name": {name},
    "Gender": {gender},
    "Weight": {weight},
  });
  
  localStorage.setItem("userData", JSON.stringify(memory));
  const data = localStorage.getItem("userData");
  console.log("data: ", JSON.parse(data));

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");

  function Save(){
    setMemory({
      "Name": {name},
      "Gender": {gender},
      "Weight": {weight},
    });
  }

  return(
    <View>
    <Text>Name</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setName(newText)}
      />
      <Text>Gender</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setGender(newText)}
      />
      <Text>Weight</Text>
      <TextInput
        style={{backgroundColor: "lightblue"}}
        onChangeText={newText => setWeight(newText)}
      />

      <TouchableOpacity><Text style={{backgroundColor: "lightgrey"}}>Cancel</Text></TouchableOpacity>
      <TouchableOpacity onPress={Save}><Text style={{backgroundColor: "green"}}>Save</Text></TouchableOpacity>
      </View>
  )
}