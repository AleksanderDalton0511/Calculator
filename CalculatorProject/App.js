import Calculator from "/calculator.js"; 
import Users from "/users.js"; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Calculator"
                    component={Calculator}
                />
                <Stack.Screen name="Users" component={Users} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}