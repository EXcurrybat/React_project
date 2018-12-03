import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class GameScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      shipImage: require('../assets/spriteAssets/ship.png'),
      blaster: require('../assets/spriteAssets/blaster.gif'),
      initialShipY: 440,
      initialShipX: 180,
      blaster1OriginX: 0,
      blaster1OriginY: 470,
      blaster2OriginX: 25,
      blaster2OriginY: 470,
      blaster3OriginX: 50,
      blaster3OriginY: 470,
      ammoCount:3,
      showBlaster1: 'none',
      showBlaster2: 'none',
      showBlaster3: 'none',
      gameTime:0,
      reloadStatus: 'unable',
      enemyLife: 20,
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0,
      new: false,
      enemyCurrentX: '0',
      enemyCurrentY: '0',
    }
    this.randomX = this.randomX.bind(this);
    this.randomY = this.randomY.bind(this);
    this.randomAnim = this.randomAnim.bind(this);
  }

  resetDirection = () => {
    this.props.direction.buttonDirection = ''
  }

  resetAB = () => {
    this.props.direction.abInputs = ''
    this.props.direction.buttonDirection = ''
  }

  randomX =()=>{
    let newXVal = Math.floor(Math.random() * 360) + 16;
    return newXVal;
  }

  randomY=()=>{
    let newYVal = Math.floor(Math.random() * 100) + 1;
    return newYVal;
  }

  randomAnim=()=>{
    let oldX = this.state.beginX;
    let oldY = this.state.beginY;
    let newX = this.state.endX;
    let newY = this.state.endY;
    if(this.state.new){
      this.setState({new: false})
    }
    return {0:{left: oldX, top: oldY}, 1:{left: newX, top: newY}}
  }

  onLayout = (e) => {
    this.setState({enemyCurrentX: e.nativeEvent.layout.x, enemyCurrentY: e.nativeEvent.layout.y})
    // console.log(e.nativeEvent.layout.x + " ," + e.nativeEvent.layout.y);
  }

  resetBullets = () => {
    this.setState({
      blaster1OriginX: 0,
      blaster1OriginY: 470,
      blaster2OriginX: 25,
      blaster2OriginY: 470,
      blaster3OriginX: 50,
      blaster3OriginY: 470,
      ammoCount: 3,
      reloadStatus: 'unable',
    })
  }

  bullet1Frame = () => {
    this.b1Frame = setInterval(() => {
      if ((this.state.enemyCurrentX< this.state.blaster1OriginX && this.state.blaster1OriginX < (this.state.enemyCurrentX+100))
        && this.state.enemyCurrentY< this.state.blaster1OriginY && this.state.blaster1OriginY < (this.state.enemyCurrentY+100)){
          this.setState({enemyLife: this.state.enemyLife-1, reloadStatus: 'able', showBlaster1: 'none'})
          clearInterval(this.b1Frame)
      } else if (this.state.blaster1OriginY <= 470 && this.state.blaster1OriginY >=19) {
        this.setState({showBlaster1: 'flex', blaster1OriginY: this.state.blaster1OriginY-10})
      } else if (this.state.blaster1OriginY <= 19){
        this.setState({reloadStatus: 'able', showBlaster1: 'none'})
        clearInterval(this.b1Frame)
      }
    }, 60);
  }

  bullet2Frame = () => {
    this.b2Frame = setInterval(() => {
      if ((this.state.enemyCurrentX< this.state.blaster2OriginX && this.state.blaster2OriginX < (this.state.enemyCurrentX+100))
        && this.state.enemyCurrentY< this.state.blaster2OriginY && this.state.blaster2OriginY < (this.state.enemyCurrentY+100)){
          this.setState({enemyLife: this.state.enemyLife-1, showBlaster2: 'none'})
          clearInterval(this.b2Frame)
      } else if (this.state.blaster2OriginY <= 470 && this.state.blaster2OriginY >=19) {
        this.setState({showBlaster2: 'flex', blaster2OriginY: this.state.blaster2OriginY-10})
      } else if (this.state.blaster2OriginY <= 19){
        this.setState({showBlaster2: 'none'})
        clearInterval(this.b2Frame)
      }
    }, 60);
  }

  bullet3Frame = () => {
    this.b3Frame = setInterval(() => {
      if ((this.state.enemyCurrentX< this.state.blaster3OriginX && this.state.blaster3OriginX < (this.state.enemyCurrentX+100))
        && this.state.enemyCurrentY< this.state.blaster3OriginY && this.state.blaster3OriginY < (this.state.enemyCurrentY+100)){
          this.setState({enemyLife: this.state.enemyLife-1, showBlaster3: 'none'})
          clearInterval(this.b3Frame)
      } else if (this.state.blaster3OriginY <= 470 && this.state.blaster3OriginY >=19) {
        this.setState({showBlaster3: 'flex', blaster3OriginY: this.state.blaster3OriginY-10})
      } else if (this.state.blaster3OriginY <= 19){
        this.setState({showBlaster3: 'none'})
        clearInterval(this.b3Frame)
      }
    }, 60);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
    clearInterval(this.updateInterval);
  }

  componentDidMount() {
    this.aniTime = setInterval(() => {
      this.setState({gameTime: this.state.gameTime+1})
      if(this.state.gameTime == 120) {
        clearInterval(this.aniTime)
      }
    }, 1000);

    this.interval = setInterval(() => {
      if(this.state.new == false){
        let orgX = this.state.endX == undefined ? 15 : this.state.endX;
          let orgY = this.state.endY == undefined ? 50 : this.state.endY;
          let destX = this.randomX();
          let destY = this.randomY();
          this.setState({
            beginX: orgX,
            beginY: orgY,
            endX: destX,
            endY: destY,
            new: true
          })
      }
    }, 999);
  }

  render() {
    if (this.props.direction.buttonDirection == 'Up' && this.state.initialShipY > 100) {
      this.setState({initialShipY: this.state.initialShipY-=10})
      this.resetDirection()
    } else if (this.props.direction.buttonDirection == 'Down' && this.state.initialShipY < 445) {
      this.setState({initialShipY: this.state.initialShipY+=10})
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
        <Image source={this.state.shipImage} style={{top:this.state.initialShipY, left: this.state.initialShipX, position: 'absolute', width: 50, height: 50}}/>
        <Animatable.View onLayout={this.onLayout} style={styles.ballView} animation={this.randomAnim()} iterationCount="infinite" easing="linear" duration={1000 * 1}>
          <Animatable.Image style={styles.ballImg} source={require('../assets/spriteAssets/enemy.png')} />
        </Animatable.View>
        
        <Text style={{color: 'white', position: 'absolute', left:7, top:0}}>Ammo Count:</Text>
        <Text style={{color: 'white', position: 'absolute', left:45, top:25}}>{this.state.ammoCount}</Text>
        <Text style={{color: 'white', position: 'absolute', top:0}}>Game Time:</Text>
        <Text style={{color: 'white', position: 'absolute', top:25}}>{this.state.gameTime}</Text>
        <Text style={{color: 'white', position: 'absolute', top:0, right:25}}>Enemy Life: </Text>
        <Text style={{color: 'white', position: 'absolute', top:25, right:70}}>{this.state.enemyLife}</Text>

        <View style={{top:this.state.blaster1OriginY, left: this.state.blaster1OriginX, position: 'absolute', width: 50, height: 50, display: this.state.showBlaster1}}>
          <Image source={this.state.blaster} style={{height: 50, width: 50, display: this.state.showBlaster1}}/>
        </View>

        <View style={{top:this.state.blaster2OriginY, left: this.state.blaster2OriginX, position: 'absolute', width: 50, height: 50, display: this.state.showBlaster2}}>
          <Image source={this.state.blaster} style={{height: 50, width: 50, display: this.state.showBlaster2}}/>
        </View>

        <View style={{top:this.state.blaster3OriginY, left: this.state.blaster3OriginX, position: 'absolute', width: 50, height: 50, display: this.state.showBlaster3}}>
          <Image source={this.state.blaster} style={{height: 50, width: 50, display: this.state.showBlaster3}}/>
        </View>

        {this.shootBlaster()}
      </View>
    );
  }

  shootBlaster = () => {
    if (this.props.direction.abInputs == 'A') {
      if (this.state.ammoCount == 1){
        this.setState({blaster1OriginX: this.state.initialShipX, blaster1OriginY: this.state.initialShipY-15, ammoCount: this.state.ammoCount-1})
        this.bullet1Frame()
        this.resetAB()
        console.log('pressed ammo1')
      } else if (this.state.ammoCount == 2){
        this.setState({blaster2OriginX: this.state.initialShipX, blaster2OriginY: this.state.initialShipY-15, ammoCount: this.state.ammoCount-1})
        this.bullet2Frame()
        this.resetAB()
        console.log('pressed ammo2')
      } else if (this.state.ammoCount == 3){
        this.setState({blaster3OriginX: this.state.initialShipX, blaster3OriginY: this.state.initialShipY-15, ammoCount: this.state.ammoCount-1})
        this.bullet3Frame()
        this.resetAB()
        console.log('pressed ammo3')
      }
    } if (this.props.direction.abInputs == 'B') {
        if (this.state.reloadStatus == 'able'){
          this.resetBullets()
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
    ballView: {
      position: 'absolute',
      width: 100,
      height: 100,
      bottom: 0,
      zIndex: 5,
    },
    ballImg: {
      position: 'absolute',
      width: 100,
      height: 100,
      bottom: 0,
      left: 0
    }
});
