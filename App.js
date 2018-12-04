import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Button, Text } from 'react-native';

import GameScreen from './components/GameScreen.js';
import HighScore from './components/Highscore.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedDirection: '',
      menuDirection: '',
      menuInput: '',
      pressedAB: '',
      stop: 'stop',
      displayMenu: 100,
      menuSelection: '',
      menuPosition: 237
    }
  }
  startGame=()=>{
    //To page navigation here
    this.setState({myInputs: 'game', displayMenu: 0})
}

  highScore=()=>{
      //To page navigation here
    this.setState({myInputs: 'score', displayMenu: 0})
  }

  render() {
    var inputData = {
      buttonDirection: this.state.pressedDirection,
      abInputs: this.state.pressedAB,
      shipStop: this.state.stop
    }

    let menuInteraction = () => {
      if (this.state.menuPosition == 237 && this.state.menuDirection == 'Down'){
        this.setState({menuPosition: this.state.menuPosition+60})
      } else if (this.state.menuPosition == 297 && this.state.menuDirection == 'Up'){
        this.setState({menuPosition: this.state.menuPosition-60})
      } else if (this.state.menuInput == 'A' && this.state.menuPosition == 237){
        this.setState({menuSelection: 'game', menuDirection: 999, pressedAB: '', menuInput: '', menuDirection: '', pressedDirection: ''})
      } else if (this.state.menuInput == 'A' && this.state.menuPosition == 297){
        this.setState({menuSelection: 'highscore', menuDirection: 999, pressedAB: '', menuInput: '', menuDirection: '', pressedDirection: ''})
      }
    }
    
    let returnScreen = () =>{
      if (this.state.menuSelection == 'game'){
        return <GameScreen direction={inputData}/>
      } else if (this.state.menuSelection == 'highscore') {
        return <HighScore />
      } else {
        return <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 30, position: 'absolute', top: 30, textAlign: 'center', fontWeight: 'bold'}}>GENERIC AF SPACE SHOOTER GAME</Text>
          <Text style={{color: 'white', fontSize: 15, position: 'absolute', textAlign: 'center'}}>Start Game</Text>
          <Text style={{color: 'white', fontSize: 15, position: 'absolute', top: 300, textAlign: 'center'}}>See Highscore</Text>
          <Image source={require('./assets/layoutAssets/arrow.png')} style={{width: 30, height: 30, position:'absolute', left: 70, top: this.state.menuPosition}}/>
          {menuInteraction()}
        </View>
      }
    }

    return (
      <View style={styles.container}>
          
        <View style={styles.gameScreen}>
          {returnScreen()}
        </View>
        
        <View style={styles.dpad}>
          <Image source={require('./assets/layoutAssets/dpad.png')} style={{height:'100%', width:'100%', alignSelf: 'center'}} resizeMode='stretch'/>
          <TouchableOpacity 
            onPressIn={()=> this.setState({pressedDirection: 'Up', stop: '', menuDirection: 'Up'})} 
            onPressOut={()=> this.setState({pressedDirection: '', pressedAB:'', stop: 'stop'})}
            style={styles.up}/>
          <TouchableOpacity 
            onPressIn={()=> this.setState({pressedDirection: 'Down', stop: '', menuDirection: 'Down'})} 
            onPressOut={()=> this.setState({pressedDirection: '', pressedAB:'', stop: 'stop'})}
            style={styles.down}/>
          <TouchableOpacity 
            onPressIn={()=> this.setState({pressedDirection: 'Left', stop: ''})} 
            onPressOut={()=> this.setState({pressedDirection: '', pressedAB:'', stop: 'stop'})}
            style={styles.left}/>
          <TouchableOpacity 
            onPressIn={()=> this.setState({pressedDirection: 'Right', stop: ''})} 
            onPressOut={()=> this.setState({pressedDirection: '', pressedAB:'', stop: 'stop'})}
            style={styles.right}/>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity 
            onPressIn={()=> this.setState({pressedAB: 'A', menuInput: 'A'})}
            onPressOut={()=> this.setState({pressedAB: ''})}
            style={{height:'50%', width:'50%', position: 'absolute', top: 0, right: 0}}>
              <Image source={require('./assets/layoutAssets/aButton.png')} style={{height: '100%', width: '100%'}} resizeMode={'stretch'}/>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=> this.setState({pressedAB: 'B'})}
            onPressOut={()=> this.setState({pressedAB: ''})}
            style={{height:'50%', width:'50%', position: 'absolute', bottom: 0, left: 0}}>
              <Image source={require('./assets/layoutAssets/bButton.png')} style={{height: '100%', width: '100%'}} resizeMode={'stretch'}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameScreen:{
    position: 'absolute',
    top: '10%',
    height: '60%', width: '100%',
    backgroundColor: 'black',
    justifyContent:'center', alignItems:'center'
  },
  dpad: {
    position: 'absolute',
    bottom:'3%', left:'2%',
    height: '25%', width:'50%',
    alignItems: 'center', justifyContent: 'center'
  },
  up: {
    position: 'absolute',
    height: '23%', width: '24.5%',
    top: '14%'
  },
  down: {
    position: 'absolute',
    height: '23%', width: '24.5%',
    bottom: '14%'
  },
  left: {
    position: 'absolute',
    height: '23%', width: '24.5%',
    left: '14%'
  },
  right: {
    position: 'absolute',
    height: '23%', width: '24.5%',
    right: '14%'
  },
  buttonView: {
    position: 'absolute',
    bottom:'6%', right:'6%',
    height: '18%', width:'36%'
  }, 
  buttonContainer: {
        position: 'absolute',
        bottom: 250,
    },
	hsButtonContainer: {
		position: 'absolute',
    bottom: 200,
	}
});

// <Image source={require('./assets/layoutAssets/aButton.png')} style={{height:'50%', width:'50%', position: 'absolute', bottom: 0, left: 0}}/>
// <Image source={require('./assets/layoutAssets/bButton.png')} style={{height:'50%', width:'50%', position: 'absolute', top: 0, right: 0}}/>