import { StatusBar } from 'expo-status-bar';
import {  SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {readDirectoryAsync,deleteAsync,writeAsStringAsync,documentDirectory} from 'expo-file-system';

import Home from './components/home'
import LvlContainer from './components/lvl'

const Stack= createStackNavigator()

export default function App() {
  details = async () => {
    let files = await readDirectoryAsync(documentDirectory)
    files.includes('details.json') ? null : await writeAsStringAsync(documentDirectory+"/details.json","")
    files = await readDirectoryAsync(documentDirectory)

  }
  details()
  return (
    <NavigationContainer>
      <Stack.Navigator  >
	<Stack.Screen name="home" component={Home} options={{
	  headerStyle: {
	    height:0,
            backgroundColor: '#f4511e'
	  }
	}}/>
	<Stack.Screen name="lvl" component={LvlContainer}  screenOptions={{ headerShown: false }}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}



