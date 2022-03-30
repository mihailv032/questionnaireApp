import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {readDirectoryAsync,documentDirectory,StorageAccessFramework} from 'expo-file-system';

import Home from './components/home'
import LvlContainer from './components/lvl'

const Stack= createStackNavigator()

export default function App() {
  details = async () => {
    let files = await readDirectoryAsync(documentDirectory)
    files.includes('details.json') ? console.log('f') : StorageAccessFramework.createFileAsync(documentDirectory,'details.json')

  }
  details()
  return (
    <NavigationContainer>
      <Stack.Navigator>
	<Stack.Screen name="home" component={Home}/>
	<Stack.Screen name="lvl" component={LvlContainer}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

async function details(){
  
}

