import React from 'react'
import { StyleSheet, Button, Text, View } from 'react-native';
import {LvlButtonsContainer} from './lvl'

class Home extends React.Component { 
  constructor(props){
    super(props)
    
  }
  render(){
    return (
      <View>
	<Header navigation={this.props.navigation}></Header>
	<LvlButtonsContainer navigation={this.props.navigation} />
      </View>
    );
  }
};


function Header({navigation}){
  //will render the header for home
  return (
    <View>
  </View>
  )
}



export default Home;
