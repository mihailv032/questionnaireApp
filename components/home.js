import React from 'react'
import { StyleSheet, Button, Text, SafeAreaView,ImageBackground, Image, Platform, StatusBar } from 'react-native';
import {LvlButtonsContainer} from './lvl'

//import MaskedView from "@react-native-community/masked-view";
//import LinearGradient from "react-native-linear-gradient";
    

const bg = require("../assets/bg.png")
const logo = require("../assets/logo.png")

class Home extends React.Component { 
  constructor(props){
    super(props)
    
  }
  render(){
    return (
      <SafeAreaView style={styledHome.container}>
	<ImageBackground source={bg} resizeMode="cover" style={styledHome.img}>
	  <Header navigation={this.props.navigation}></Header>
	  <LvlButtonsContainer navigation={this.props.navigation}/>
	</ImageBackground>
      </SafeAreaView>
    );
  }
};

const styledHome = StyleSheet.create({
  img: {
    flex:1,
    justifyContent: 'center',
  },
  container: {
    flex:1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 5
  }
})

function Header({navigation}){
  //will render the header for home
  return (
    <SafeAreaView style={styledHeader.container}>
      <Image source={logo} style={styledHeader.logo} />
      <Text>welcome</Text>
    </SafeAreaView >
  )
}

const styledHeader=StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logo: {
    width:200,
    height:200,
  }
})


export default Home;
