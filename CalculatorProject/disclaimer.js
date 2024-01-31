import { Text, Image, ScrollView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper'; 

export default function Disclaimer(){
  const navigation = useNavigation();

  return(
    <ScrollView style={{backgroundColor: "#e5191c"}}>

      <DataTable style={{marginTop: "8%"}}> 
      
      <DataTable.Row style={{backgroundColor: "#e5191c", borderBottomWidth: 0}}> 
        <DataTable.Cell></DataTable.Cell> 
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 26, color: "white"}}>Disclaimer</Text></DataTable.Cell> 
        <DataTable.Cell></DataTable.Cell> 
      </DataTable.Row> 
  
      <DataTable.Row style={{backgroundColor: "#e5191c", borderBottomWidth: 0}}>   
        <DataTable.Cell style={{justifyContent: "center"}}><Text style={{fontSize: 20, opacity: 0.7, color: "white"}}>Important information</Text></DataTable.Cell> 
      </DataTable.Row> 

      </DataTable> 

      <Image style={{width: "100%"}} source={require("./assets/Valge3.png")}></Image>

      <DataTable style={{backgroundColor: "white"}}> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell>***Important</DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>The information and blood alcohol content (BAC) estimations provided by this app are NOT legal advice. Your actual BAC might depend on a variety of different factors, like health, consumed food, physical activity, genetics. This results are just estimates for an average person. Do not rely on the results to drive. The developer of the app is not responsible for any legal issues that you might have. The developer of this app is not encouraging to drink and drive. You are not allowed to engage in activities (e.g driving) based on application calculations. Please, NEVER NEVER drink and drive :)</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>How are the results calculated?</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>The app estimates BAC according to the Widmark’s Formula, which takes into account amount of water in your body, amount of alcohol consumed and time passed since alcohol consumption.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>In the app you can use two different units: percent(%) and permille(‰). You can change the default BAC unit in the application settings.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>There are different levels of alcohol intoxication. The body reacts differently to different alcohol amounts. Here’re some general levels:</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>Super light intoxication (0.01 - 0.05%): Average individual appears normal.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>Light intoxication (0.05 - 0.15%): Causes euphoria, person feels comfortable, relaxed.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>Average intoxication (0.15 - 0.25%): Causes motor control issues, slurred speech, slow reaction time. Possibility of short memory blackouts.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>Strong intoxication (0.25 - 0.3%): Severe motor impairment, memory blackout. Possibility of vomiting, unexpected behaviour.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>Dangerous intoxication (0.3 - 0.5%): Dangerous level of alcohol intoxication. Low possibility of death.</Text></DataTable.Cell> 
      </DataTable.Row> 

      <DataTable.Row style={{backgroundColor: "white", borderBottomWidth: 0}}> 
        <DataTable.Cell><Text>Very dangerous intoxication (more than 0.5%): High risk of death.</Text></DataTable.Cell> 
      </DataTable.Row> 

      </DataTable> 

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Calculator")} style={{backgroundColor: "#f4f6f5", width:"100%"}}><Text style={{color: "black", paddingTop: "10%", paddingBottom: "10%", marginLeft: "45%"}}>Accept</Text></TouchableOpacity>
      </View>

      </ScrollView>
  )
}