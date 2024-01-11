import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function User(){
  const navigation = useNavigation();
  
  const storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,
   
    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage
   
    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,
   
    // cache data in the memory. default is true.
    enableCache: true,
   
    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      // we'll talk about the details later.
    }
  });

  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("");
  const [limit, setLimit] = useState(0);
  const [unit, setUnit] = useState("European");

  const [noFile, setNoFile] = useState(true);

  useEffect(() => {
    storage
      .load({
        key: 'user1',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true
        }
      })
      .then(ret => {
        setNoFile(false);
        setWeight(ret.Weight.weight);
        setGender(ret.Gender.gender);
        setLimit(ret.Limit.limit);
        setName(ret.Name.name);
        setUnit(ret.Unit.unit);
      });
    
  }, []);

  if(noFile && weight!="" && gender!= ""){
    storage.save({
      key: 'user1', // Note: Do not use underscore("_") in key!
      data: {
        Name: {name},
        Gender: {gender},
        Weight: {weight},
        Limit : {limit},
        Unit: {unit}
      },
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
  }

  let warning = <Text style={{fontSize: 16, color: "#6c6c6c", textAlign: "center"}}>To estimate your blood alcohol level correctly we need some information.</Text>
  if (weight.indexOf('-') > -1 || weight.indexOf('.') > -1){
    warning = <Text style={{fontSize: 16, color: "red", textAlign: "center"}}>Weight must be a whole number!</Text>
  }

  function Save(){
  if (weight.indexOf('-') > -1 || weight.indexOf('.') > -1){
    warning = <Text style={{fontSize: 16, color: "red", textAlign: "center"}}>Weight must be a whole number!</Text>
  }
  else{

    storage.save({
      key: 'user1', // Note: Do not use underscore("_") in key!
      data: {
        Name: {name},
        Gender: {gender},
        Weight: {weight},
        Limit : {limit},
        Unit: {unit}
      },
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
    navigation.navigate("Calculator");

  }
  }

  function Home(){
    navigation.navigate("Calculator");
  }

let weightSetter = <TextInput
style={{fontWeight: "bold", width: "100%", fontSize: 16}}
onChangeText={newText => setWeight(newText)}
placeholder="kg"
keyboardType="numeric"
/>

if(unit=="American"){
  weightSetter = <TextInput
  style={{fontWeight: "bold", width: "100%", fontSize: 16}}
  onChangeText={newText => setWeight(newText/2.2)}
  placeholder="lbs"
  keyboardType="numeric"
  />
}

let genderChoice = <View style={{flexDirection: "row", justifyContent: "space-around", paddingBottom: "2%", paddingTop: "2.5%"}}>
<Text style={{marginLeft: "9.1%", fontSize: 16, color: "#6c6c6c", marginTop: "0.5%"}}>Gender</Text>
<TouchableOpacity onPress={()=>setGender("Male")} style={{backgroundColor: "#e5191c", marginLeft: "55%", paddingLeft: "5%", paddingRight: "15%",paddingBottom: "1%", paddingTop: "1%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}><Text style={{color: "white"}}>Male</Text></TouchableOpacity><TouchableOpacity onPress={()=>setGender("Female")} style={{backgroundColor: "white", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "1%", paddingTop: "1%", borderTopRightRadius: 10, borderBottomRightRadius: 10, marginRight: "7%", borderColor: "#e5191c", borderWidth: 1}}><Text style={{color: "#e5191c"}}>Female</Text></TouchableOpacity>
</View>

if(gender=="Female"){
  genderChoice = <View style={{flexDirection: "row", justifyContent: "space-around", paddingBottom: "2%", paddingTop: "2.5%"}}>
<Text style={{marginLeft: "9.1%", fontSize: 16, color: "#6c6c6c", marginTop: "0.5%"}}>Gender</Text>
<TouchableOpacity onPress={()=>setGender("Male")} style={{backgroundColor: "white", marginLeft: "55%", paddingLeft: "5%", paddingRight: "15%", paddingBottom: "1%", paddingTop: "1%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderColor: "#e5191c", borderWidth: 1}}><Text style={{color: "#e5191c"}}>Male</Text></TouchableOpacity><TouchableOpacity onPress={()=>setGender("Female")} style={{backgroundColor: "#e5191c", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "1%", paddingTop: "1%", borderTopRightRadius: 10, borderBottomRightRadius: 10, marginRight: "7%", borderColor: "#e5191c", borderWidth: 1}}><Text style={{color: "white"}}>Female</Text></TouchableOpacity>
</View>
}

let unitChoice = <View style={{flexDirection: "row", justifyContent: "space-around", paddingBottom: "2%", paddingTop: "2.5%", borderWidth: 0.5, borderColor: "lightgrey"}}>
<Text style={{marginLeft: "15%", fontSize: 16, color: "#6c6c6c", marginTop: "0.5%"}}>BAC units</Text>
<TouchableOpacity onPress={()=>setUnit("European")} style={{backgroundColor: "#e5191c", marginLeft: "55%", paddingLeft: "5%", paddingRight: "25%",paddingBottom: "1%", paddingTop: "1%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}><Text style={{color: "white"}}>European</Text></TouchableOpacity><TouchableOpacity onPress={()=>setUnit("American")} style={{backgroundColor: "white", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "1%", paddingTop: "1%", borderTopRightRadius: 10, borderBottomRightRadius: 10, marginRight: "13%", borderColor: "#e5191c", borderWidth: 1}}><Text style={{color: "#e5191c"}}>American</Text></TouchableOpacity>
</View>

if(unit=="American"){
  unitChoice = <View style={{flexDirection: "row", justifyContent: "space-around", paddingBottom: "2%", paddingTop: "2.5%", borderWidth: 0.5, borderColor: "lightgrey"}}>
<Text style={{marginLeft: "15%", fontSize: 16, color: "#6c6c6c", marginTop: "0.5%"}}>BAC units</Text>
<TouchableOpacity onPress={()=>setUnit("European")} style={{backgroundColor: "white", marginLeft: "55%", paddingLeft: "5%", paddingRight: "25%", paddingBottom: "1%", paddingTop: "1%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderColor: "#e5191c", borderWidth: 1}}><Text style={{color: "#e5191c"}}>European</Text></TouchableOpacity><TouchableOpacity onPress={()=>setUnit("American")} style={{backgroundColor: "#e5191c", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "1%", paddingTop: "1%", borderTopRightRadius: 10, borderBottomRightRadius: 10, marginRight: "13%", borderColor: "#e5191c", borderWidth: 1}}><Text style={{color: "white"}}>American</Text></TouchableOpacity>
</View>
}

  let minus = <TouchableOpacity onPress={() => setLimit(limit-0.1)}><Image style={{width: 24, height: 24}} source={require("./assets/minus.png")}></Image></TouchableOpacity>
  
  if (limit<0.1){
    minus = <Image style={{width: 24, height: 24, opacity: 0.5}} source={require("./assets/minus.png")}></Image>
  }

  let newNumber6 = Number(limit).toFixed(1);
  let newNumber7 = Number(limit*0.1).toFixed(2);

  return(
    <SafeAreaView style={styles.container}>

      <DataTable style={{marginTop: "8%"}}> 
      
      <DataTable.Row style={{backgroundColor: "#e5191c", borderBottomWidth: 0}}> 
        <DataTable.Cell></DataTable.Cell> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 36, color: "white"}}>Hello!</Text></DataTable.Cell> 
        <DataTable.Cell></DataTable.Cell> 
      </DataTable.Row> 
  
      <DataTable.Row style={{backgroundColor: "#e5191c", borderBottomWidth: 0}}>   
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 20, opacity: 0.7, color: "white"}}>Please tell us about yourself</Text></DataTable.Cell> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%", height: "14.5%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{paddingTop: "7%", backgroundColor: "white", paddingBottom: "10%"}}> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell style={{justifyContent: "center"}}>{warning}</DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderTopColor: "lightgrey", borderTopWidth: 0.5}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Name</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell>
      <TextInput
        value={name}
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setName(newText)}
        placeholder="Your name"
      /></DataTable.Cell> 
      </DataTable.Row> 

      {genderChoice}

      {unitChoice}

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Weight</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell>{weightSetter}</DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{borderColor: "lightgrey"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Allowed level</Text></DataTable.Cell>
        <DataTable.Cell style={{justifyContent: "center"}}>{minus}</DataTable.Cell>
        <DataTable.Cell ><TouchableOpacity onPress={() => setLimit(limit+0.1)}><Image style={{width: 24, height: 24}} source={require("./assets/plus.png")}></Image></TouchableOpacity></DataTable.Cell> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{color: "red", fontSize: 16}}>{newNumber6}‰({newNumber7}%)</Text></DataTable.Cell>

      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 
      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row>     

      </DataTable> 

      <View style={styles.parent}>
        <TouchableOpacity onPress={Home} style={{backgroundColor: "#f4f6f5", width:"50%"}}><Text style={{marginTop: "15%", marginLeft: "42%"}}>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={Save} style={{backgroundColor: "#e5191c", width:"50%"}}><Text style={{color: "white", marginTop: "15%", marginLeft: "42%"}}>Save</Text></TouchableOpacity>
      </View>

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5191c"
  },
  parent: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "10%"
  },
});