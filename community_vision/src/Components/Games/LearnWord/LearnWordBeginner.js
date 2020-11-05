import React from 'react';
import '../../../App.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Container } from '@material-ui/core';
import {charToMorse, morseToChar} from "./../charMorseConv";
import useSound from 'use-sound';

/*
* Game that shows a picture and word that associates with that picture
* The user have to put in the correct sequence of morse code for the first letter
*
* 
* Created : 10/18/2020
* Modified: 10/11/2020
*/

//Variables for time
var t;
var resetTimer = 1500; //reset timer in milliseconds


function LearnWordBeginner () {
    //Get the data
    var gameData = require('./WordGameData.json');

    //current letters
    var [correct, setCorrect] = React.useState('');
    //Track user input
    var [input, setInput] = React.useState('');
    
    //Get current character from user input
    var output = morseToChar(input);

    //Index to track the current word
    var [gameIndex, setGameIndex] = React.useState(0);

    //Get the image source
    var img = require('' + gameData[gameIndex].imagePath);

    //Keeping track of current letter in current word
    //var [wordIndex, setWordIndex] = React.useState(0);

    //Word that the user needs to type
    //var [currentWord, setCurrentWord] = React.useState(gameData[gameIndex].name);
    var currentWord = gameData[gameIndex].name;

    //Current letter to be type(first letter)
    var currentLetter = currentWord[0];

    //Current morse code the user is typing                  
    var currentMorse = charToMorse(currentLetter);

    //Get the sound of current word
    var soundSrc = require('./WordSound/' + currentWord.toLowerCase() + '.flac');
    var [playCurrWordSound] = useSound(soundSrc);

    //Reset input after 1.5 second if no new input is being enter
    clearTimeout(t);
    t = setTimeout(function(){
        setInput('');
    }, resetTimer);

    //Reset input if the length is greater than 6
    if (input.length > 6){
        setInput('');
    }

    //Check for matching current morse sequence to current letter
    if (input === currentMorse) {
        //Play current sound of word
        playCurrWordSound();
        //Move to the next word
        setGameIndex(prevState => prevState + 1);
        //Reset inputs
        setCorrect('');
        setInput('');
    }

    // tracks keycodes for space button  and enter button input 
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode === 32) {
            setInput(input + '•');
        } else if (evt.keyCode === 13) {
            setInput(input + '-');
        }
    };

    return (
        <div style={{backgroundColor: '#01214f', height: '90vh', width: '100vw', display: 'grid', gridTemplate: '1fr 10fr 7fr / 1fr', gridTemplateAreas: '"top" "middle" "bottom'}}>
            <div style={{gridArea: 'middle'}}>
                <div>
                    <Container>
                        <img src={img} style={{width: '15%', height: '10%', padding: 0}} />
                        <Grid container justify='center'>
                            <Grid>
                                <p style={{color: '#00FF00', fontSize: 60, padding: 0}}>{correct}</p>
                            </Grid>
                            <Grid>
                                <p style={{color: '#ffaba6', fontSize: 60, padding: 0, textDecoration: 'underline'}}>{currentLetter}</p>
                            </Grid>
                            <Grid>
                                <p style={{color: '#ffaba690', fontSize: 60, padding: 0}}>{currentWord.substr(1)}</p>
                            </Grid>
                        </Grid>
                        <p style={{lineHeight: 0, color: '#ffaba6', fontSize: '7vh'}}>{currentMorse}</p>
                    </Container>
                </div>
            </div>
            <div style={{gridArea: 'bottom'}}>
                <Container>
                    <Grid container justify='center' spacing={0}>
                        <Grid item xs={3} sm={2}>
                            <p style={{lineHeight: 0, color: '#ffaba6', fontSize: '6vh'}}>{input}</p>
                        </Grid>
                        <Grid item xs={0}>
                            <p style={{lineHeight: 0, color: '#ffaba6', fontSize: '6vh'}}>|</p>
                        </Grid>
                        <Grid item xs={3} sm={2}>
                            <p style={{lineHeight: 0, color: '#ffaba6', fontSize: '6vh'}}>{output}</p>
                        </Grid>
                    </Grid>
                    <Grid container justify='center' spacing={2}>
                        <Grid item xs={4}>
                            <Card>
                                <CardActionArea>
                                    <button id="dotButton" style={{backgroundColor: '#ffaba6', width: '100%', height: '10vh', fontSize: '5vh'}} onClick={function(){
                                            setInput(input + '•');
                                    }}>.</button>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardActionArea>
                                    <button id="dashButton" style={{backgroundColor: '#ffaba6', width: '100%', height: '10vh', fontSize: '5vh'}} onClick={function(){
                                        setInput(input + '-');
                                    }}>-</button>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

function sleep(ms) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < ms);
}

export default LearnWordBeginner