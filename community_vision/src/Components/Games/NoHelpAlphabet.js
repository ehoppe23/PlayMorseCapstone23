import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../../App.css';
import {charToMorse, morseToChar} from "./charMorseConv";
import { useSpring, animated } from 'react-spring';
import useSound from 'use-sound';
import dashSound from '../Assets/Sounds/dash.mp3'
import dotSound from '../Assets/Sounds/dot.mp3'
import {initial, Buttons, resetInputTime, resetInputLength, BackButton} from "./Common/Functions";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import spacebar from "../Assets/Images/spacebar.png";
import enterButton from "../Assets/Images/enterButton.png";
import sounds from "./LetterSounds"

import {Transition} from "react-spring/renderprops";
import Card from "@material-ui/core/Card";
import {useHistory} from "react-router-dom";

import correctFX from "../Assets/Sounds/correct.mp3";



var t;
var resetTimer = 1500; //reset timer in milliseconds
var list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var textIndex = 0;

function updateTutorial() {
    var text = document.getElementById('tutorialText').innerHTML;
    var space = document.getElementById('spaceImage');
    var enter = document.getElementById('enterImage');

    if (textIndex == 0) {
        document.getElementById('tutorialText').innerHTML = 'This game consists of two buttons at the bottom of the page.';

        textIndex++;
    } else if (textIndex == 1) {
        document.getElementById('tutorialText').innerHTML = 'This button is used for the dots and can be accessed through the space button or by clicking here!';
        document.getElementById('dotButton').style.backgroundColor = "yellow";
        space.style.display = "block";
        textIndex++;
    } else if (textIndex == 2) {
        document.getElementById('dotButton').style.backgroundColor = document.getElementById('dashButton').style.backgroundColor;
        document.getElementById('tutorialText').innerHTML = 'This button is used for the dashes and can be accessed through the enter button or by clicking here!';
        document.getElementById('dashButton').style.backgroundColor = "yellow";
        space.style.display = "none";
        enter.style.display = "block";
        textIndex++;
    } else if (textIndex == 3) {
        document.getElementById('dashButton').style.backgroundColor = document.getElementById('dotButton').style.backgroundColor;
        document.getElementById('tutorialText').innerHTML = 'Enter the correct code for the current letter and move onto the next one. Have Fun Learning the Morse Alphabet!';
        document.getElementById('current').style.backgroundColor = "yellow";
        enter.style.display = "none";
        textIndex = 0;
    }
}

