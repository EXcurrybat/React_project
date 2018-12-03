import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class TitleScreen extends Component {
    constructor() {
        super();
       this.state={
        myInputs: ''
       }
	}
    
    startGame=()=>{
        //To page navigation here
        this.setState({myInputs: 'game'})
    }
	
	highScore=()=>{
        //To page navigation here
        this.setState({myInputs: 'score'})
    }

    render() {
        var titleInput = {
            menuInput: this.state.myInputs
          }
        return (
            <View style={titleStyles.fullScreen} myInput={titleInput}>
                <Text style={titleStyles.mainTitle}>Ded AF Game</Text>                
            </View>
        )
    }
}



const titleStyles = StyleSheet.create({
	fullScreen: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		left: 0,
        top: 0,
        backgroundColor: 'black',
        alignItems: 'center'
	},
    mainTitle: {
        position: 'absolute',
        top: 150,
        margin: 'auto',
        color: 'white',
        fontWeight: "900",
        fontSize: 50,
        textShadowColor: 'rgba(150, 150, 150, 0.75)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 12
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 250,
    },
	hsButtonContainer: {
		position: 'absolute',
		bottom: 200
	}
})