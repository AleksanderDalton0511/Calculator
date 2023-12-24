import Calculator from "./calculator";
import Calculator2 from "./calculator2";
import User from "./user";
import User2 from "./user2";
import Backwards from "./backwards";
import EditDrinks from "./editDrinks";
import Drinks from "./drinks";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
    }
  });

  const [memoWeight, setWeight] = useState(0);
  const [update, setUpdate] = useState(1);

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
        setWeight(ret.Weight);
      });
  }, []);

  setTimeout(() => {
    setUpdate((update+0.1/3600));
  }, 10);

  let name;
                
  if(update>1 && memoWeight.weight==undefined){
    name = <Stack.Screen name="User2" component={Calculator}/>
  }
  if(update>1 && memoWeight.weight!=undefined){
    name = <Stack.Screen name="Calculator2" component={Calculator}/>
  }
  
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
                {name}
                <Stack.Screen name="Calculator" component={Calculator}/>
                <Stack.Screen name="User" component={User}/>
                <Stack.Screen name="Drinks" component={Drinks}/>
                <Stack.Screen name="EditDrinks" component={EditDrinks} />
                <Stack.Screen name="Backwards" component={Backwards} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}