const NoHelpAlphabet = forwardRef((props, ref) => {
    const history = useHistory();
    function backToGames() {
        history.push("/games");
    }
    var [index, setIndex] = React.useState(0);
    var currentLetter = list[index];
    var currentMorse = charToMorse(currentLetter);
    var [input, setInput] = React.useState('');
    var output = morseToChar(input);
    const [anim, setAnim] = useState(true);
    const [volume, setVolume] = useState(() => initial('volume'));
    const [size, setSize] = useState(() => initial('size'));
    const [speed, setSpeed] = useState(() => initial('speed'));
    const [backgroundColor, setBackgroundColor] = useState(() => initial('backgroundColor'));
    const [buttonColor, setButtonColor] = useState(() => initial('buttonColor'));
    const [dashButtonColor, setDashButtonColor] = useState(() => initial('dashButtonColor'));
    const [dotButtonColor, setDotButtonColor] = useState(() => initial('dotButtonColor'));
    const [fontColor, setFontColor] = useState(() => initial('fontColor'));
    const resetTimer = speed*1000; //reset timer in milliseconds
    const [playDash] = useSound(
        dashSound,
        { volume: volume / 100 }
    );
    const [playDot] = useSound(
        dotSound,
        { volume: volume / 100 }
    );

    var soundSrc = sounds[currentLetter];
    const [playCurrentLetterSound] = useSound(
        soundSrc,
        { volume: volume / 100 }
    );

    const [playCorrectSoundFX] = useSound(
        correctFX,
        { volume: volume / 100}
    );
    const fSize = size +'vh';
    const sfSize = size/3 +'vh';
    var [startScreen, setStartScreen] = useState(true);
    var [endScreen, setEndScreen] = useState(false);

    resetInputLength(input, setInput);
    clearTimeout(t);
    t = resetInputTime(t, input, setInput, resetTimer);

    React.useEffect(() => {
        if (input === currentMorse) {
            playCorrectSoundFX();
            clearTimeout(t);
            setTimeout(() => {
                clearTimeout(t);
                playCurrentLetterSound();
                setTimeout(() => {
                    clearTimeout(t);
                    setAnim(!anim);
                    setInput('');
                    if (index != list.length - 1) {
                        setIndex(prevState => prevState + 1);
                    } else {
                        setIndex(0);
                        setEndScreen(true);
                    }
                }, resetTimer)
            }, resetTimer)
        }
    }, [input])

    // tracks keycodes for space button  and enter button input
    const [handleKeyDown, setHandleKeyDown] = useState(true);
    document.onkeydown = function (evt) {
        if (!handleKeyDown) return; //
        setHandleKeyDown(false); //
        evt = evt || window.event;
        if (evt.keyCode === 32) {
            if(startScreen){

            } else if(endScreen) {
                backToGames();
            } else {
                setInput(input + '???');
                playDot();
                document.getElementById('dotButton').focus();
            }
        } else if (evt.keyCode === 13) {
            if (startScreen) {
                setStartScreen(false);
            } else if (endScreen) {
                setEndScreen(false);
            } else {
                setInput(input + '-');
                playDash();
                document.getElementById('dashButton').focus();
            }
        }
    };

    document.onkeyup = function (evt) { //
        setHandleKeyDown(true); //
        document.activeElement.blur(); //
    }; //

    var d = 2000;
    if (!anim){
        d = 0;
        t = setTimeout(function(){
            setAnim(!anim)
        }, 100);
    }

    var { x } = useSpring({from: {x: 0}, x: anim ? 1 : 0, config: { duration: d } });

    useImperativeHandle(
        ref,
        () => ({
            update() {
                setVolume(initial('volume'));
                setSize(initial('size'));
                setSpeed(initial('speed'));
                setBackgroundColor(initial('backgroundColor'));
                setDashButtonColor(initial('dashButtonColor'));
                setDotButtonColor(initial('dotButtonColor'));
                setFontColor(initial('fontColor'));
                setButtonColor(initial("buttonColor"));
            }
        }),
    )

    return (
        <div style={{
            backgroundColor: backgroundColor,
            height: '90vh',
            width: '100vw',
            display: 'grid',
            gridTemplate: '8fr 8fr / 1fr',
            gridTemplateAreas: '"top" "middle" "bottom'
        }}>
            <Transition
                items={startScreen}
                duration={500}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                    toggle
                        ? props => <div style={{
                            position: 'absolute',
                            width: '100vw',
                            height: '90vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            ...props
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                            <Grid container direction='column' justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 1 }}>
                                <Grid item style={{ userSelect: 'none', cursor: 'default' }}>
                                    <Card>
                                        <h1 style={{
                                            marginBottom: '0vh',
                                            fontSize: '8vh'
                                        }}>Learn Morse Alphabet
                                        </h1>
                                        <br />
                                        <p style={{
                                            marginTop: '0vh',
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                            fontSize: '4vh'
                                        }}>Use your memory to type the Morse of all the letters in the alphabet.
                                        </p>
                                    </Card>
                                </Grid>
                                <br />
                                <Grid item style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button id = "start" style={{ fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                                onMouseDown={function () {
                                                    if (startScreen) {
                                                        setStartScreen(false);
                                                    }
                                                }}>
                                            Press Enter (dash) to Start
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }
            </Transition>
            <Transition
                items={endScreen}
                duration={500}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                    toggle
                        ? props => <div style={{
                            position: 'absolute',
                            width: '100vw',
                            height: '90vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            ...props
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                            <Grid container justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 1 }}>
                                <Grid item xs={9} style={{ userSelect: 'none', color: fontColor }}>
                                    <Card>
                                        <h1 style={{
                                            marginBottom: '0vh',
                                            fontSize: '8vh'
                                        }}>Yay!
                                        </h1>
                                        <br />
                                        <p style={{
                                            marginTop: '0vh',
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                            fontSize: '8vh',
                                            marginBottom: '0vh'
                                        }}>You have learned the alphabet in Morse without help.
                                        </p>
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button style={{ fontSize: '8vh', cursor: 'pointer', height: '100%', width: '100%' }}
                                                onMouseDown={function () {
                                                    backToGames();
                                                }}>
                                            Other Games (???)
                                        </button>
                                    </Card>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={4} style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button style={{ fontSize: '8vh', cursor: ' pointer', height: '100%', width: '100%' }}
                                                onMouseDown={function () {
                                                    setEndScreen(false);
                                                }}>
                                            More Practice (-)
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }
            </Transition>
            <div style={{gridArea: 'top'}}>
                <div style={{ position: 'absolute' }}>
                    <Container>
                        <BackButton />
                        <Grid container justify='left'>
                            <Grid item>

                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <div id="current">
                    <animated.h1 style={{lineHeight: 0,
                        color: fontColor,
                        fontSize: fSize,
                        opacity: x.interpolate({ range: [0, 1], output: [0, 1] })}}>{currentLetter}</animated.h1>
                </div>
            </div>
            <Buttons
                fontColor={fontColor}
                backgroundColor={backgroundColor}
                buttonColor={buttonColor}
                dotButtonColor={dotButtonColor}
                dashButtonColor={dashButtonColor}
                volume={volume}
                input={input}
                setInput={setInput}
            />
        </div>
    );
})

const Radio = () => {
    const [isToggled, setToggle] = useState(false);
    const menubg = useSpring({ background: isToggled ? "#6ce2ff" : "#ebebeb" });
    const { y } = useSpring({
        y: isToggled ? 180 : 0
    });
    const menuAppear = useSpring({
        transform: isToggled ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
        opacity: isToggled ? 1 : 0
    });

    return (
        <div style={{ position: "relative", width: "300px", margin: "0 auto" }}>
            <animated.button
                style={menubg}
                className="radiowrapper"
                onClick={() => setToggle(!isToggled)}
            >
                <div className="radio">
                    <p>Tutorial</p>
                    <animated.p
                        style={{
                            transform: y.interpolate(y => `rotateX(${y}deg)`)
                        }}
                    >
                        ???
                    </animated.p>
                </div>
            </animated.button>
            <animated.div style={menuAppear}>
                {isToggled ? <RadioContent /> : null}
            </animated.div>
        </div>
    );
};

const RadioContent = () => {
    return (
        <div className="radiocontent" >
            <a href="#" alt="Home">
            </a>
            <p id="tutorialText" value="Change Text">Welcome to the Advanced Alphabet game! </p>
            <img src={spacebar} alt="Spacebar" id="spaceImage" style={{ display: "none" }}></img>
            <img src={enterButton} alt="Enter Button" id="enterImage" style={{ display: "none" }}></img>
            <button onClick={function () {
                updateTutorial();
            }} style={{ fontSize: '5vh' }}>Next</button>
        </div>
    );
};

export default NoHelpAlphabet;