import Calculator from "./calculator.js";
import Users from "./users.js";
import Users2 from "./users2";
import Users3 from "./users3";
import Selection from "./selection";
import Backwards from "./backwards";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Calculator" component={Calculator}/>
                <Stack.Screen name="Users" component={Users}/>
                <Stack.Screen name="Users2" component={Users2}/>
                <Stack.Screen name="Users3" component={Users3}/>
                <Stack.Screen name="Selection" component={Selection} />
                <Stack.Screen name="Backwards" component={Backwards} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}