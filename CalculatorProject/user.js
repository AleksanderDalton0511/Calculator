import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
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
  const [limit, setLimit] = useState("");
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
        Limit : {limit}
      },
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
  }

  function Save(){
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

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'}
  ]);

  const [open5, setOpen5] = useState(false);
  const [items5, setItems5] = useState([
    {label: 'European', value: 'European'},
    {label: 'American', value: 'American'}
  ]);

  const [open2, setOpen2] = useState(false);
  const [items2, setItems2] = useState([
    {label: '0.0', value: '0.0'},
    {label: '0.1', value: '0.1'},
    {label: '0.2', value: '0.2'},
    {label: '0.3', value: '0.3'},
    {label: '0.4', value: '0.4'},
    {label: '0.5', value: '0.5'},
    {label: '0.6', value: '0.6'},
    {label: '0.7', value: '0.7'},
    {label: '0.8', value: '0.8'},
    {label: '0.9', value: '0.9'}
  ]);

  const [open6, setOpen6] = useState(false);
  const [items6, setItems6] = useState([
    {label: '0.00', value: '0.00'},
    {label: '0.01', value: '0.01'},
    {label: '0.02', value: '0.02'},
    {label: '0.03', value: '0.03'},
    {label: '0.04', value: '0.04'},
    {label: '0.05', value: '0.05'},
    {label: '0.06', value: '0.06'},
    {label: '0.07', value: '0.07'},
    {label: '0.08', value: '0.08'},
    {label: '0.09', value: '0.09'}
  ]);

  function Home(){
    navigation.navigate("Calculator");
  }

  let allLevel = <View style={{flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "lightgrey", paddingBottom: "2%"}}>
  <Text style={{fontSize: 16, color: "#6c6c6c", marginLeft: "3.5%", marginTop: "2.1%"}}>Allowed level</Text>
  <DropDownPicker
  style={{
    minHeight: "1%",
    borderColor: "red",
    width: "26%",
    marginTop: "1.5%",
    marginLeft: "46%",
  }} 
  dropDownContainerStyle={{
    width: "110%"
  }}
  placeholder='Select'
  dropDownDirection="TOP"
  open={open2}
  value={limit}
  items={items2}
  setOpen={setOpen2}
  setValue={setLimit}
  setItems={setItems2}
/>
</View>

if(unit == "American"){
  allLevel = <View style={{flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "lightgrey", paddingBottom: "2%"}}>
  <Text style={{fontSize: 16, color: "#6c6c6c", marginLeft: "3.5%", marginTop: "2.1%"}}>Allowed level</Text>
  <DropDownPicker
  style={{
    minHeight: "1%",
    borderColor: "red",
    width: "26%",
    marginTop: "1.5%",
    marginLeft: "46%",
  }} 
  dropDownContainerStyle={{
    width: "110%"
  }}
  placeholder='Select'
  dropDownDirection="TOP"
  open={open6}
  value={limit}
  items={items6}
  setOpen={setOpen6}
  setValue={setLimit}
  setItems={setItems6}
/>
</View>
}

if(unit=="American" && limit<0.1 && limit!=0){
  setLimit(limit*10)
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
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 16, color: "#6c6c6c", textAlign: "center"}}>To estimate your blood alcohol level correctly we need some information.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderTopColor: "lightgrey", borderTopWidth: 0.5}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Name</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell>
      <TextInput
        style={{fontWeight: "bold", width: "100%", fontSize: 16}}
        onChangeText={newText => setName(newText)}
        placeholder="Your name"
      /></DataTable.Cell> 
      </DataTable.Row> 

      {genderChoice}

      <DataTable.Row style={{backgroundColor: "white", borderTopWidth: 0.5, borderTopColor: "lightgrey"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>BAC units</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><DropDownPicker
        style={{
          minHeight: "1%",
          borderColor: "red",
          width: "110%"
        }} 
        dropDownContainerStyle={{
          width: "110%"
        }}
      placeholder='Select'
      dropDownDirection="TOP"
      open={open5}
      value={unit}
      items={items5}
      setOpen={setOpen5}
      setValue={setUnit}
      setItems={setItems5}
    /></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white"}}> 
        <DataTable.Cell><Text style={{fontSize: 16, color: "#6c6c6c"}}>Weight</Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell><Text></Text></DataTable.Cell>
        <DataTable.Cell>{weightSetter}</DataTable.Cell> 
      </DataTable.Row> 

        {allLevel}

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row> 
      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
      </DataTable.Row>     

      </DataTable> 

      <View style={styles.parent}>
        <TouchableOpacity onPress={Home} style={{backgroundColor: "#f4f6f5", width:"50%"}}><Text style={{marginTop: "15%", marginLeft: "42%"}}>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={Save} style={{backgroundColor: "#81b458", width:"50%"}}><Text style={{color: "white", marginTop: "15%", marginLeft: "42%"}}>Save</Text></TouchableOpacity>
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