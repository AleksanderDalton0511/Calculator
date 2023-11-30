import Calculator from "./calculator.js";
import Users from "./users.js";
import Users2 from "./users2";
import Users3 from "./users3";
import Selection from "./selection";
import Backwards from "./backwards";
import EditDrinks from "./editDrinks";
import Drinks from "./drinks";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
                <Stack.Screen name="EditDrinks" component={EditDrinks} />
                <Stack.Screen name="Calculator" component={Calculator}/>
                <Stack.Screen name="Selection" component={Selection} />
                <Stack.Screen name="Drinks" component={Drinks}/>
                <Stack.Screen name="Users" component={Users}/>
                <Stack.Screen name="Users2" component={Users2}/>
                <Stack.Screen name="Users3" component={Users3}/>
                <Stack.Screen name="Backwards" component={Backwards} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}