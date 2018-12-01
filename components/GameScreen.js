import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class GameScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      shipImage: require('../assets/spriteAssets/ship.png'),
      blaster: require('../assets/spriteAssets/blaster.gif'),
      initialShipY: 0,
      initialShipX: 180,
      blasterOriginX: 0,
      blasterOriginY: 0,
      displayBlaster: 0,
      
    }
  }

  render() {
    if (this.props.direction.buttonDirection == 'Up' && this.state.initialShipY < 400) {
      this.setState({initialShipY: this.state.initialShipY+=10})
      this.props.direction.buttonDirection = ''
    } else if (this.props.direction.buttonDirection == 'Down' && this.state.initialShipY > 0) {
      this.setState({initialShipY: this.state.initialShipY-=10})
      this.props.direction.buttonDirection = ''
    } else if (this.props.direction.buttonDirection == 'Left' && this.state.initialShipX > 0) {
      this.setState({initialShipX: this.state.initialShipX-=10})
      this.props.direction.buttonDirection = ''
    } else if (this.props.direction.buttonDirection == 'Right' && this.state.initialShipX < 350) {
      this.setState({initialShipX: this.state.initialShipX+=10})
      this.props.direction.buttonDirection = ''
    }

    return (
      <View style={styles.gameScreen}>
        <Image source={this.state.shipImage} style={{bottom:this.state.initialShipY, left: this.state.initialShipX, position: 'absolute', width: 50, height: 50}}/>
        {this.shootBlaster()}
      </View>
    );
  }

  shootBlaster = () => {
    if (this.props.direction.abInputs == 'A') {
      this.setState({blasterOriginX: this.state.initialShipX, blasterOriginY: this.state.initialShipY+15})
      this.props.direction.abInputs = ''
      this.props.direction.buttonDirection = ''
      console.log('pressed')
      return <Image source={this.state.blaster} style={{bottom:this.state.blasterOriginY, left: this.state.blasterOriginX, position: 'absolute', width: 50, height: 50}}/>
    }
  }
}

const styles = StyleSheet.create({
    gameScreen:{
        position: 'absolute',
        top: '10%',
        height: '60%', width: '100%',
        backgroundColor: 'black',
        justifyContent:'center', alignItems:'center'
    },
});
