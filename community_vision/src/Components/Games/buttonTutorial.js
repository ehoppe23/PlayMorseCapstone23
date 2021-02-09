import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../../App.css';
import useSound from 'use-sound';
import dashSound from '../Assets/Sounds/dash.mp3'
import dotSound from '../Assets/Sounds/dot.mp3'
import {animated} from 'react-spring';
import {initial, Buttons, resetInputTime, resetInputLength} from "./Common/Functions";

var t;

const ButtonsTutorial = forwardRef((props, ref) => {
    var [input, setInput] = React.useState('');
    const [volume, setVolume] = useState(() => initial('volume'));
    const [size, setSize] = useState(() => initial('size'));
    const [speed, setSpeed] = useState(() => initial('speed'));
    const [backgroundColor, setBackgroundColor] = useState(() => initial('backgroundColor'));
    const [buttonColor, setButtonColor] = useState(() => initial('buttonColor'));
    const [fontColor, setFontColor] = useState(() => initial('fontColor'));
    const resetTimer = speed * 1000; //reset timer in milliseconds
    const [playDash] = useSound(
        dashSound,
        { volume: volume / 100 }
    );
    const [playDot] = useSound(
        dotSound,
        { volume: volume / 100 }
    );
    const fSize = size + 'vh';
    const sfSize = size / 3 + 'vh';

    resetInputLength(input, setInput);
    clearTimeout(t);
    t = resetInputTime(t, input, setInput, resetTimer);

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 32) {
            setInput(input + '•');
            playDot();
        } else if (evt.keyCode === 13) {
            setInput(input + '-');
            playDash();
        }
    };

    useImperativeHandle(
        ref,
        () => ({
            update() {
                setVolume(initial('volume'));
                setSize(initial('size'));
                setSpeed(initial('speed'));
                setBackgroundColor(initial('backgroundColor'));
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
            <div style={{gridArea: 'top'}}>
                <div>
                    <animated.h1 style={{
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: fSize
                    }}>{input}</animated.h1>
                </div>
            </div>

            <Buttons
                fontColor={fontColor}
                backgroundColor={backgroundColor}
                buttonColor={buttonColor}
                volume={volume}
                input={input}
                newInput={setInput}
            />
        </div>
    );
})

export default ButtonsTutorial;
