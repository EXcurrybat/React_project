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
			
            <View style={styles.fullScreen}>
				<Text style={styles.mainTitle}>Highscores</Text>
				<View style={styles.buttonContainer}>
					<Button
						title="Back"
						color='rgba(150, 150, 150, 0.75)'
						accessibilityLabel="go back to previous screen"
						onPress={this.goBack}
					/>
				</View>
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
        top: 0,
        margin: 'auto',
        color: 'white',
        fontWeight: "900",
        fontSize: 72,
        textShadowColor: 'rgba(150, 150, 150, 0.75)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 12
    },
	buttonContainer: {
		top: 100
	},
	listContainer:{
		position: 'absolute',
		top: 148,
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