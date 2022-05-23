import { StatusBar } from 'expo-status-bar';
import {  SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; //mb not needed ??
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {readDirectoryAsync,deleteAsync,writeAsStringAsync,documentDirectory} from 'expo-file-system';

import Home from './components/home'
import {LvlContainer,Finish}from './components/lvl'

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
	<Stack.Screen name="lvl" component={LvlContainer}  screenOptions={{unmountOnBlur:true }} options={{
	  unmountOnBlur:true,
	  title:"Go Home",
	  headerStyle: {
            backgroundColor: '#BCEDFC'
	  }
	}} />
	<Stack.Screen name="finish" component={Finish} options={{
	  title: "Go Home",
	  headerStyle: {
            backgroundColor: '#ffffff',
	  }
	  }}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}



