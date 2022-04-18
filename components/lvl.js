
import React, {useState} from 'react';
import { StyleSheet, ScrollView,Text, View,TouchableOpacity,Image } from 'react-native';

import * as data from '../assets/details.json' 

//import {writeAsStringAsync,documentDirectory,readAsStringAsync} from  'expo-file-system';


const levels = data.levels
let progress = data.progress

// presentational component for the level screens geenerated by the lvlsContainere
function Lvls({choices,q,onTap,timer,onTimeOut}){
  return (
    <View style={styledLevel.container}>
      <Timer time={timer} onTimeOut={onTimeOut} style={styledLevel.timer} />
      <View><Text style={styledLevel.question}>What is {q} ?</Text></View>
      <View style={styledLevel.buttonContainer}>
	{
	  choices.map( item => {
	    return (
	      <>
		<TouchableOpacity style={styledLevel.buttons} key={item} onPress={ () => onTap(item) }>
		  <Text style={styledLevel.buttonText}>{item}</Text>
		</TouchableOpacity>
	      </>
	    )
	  })
	}
      </View>
    </View>
  )
}

const styledLevel = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
//    backgroundColor: "#0DB9EB"
    //make a gradient bg

  },
  question: {
    fontSize: 30
  },
  buttons: {
   // background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
    backgroundColor: "#000",
    borderRadius: 8,
//  font-family: "Inter UI","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    fontSize: 16,
    fontWeight: "500",
    width: "40%",
    height: 30,
    paddingBottom: 5,
    alignItems: "center",
    marginBottom: 10,

//    width: "40%",
//    alignItems: "center",
//    marginBottom: 20,
//    padding: 10,
//    backgroundColor: "#FF9700",
//    borderRadius: 20,

  },
  buttonText: {
    fontSize: 20,
    textTransform: "capitalize",
    color: "#FFFFFF",
  },
  buttonContainer : {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
})


//The leevel screen container
//haldls onClicks,
//generates the random choices
//after the user finished answering the question will bring the finish screeen
class LvlContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      q:0, //start from question 0 
      timer:+levels[this.props.route.params.level]["timer"],
      correctAnswered:0
    };
    this.handlOnTap = this.handlOnTap.bind(this)
    this.handlOnTimeOut = this.handlOnTimeOut.bind(this)
  }
  
  //  componentDidMount(){
  //    this.setState({correctAns:levels[this.props.route.params.level]['questions'][this.state.q].ans})
  //  }

  handlOnTimeOut() {
      this.setState( prevState => ({q:prevState.q+1}))
  }
  
  handlOnTap(res) {
    if(res == +levels[this.props.route.params.level]["questions"][this.state.q]["ans"]){
      this.setState( (prevState) => ({
        q:prevState.q+1,
	correctAnswered:prevState.correctAnswered+1
      }))
    }else
      this.setState( prevState => ({q:prevState.q+1}))
    }
  //}
  render(){
    let finish = false;
    let arr=[];
    //if the question exists generating the options for it otherwise set finish to true and render the finish screen
    if (this.state.q<=levels[this.props.route.params.level]['questions'].length-1){

      let ans = +levels[this.props.route.params.level]["questions"][this.state.q]["ans"]
      let min = Math.ceil(ans-(ans-2))
      let max= 20//ans+(ans*2)
      while (arr.length != 4){
	let a=Math.floor(Math.random()*(max-min+1)+min)
	if  (!arr.includes(a) && +a !== +ans){
	  arr.push(a)
	}
      }
      arr.splice(Math.floor(Math.random()*4),0,ans)

    }else {
      finish = true
     // const details = readAsStringAsync(documentDirectory+"details.json")
      //console.log(details)
//      if (details) {
//	writeAsStringAsync(documentDirectory+"details.json",)
//      }
    }
    //inserting the correct answer into the array of different options
    return (
      <>
	{
	  //setting the timer if the level requires one
	  finish ?
	  <FinishContainer correctAns={this.state.correctAnswered} ></FinishContainer> :
	  <Lvls choices={arr} q={levels[this.props.route.params.level].questions[this.state.q].q} onTap={this.handlOnTap} timer={ 99999999 } onTimeOut={this.handlOnTimeOut} /> 
	}
      </>
    )
  };
}

class Timer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:"Time Left: ",
      timer:this.props.time,
      pause: false 
      
    }
    this.tick = this.tick.bind(this)
    this.handlPause = this.handlPause.bind(this)
  }

  componentDidMount(){
    if (this.state.timer){
      this.timerID = setInterval( () => this.tick(),1000);
    }else {
      this.state.time = "time no problem"
    }
  }
  componentWillUnmount(){
    if (this.props.time){
      clearInterval(this.timerID);
    }
  }
  tick(){
    if (this.state.timer !=0){
      this.setState( prevState => ({
	timer: prevState.timer-1
      }));
    }else {
      this.props.onTimeOut()
      this.setState({ timer: this.props.time })
    }
  }
  handlPause(){
    if (!this.state.pause){
      clearInterval(this.timerID);
      this.setState({pause:true})
    }else {
      clearInterval(this.timerID);
      this.setState({pause:false})
      this.timerID = setInterval( () => this.tick(),1000);
    }
  }
  render(){
    return (
      <View style={styledTimer.container}>
	<Text onPress={this.handlPause}>Pause</Text>
	<Text>{ this.state.title+ this.state.timer}</Text>
      </View>
    )
  }
}

const styledTimer = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 26
  },
  timeLeft: {
    
  }
})
function FinishContainer(props){

  return(
    <Finish ans={props.correctAns} />
  )
}

function Finish(props) {
  return(
    <View style={styledFinish.container}>
      <View style={styledFinish.header}>
	<Text style={styledFinish.title}>Finish</Text>
	<Image source={require("../assets/fireworks.gif")} ></Image>
      </View>
      <Text>{props.ans}</Text>
    </View>
  )
}

const styledFinish = StyleSheet.create({
  gif: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1
  },
  header: {
    position: "relative",
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    position: "absolute",
    bottom: 0
  }
  
})
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

  componentDidMount(){
    
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
  const colors = ['#347C17','coral','firebrick','crimson','firebrick','indigo','darkviolet']
  return(
    <View style={lvl().levelContainer}>
      <ScrollView style={lvl().container}>
	{
	  props.arr.map(  (item,index)  => {
	    return (
	      <TouchableOpacity key={item} onPress={ ()=> props.onTap(item) } style={lvl(colors[index]).btn}>
		<Text style={lvl().txt}>Level {item}</Text>
	      </TouchableOpacity>
	    )
	  })
	}
      </ScrollView>
    </View>
  )
}

const lvl = (color) => StyleSheet.create({
  container: {
    flex: 1,
    width: '80%'
  },
  levelContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  btn: {
    marginBottom: 20,
    padding: 9,
    width: '100%',
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
