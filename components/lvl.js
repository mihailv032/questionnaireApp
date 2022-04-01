
import React, {useState} from 'react';
import { StyleSheet, ScrollView,Text, View,Button } from 'react-native';

import * as data from '../assets/details.json' 

import * as FileSystem from 'expo-file-system';
const { StorageAccessFramework } = FileSystem;


const levels = data.levels
let progress = data.progress


//The leevel screen container
//haldls onClicks,
//generates the random choices
//after the user finished answering the question will bring the finish screeen
class LvlContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      q:0,
      correctAns:null,
    },

    this.handlOnTap = this.handlOnTap.bind(this)
  }

  
  componentDidMount(){
    this.setState({correctAns:levels[this.props.route.params.level]['questions'][this.state.q].ans})
  }
  handlOnTap(res) {
//
// the state is not updated ??
//    
    if(res == this.state.currentAns){
      this.setState( (prevState) => ({
	correctAns:prevState.correctAns+1,
	q:prevState.q+1
      }))
    }else{this.setState( prevState => { {q:prevState.q+1} }) }
    console.log(this.state.correctAns)
//    console.log(levels[route.params.level].length,q ) // printing 0 for some reason ??????

  }
  render(){
    console.log(this.state.q)
    let finish = false;
    let arr=[];
    let ans;
    console.log(levels[this.props.route.params.level]['questions'].length)
    //if the question exists generating the options for it otherwise set finish to true and render the finish screen
    if (this.state.q<=levels[this.props.route.params.level]['questions'].length){
      ans=+levels[this.props.route.params.level]['questions'][this.state.q].ans
      let min = Math.ceil(ans-(ans-2))
      let max=ans+(ans*2)
      while (arr.length != 4){
	let a=Math.floor(Math.random()*(max-min+1)+min)
	if  (!arr.includes(a) && +a !== +ans){
	  arr.push(a)
	}
      }
      arr.splice(Math.floor(Math.random()*4),0,ans)

    }else { finish = true}
      //inserting the correct answer into the array of different options
    return (
    <>
    {
      //setting the timer if the level requires one
      finish ?
      <FinishContainer correctAns={correctAns}></FinishContainer> :
      <Lvls choices={arr} q={levels[this.props.route.params.level].questions[this.state.q].q} onTap={this.handlOnTap} />
      }
    </>
    )
  };
}

// presentational component for the level screens geenerated by the lvlsContainere
function Lvls({choices,q,onTap}){
  return (
    <>
      <View><Text>What is {q}</Text></View>
      {
	choices.map( item => {
	  return (
	    <>
	      <Button key={item} title={String(item)} onPress={ () => onTap(item)} />
	    </>
	  )
	})
      }
    </>
  )
}



function FinishContainer(props){

  return(
    <Finish ans={props.correctAns} />
  )
}

function Finish(props) {
  return(
    <View><Text>{props.ans}</Text></View>
  )
}

//handl the onClick of the buttons in the main menu
//
class LvlButtonsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      levels:Object.keys(levels)
    }
    this.handlTap=this.handlTap.bind(this)
  }
  handlTap(e){
//    if(+e >= 3) {
//      if(+details.progress >= +e){
//	this.props.navigation.navigate('lvl', {level:e})
//      }
//    }else {
//      this.props.navigation.navigate('lvl', {level:e})
//    }
    this.props.navigation.navigate('lvl', {level:e})

  }
  render(){
    return(
      <>
	<LvlButtons onTap={this.handlTap} arr={this.state.levels} />
      </>
    )
  }
}

//presentational component for the buttons shown in the main menu
//called by LvlButtonsContainer
function LvlButtons(props){
  return(
    <ScrollView>
    {
      props.arr.map(  item  => {
	return <Button key={item} title={"Level "+item} onPress={ ()=> props.onTap(item) }/>
      })
    }
      </ScrollView>
  )
}

const lvl = (color) => StyleSheet.create({
  container: {
    flex: 1
  },
  levelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  btn: {
    marginBottom: 20,
    padding: 9,
    width: '80%',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: color
  },
  txt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
})




export default LvlContainer

export {
  LvlButtonsContainer,
  FinishContainer
}
