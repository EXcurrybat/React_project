import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Button } from 'react-native';

import GameScreen from './components/GameScreen.js';
import TitleScreen from './components/TitleScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedDirection: '',
      pressedAB: '',
      stop: 'stop',
      displayMenu: 100,
      myInputs: ''
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
    
    let returnScreen = () =>{
      if (this.state.myInputs == 'game'){
        return <GameScreen direction={inputData}/>
      } else {
        return <TitleScreen />
      }
    }

    return (
      <View style={styles.container}>
          
        {returnScreen()}

        <View style={[styles.buttonContainer, {opacity: this.state.displayMenu}]}>
          <Button 
            title="Start Game"
            color='rgba(150, 150, 150, 0.75)'
            accessibilityLabel="Tap to start the game"
            onPress={this.startGame}
          />
        </View>
        
        <View style={[styles.hsButtonContainer, {opacity: this.state.displayMenu}]}>
					<Button 
            title="Highscores"
            color='rgba(150, 150, 150, 0.75)'
            accessibilityLabel="Tap to see high scores"
            onPress={this.highScore}
          />
        </View>
        
        <View style={styles.dpad}>
          <Image source={require('./assets/layoutAssets/dpad.png')} style={{height:'100%', width:'100%', alignSelf: 'center'}} resizeMode='stretch'/>
          <TouchableOpacity 
            onPressIn={()=> this.setState({pressedDirection: 'Up', stop: ''})} 
            onPressOut={()=> this.setState({pressedDirection: '', pressedAB:'', stop: 'stop'})}
            style={styles.up}/>
          <TouchableOpacity 
            onPressIn={()=> this.setState({pressedDirection: 'Down', stop: ''})} 
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
            onPressIn={()=> this.setState({pressedAB: 'A'})}
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