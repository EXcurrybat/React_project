import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

import GameScreen from './components/GameScreen.js';
import BallComponent from './components/ball';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedDirection: '',
      pressedAB: ''
    }
  }

  render() {
    var inputData = {
      buttonDirection: this.state.pressedDirection,
      abInputs: this.state.pressedAB
    }
    return (
      <View style={styles.container}>
          <GameScreen direction={inputData}/>

          <View style={styles.dpad}>
            <Image source={require('./assets/layoutAssets/dpad.png')} style={{height:'100%', width:'100%', alignSelf: 'center'}} resizeMode='stretch'/>
            <TouchableOpacity onPress={()=> this.setState({pressedDirection: 'Up', pressedAB:''})} style={styles.up}/>
            <TouchableOpacity onPress={()=> this.setState({pressedDirection: 'Down', pressedAB:''})} style={styles.down}/>
            <TouchableOpacity onPress={()=> this.setState({pressedDirection: 'Left', pressedAB:''})} style={styles.left}/>
            <TouchableOpacity onPress={()=> this.setState({pressedDirection: 'Right', pressedAB:''})} style={styles.right}/>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity 
              onPress={()=> this.setState({pressedAB: 'A', pressedDirection:''})}
              style={{height:'50%', width:'50%', position: 'absolute', top: 0, right: 0}}>
                <Image source={require('./assets/layoutAssets/aButton.png')} style={{height: '100%', width: '100%'}} resizeMode={'stretch'}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=> this.setState({pressedAB: 'B', pressedDirection: ''})}
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
  }
});

// <Image source={require('./assets/layoutAssets/aButton.png')} style={{height:'50%', width:'50%', position: 'absolute', bottom: 0, left: 0}}/>
// <Image source={require('./assets/layoutAssets/bButton.png')} style={{height:'50%', width:'50%', position: 'absolute', top: 0, right: 0}}/>