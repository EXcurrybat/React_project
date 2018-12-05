import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, FlatList } from 'react-native';


export default class HighscoreComponent extends Component {
    constructor() {
        super();
        var highscores = require('../highscore.json');
		this.state = {
			items: highscores.highscores,
			latestScore: 'None',
			dataPassed: 'no'
		}
		this.goBack= this.goBack.bind(this);
	}
	
	renderRow(task){
		return(
			<TouchableHighlight
				style = {styles.button}
				underlayColor = "white"
			>
				<Text style={styles.title}>{Object.keys(task.item)}: {task.item[Object.keys(task.item)]} pts</Text>
			</TouchableHighlight>
		)
	}
	
	goBack(){
		console.log("go back");
	}
	
	componentDidMount(){
		var highscores = require('../highscore.json');
		var topFive = [];
		for(var index= 0; index < highscores.highscores.length && index < 6; index++){
			topFive.push(highscores.highscores[index]);
		}
		
		this.setState({
			items: topFive
		})
		
	}
    

    render() {
        return (
			<View style={styles.gameScreen}>
				<Text style={styles.mainTitle}>Highscores</Text>
				<View style={styles.listContainer}>
					<FlatList
						data = {this.state.items}
						renderItem = {this.renderRow}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
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
    },
	mainTitle: {
        position: 'absolute',
        top: 0,
        margin: 'auto',
        color: 'white',
        fontWeight: "900",
        fontSize: 72,
        textShadowColor: 'rgba(150, 150, 150, 0.75)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 12
    },
	listContainer:{
		position: 'absolute',
		top: 100,
		width: '100%'
	},
	button: {
		height: 40,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderColor: 'black',
		borderWidth: 3,
		borderRadius: 8,
		marginBottom: 5,
		marginTop: 5,
		width: '100%',
		height: 45,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	title: {
		fontSize: 25,
		textAlign: 'center'
	}
})