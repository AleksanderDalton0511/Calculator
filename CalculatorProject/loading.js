import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper'; 

export default function Loading() {

const [number, setNumber] = useState("");

useEffect(() => {
  // load
storage2
.load({
  key: 'number',
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
  setNumber(ret);
})
.catch(err => {
  switch (err.name) {
    case 'NotFoundError':
      break;
    case 'ExpiredError':
      break;
  }
});
}, []);

const navigation = useNavigation();

const currentDate = Date.now();

const [result, setResult] = useState(0);
const [result1, setResult1] = useState(0);
const [result2, setResult2] = useState(0);
const [result3, setResult3] = useState(0);
const [result4, setResult4] = useState(0);
const [result5, setResult5] = useState(0);
const [result6, setResult6] = useState(0);
const [result7, setResult7] = useState(0);
const [result8, setResult8] = useState(0);
const [result9, setResult9] = useState(0);
const [result10, setResult10] = useState(0);
const [result11, setResult11] = useState(0);
const [result12, setResult12] = useState(0);
const [result13, setResult13] = useState(0);
const [result14, setResult14] = useState(0);
const [result15, setResult15] = useState(0);
const [result16, setResult16] = useState(0);
const [result17, setResult17] = useState(0);
const [result18, setResult18] = useState(0);
const [result19, setResult19] = useState(0);
const [result20, setResult20] = useState(0);
const [result21, setResult21] = useState(0);
const [result22, setResult22] = useState(0);
const [result23, setResult23] = useState(0);
const [result24, setResult24] = useState(0);
const [result25, setResult25] = useState(0);
const [result26, setResult26] = useState(0);
const [result27, setResult27] = useState(0);
const [result28, setResult28] = useState(0);
const [result29, setResult29] = useState(0);
const [result30, setResult30] = useState(0);

  let resultsArray = [];

  if(result!=0){
    resultsArray.push(result)
  }
  if(result1!=0){
    resultsArray.push(result1)
  }
  if(result2!=0){
    resultsArray.push(result2)
  }
  if(result3!=0){
    resultsArray.push(result3)
  }
  if(result4!=0){
    resultsArray.push(result4)
  }
  if(result5!=0){
    resultsArray.push(result5)
  }
  if(result6!=0){
    resultsArray.push(result6)
  }
  if(result7!=0){
    resultsArray.push(result7)
  }
  if(result8!=0){
    resultsArray.push(result8)
  }
  if(result9!=0){
    resultsArray.push(result9)
  }
  if(result10!=0){
    resultsArray.push(result10)
  }
  if(result11!=0){
    resultsArray.push(result11)
  }
  if(result12!=0){
    resultsArray.push(result12)
  }
  if(result13!=0){
    resultsArray.push(result13)
  }
  if(result14!=0){
    resultsArray.push(result14)
  }
  if(result15!=0){
    resultsArray.push(result15)
  }
  if(result16!=0){
    resultsArray.push(result16)
  }
  if(result17!=0){
    resultsArray.push(result17)
  }
  if(result18!=0){
    resultsArray.push(result18)
  }
  if(result19!=0){
    resultsArray.push(result19)
  }
  if(result20!=0){
    resultsArray.push(result20)
  }
  if(result21!=0){
    resultsArray.push(result21)
  }
  if(result22!=0){
    resultsArray.push(result22)
  }
  if(result23!=0){
    resultsArray.push(result23)
  }
  if(result24!=0){
    resultsArray.push(result24)
  }
  if(result25!=0){
    resultsArray.push(result25)
  }
  if(result26!=0){
    resultsArray.push(result26)
  }
  if(result27!=0){
    resultsArray.push(result27)
  }
  if(result28!=0){
    resultsArray.push(result28)
  }
  if(result29!=0){
    resultsArray.push(result29)
  }
  if(result30!=0){
    resultsArray.push(result30)
  }

  const arrayLenght = resultsArray.length;

  useEffect(() => {
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });

      storage
      .load({
        key: 'result'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result1'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult1(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
    })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result2'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult2(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result3'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult3(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result4'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult4(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result5'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult5(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result6'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult6(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result7'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult7(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result8'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult8(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result10'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult10(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result9'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult9(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result11'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult11(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result12'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult12(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
        console.log(ret);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result13'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult13(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result14'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult14(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result15'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult15(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result16'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult16(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result17'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult17(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result18'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult18(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result19'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult19(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result20'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult20(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result21'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult21(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result22'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult22(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result23'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult23(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result24'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult24(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result25'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult25(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result26'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult26(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result27'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult27(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result28'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult28(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result29'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult29(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
      storage
      .load({
        key: 'result30'+','+number,
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
        const timeElapsed = currentDate - ret.Date.date
        const finalTime = timeElapsed/3600000;
        setResult30(ret.alcInBlood.LeftAlcohol - (finalTime * 0.1)/arrayLenght);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
    
  }, [number, arrayLenght]);

  const finalResult = result+result1+result2+result3+result4+result5+result6+result7+result8+result9+result10+result11+result12+result13+result14+result15+result16+result17+result18+result19+result20+result21+result22+result23+result24+result25+result26+result27+result28+result29+result30;

  function SaveResult(){
    const storage = new Storage({
        size: 1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
        sync: {
        }
      });
    storage.save({
        key: 'FinalResultBAC', // Note: Do not use underscore("_") in key!
        data: {
          TheResult: {finalResult},
        },
        expires: null
      });
      navigation.navigate("Calculator");
  }

  if(finalResult>0){
    SaveResult();
  }

  

  const [memoName, setName] = useState("");
  const [memoWeight, setWeight] = useState("");
  const [memoGender, setMemoGender] = useState("");

  if (number == 3 && memoName == ""){
    setNumber(2);
  }
  else if (number == 2 && memoName == ""){
    setNumber("");
  }

  const [extraHelper, setExtraHelper] = useState("");

  useEffect(() => {
    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });

    // load
    storage
      .load({
        key: 'drinkNum',
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
        setExtraHelper(ret.Num.drinkHelper);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
    
  }, []);

  let drinkHelper = extraHelper;

  const storage2 = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
    }
  });

  useEffect(() => {
      const storage = new Storage({
        size: 1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
        sync: {
        }
      });

      // load
      storage
        .load({
          key: 'user'+number,
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
          setWeight(ret.Weight);
          setName(ret.Name);
          setMemoGender(ret.Gender)
        })
        .catch(err => {
          switch (err.name) {
            case 'NotFoundError':
              break;
            case 'ExpiredError':
              break;
          }
        });
      
    }, [number]);

  const [DrinkedAgo, setDrinkedAgo] = useState("");
  const MinusPerHour = 0.1;
  const losen = MinusPerHour*DrinkedAgo;
  
  const WeightOfPerson = memoWeight.weight;
  const [Gender, setGender] = useState("");

  const [DrinkenMl, setDrinkenMl] = useState("");
  const [Strongness, setStrongness] = useState("");
  const PureAlcohol = (DrinkenMl/100)*Strongness*0.789;
  
  const AlcoholInBlood = PureAlcohol / (WeightOfPerson*Gender);
  const LeftAlcohol = AlcoholInBlood-losen;

  const OutIn = LeftAlcohol/MinusPerHour;
  const OutInMin = OutIn*60;
  const PureHours = OutInMin/60;
  const PureMins = OutInMin% 60;

  function Selection(){
    navigation.navigate("Selection");
  }

  function Backwards(){
    navigation.navigate("Backwards");
  }

  function Drinks(){
    drinkHelper++;

    const storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });

      storage.save({
        key: 'drinkNum', // Note: Do not use underscore("_") in key!
        data: {
          Num : {drinkHelper}
        },
        expires: null
      });

      navigation.navigate("Drinks");
  }

  useEffect(() => {
    if (memoGender.gender!="Male"){
      setGender(0.6);
    }
    else{
      setGender(0.7);
    }
  }, [memoGender]);

  useEffect(() => {
    const storage3 = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
      sync: {
      }
    });

    // load
    storage3
      .load({
        key: 'drink',
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
        setDrinkedAgo(ret.Ago.ago);
        setDrinkenMl(ret.Amount.amount);
        setStrongness(ret.Content.content);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
    
  }, [number]);

  return(
    <SafeAreaView style={styles.container}>

      <Text>Loading...</Text>

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#61a22d"
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});