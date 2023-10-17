import calculator from "/calculator.js";
import users from "/users.js";
import users2 from "./users2";
import users3 from "./users3";
import selection from "/selection";
import backwards from "./backwards";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Calculator" component={calculator}/>
                <Stack.Screen name="Users" component={users}/>
                <Stack.Screen name="Users2" component={users2}/>
                <Stack.Screen name="Users3" component={users3}/>
                <Stack.Screen name="Selection" component={selection} />
                <Stack.Screen name="Backwards" component={backwards} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}