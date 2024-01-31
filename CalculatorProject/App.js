import Calculator from "./calculator.js";
import User from "./user";
import Backwards from "./backwards";
import EditDrinks from "./editDrinks";
import Drinks from "./drinks";
import Disclaimer from "./disclaimer";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";

const Stack = createNativeStackNavigator();

NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("overlay-swipe");

export default function App() {

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
                <Stack.Screen name="Calculator" component={Calculator}/>
                <Stack.Screen name="Drinks" component={Drinks}/>
                <Stack.Screen name="EditDrinks" component={EditDrinks} />
                <Stack.Screen name="User" component={User}/>
                <Stack.Screen name="Backwards" component={Backwards} />
                <Stack.Screen name="Disclaimer" component={Disclaimer}/>
            </Stack.Navigator>
            <StatusBar hidden />
        </NavigationContainer>
  );
}
