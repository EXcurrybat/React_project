import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default class GameScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      shipImage: require('../assets/spriteAssets/ship.png'),
      blaster: require('../assets/spriteAssets/blaster.gif'),
      initialShipY: 0,
      initialShipX: 180,
      blaster1OriginX: 0,
      blaster1OriginY: 445,
      blaster2OriginX: 25,
      blaster2OriginY: 445,
      blaster3OriginX: 50,
      blaster3OriginY: 445,
      ammoCount:3,
      gameTime:0,
      bulletFrame:0,
      lifeCount: 3     
    }
  }

  resetDirection = () => {
    this.props.direction.buttonDirection = ''
  }

  resetAB = () => {
    this.props.direction.abInputs = ''
    this.props.direction.buttonDirection = ''
  }

  bullet1Frame = () => {
    this.b1Frame = setInterval(() => {
      if (this.state.blaster1OriginY != 400 && this.state.blaster1OriginY != 445) {
        this.setState({blaster1OriginY: this.state.blaster1OriginY+10})
      } if (this.state.blaster1OriginY >= 400){
        clearInterval(this.b1Frame)
      }
    }, 60);
  }

  bullet2Frame = () => {
    this.b2Frame = setInterval(() => {
      if (this.state.blaster2OriginY != 400 && this.state.blaster2OriginY != 445) {
        this.setState({blaster2OriginY: this.state.blaster2OriginY+10})
      } if (this.state.blaster2OriginY >= 400){
        clearInterval(this.b2Frame)
      }
    }, 60);
  }

  bullet3Frame = () => {
    this.b3Frame = setInterval(() => {
      if (this.state.blaster3OriginY != 400 && this.state.blaster3OriginY != 445) {
        this.setState({blaster3OriginY: this.state.blaster3OriginY+10})
      } if (this.state.blaster3OriginY >= 400){
        clearInterval(this.b3Frame)
      }
    }, 60);
  }

  componentDidMount() {
    this.aniTime = setInterval(() => {
      this.setState({gameTime: this.state.gameTime+1})
      if(this.state.gameTime == 120) {
        clearInterval(this.aniTime)
      }
    }, 1000);
  }

  render() {
    if (this.props.direction.buttonDirection == 'Up' && this.state.initialShipY < 400) {
      this.setState({initialShipY: this.state.initialShipY+=10})
      this.resetDirection()
    } else if (this.props.direction.buttonDirection == 'Down' && this.state.initialShipY > 0) {
      this.setState({initialShipY: this.state.initialShipY-=10})
      this.resetDirection()
    } else if (this.props.direction.buttonDirection == 'Left' && this.state.initialShipX > 0) {
      this.setState({initialShipX: this.state.initialShipX-=10})
      this.resetDirection()
    } else if (this.props.direction.buttonDirection == 'Right' && this.state.initialShipX < 350) {
      this.setState({initialShipX: this.state.initialShipX+=10})
      this.resetDirection()
    }

    return (
      <View style={styles.gameScreen}>
        <Image source={this.state.shipImage} style={{bottom:this.state.initialShipY, left: this.state.initialShipX, position: 'absolute', width: 50, height: 50}}/>
        <Text style={{color: 'white', position: 'absolute', left:7, top:0}}>Ammo Count:</Text>
        <Text style={{color: 'white', position: 'absolute', top:0}}>Game Time:</Text>
        <Text style={{color: 'white', position: 'absolute', top:25}}>{this.state.gameTime}</Text>
        <Text style={{color: 'white', position: 'absolute', top:0, right:25}}>Life Count: </Text>
        <Text style={{color: 'white', position: 'absolute', top:25, right:70}}>{this.state.lifeCount}</Text>

        <View style={{bottom:this.state.blaster1OriginY, left: this.state.blaster1OriginX, position: 'absolute', width: 50, height: 50}}>
          <Image source={this.state.blaster} style={{height: 50, width: 50}}/>
        </View>

        <View style={{bottom:this.state.blaster2OriginY, left: this.state.blaster2OriginX, position: 'absolute', width: 50, height: 50}}>
          <Image source={this.state.blaster} style={{height: 50, width: 50}}/>
        </View>

        <View style={{bottom:this.state.blaster3OriginY, left: this.state.blaster3OriginX, position: 'absolute', width: 50, height: 50}}>
          <Image source={this.state.blaster} style={{height: 50, width: 50}}/>
        </View>

        {this.shootBlaster()}
      </View>
    );
  }

  shootBlaster = () => {
    if (this.props.direction.abInputs == 'A') {
      if (this.state.ammoCount == 1){
        this.setState({blaster1OriginX: this.state.initialShipX, blaster1OriginY: this.state.initialShipY+15, ammoCount: this.state.ammoCount-1})
        this.bullet1Frame()
        this.resetAB()
        console.log('pressed ammo1')
      } else if (this.state.ammoCount == 2){
        this.setState({blaster2OriginX: this.state.initialShipX, blaster2OriginY: this.state.initialShipY+15, ammoCount: this.state.ammoCount-1})
        this.bullet2Frame()
        this.resetAB()
        console.log('pressed ammo2')
      } else if (this.state.ammoCount == 3){
        this.setState({blaster3OriginX: this.state.initialShipX, blaster3OriginY: this.state.initialShipY+15, ammoCount: this.state.ammoCount-1})
        this.bullet3Frame()
        this.resetAB()
        console.log('pressed ammo3')
      }
    } if (this.props.direction.abInputs == 'B') {
        if (this.state.blaster3OriginY >= 400 && this.state.blaster2OriginY >= 400 && this.state.blaster1OriginY >= 400){
          this.setState({blaster1OriginX: 0, blaster1OriginY: 445, blaster2OriginX: 25, blaster2OriginY: 445, blaster3OriginX: 50, blaster3OriginY: 445, ammoCount:3})
          this.resetAB()
        } else {
          this.resetAB()
        }
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
