import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default class BallComponent extends Component {

	constructor() {
        super();
        this.state = {
        	beginX: 0,
          	beginY: 0,
          	endX: 0,
          	endY: 0,
          	new: false
        }
        this.randomX = this.randomX.bind(this);
        this.randomY = this.randomY.bind(this);
        this.randomAnim = this.randomAnim.bind(this);
        this.onLayout = this.onLayout.bind(this);
    }

    randomX(){
    	let newXVal = Math.floor(Math.random() * 360) + 16;
    	return newXVal;
    }

    randomY(){
    	let newYVal = Math.floor(Math.random() * 100) + 1;
    	return newYVal;
    }

    randomAnim(){
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
    	// console.log(e.nativeEvent.layout.x + " ," + e.nativeEvent.layout.y);

    }

    componentDidMount(){
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
 
    componentWillUnmount(){
    	clearInterval(this.interval);
    	clearInterval(this.updateInterval);
  	}

    render() {
        return (
            <Animatable.View onLayout={this.onLayout} style={ballStyles.ballView} animation={this.randomAnim()} iterationCount="infinite" easing="linear" duration={1000 * 1}>
        		<Animatable.Image style={ballStyles.ballImg} source={require('../assets/ball.png')} ></Animatable.Image>
      		</Animatable.View>
        )
    }
}

// Animatable.initializeRegistryWithDefinitions({
// 	boxSlide:{
		// 0: {
		// 	left: 15,
		// 	top: 50
		// },
		// 0.25:{
		// 	top: 0
		// },
		// 0.4: {
		// 	left: 375,
		// 	top:50
		// },
		// 0.8: {
		// 	top: 100
		// },
		// 1: {
		//   	left: 15,
		//   	top: 50
		// }
// 	}
// });

const ballStyles = StyleSheet.create({
	ballView: {
		position: 'absolute',
		width: 100,
		height: 100,
		top: 50,
		left: 225,
		zIndex: 5
	},
	ballImg: {
		position: 'absolute',
		width: 100,
		height: 100,
		top: 0,
		left: 0
	}
})