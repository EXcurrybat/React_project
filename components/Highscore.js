import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, FlatList } from 'react-native';


export default class HighscoreComponent extends Component {
    constructor() {
        super();
        var highscores = require('../highscore.json');
		this.state = {
			items: highscores.highscores,
		}
		this.goBack= this.goBack.bind(this);
	}
	
	renderRow(task){
		return(
			<TouchableHighlight
				style = {styles.button}
				underlayColor = "white"
			>
				<Text style={styles.title}>Score: {task.item.score}</Text>
			</TouchableHighlight>
		)
	}
	
	goBack(){
		console.log("go back");
	}
    

    render() {
        return (
			<View style={styles.gameScreen}>
				<Text style={{color: 'white'}}>This is Score</Text>
			</View>
        )
    }
}



const styles = StyleSheet.create({
	gameScreen:{
        position: 'absolute',
        height: '100%', width: '100%',
        backgroundColor: 'black',
        justifyContent:'center', alignItems:'center'
    }
})