import React, { forwardRef, useState, useImperativeHandle } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';

import LearnAlphabetIMG from "./Games/LearnAlphabet.jpg" //test image (pig)
import dotsIMG from "./Games/Icons/dots.jpg"
import dashIMG from "./Games/Icons/dash.png"
import buttonsImg from "./Games/Icons/explore dot and dash.jpg"
import alphabetIMG from "./Games/Icons/learn morse patterns.jpg"
import abceyes from "./Games/Icons/learn morse alphabet.jpg"
import numbersIMG from "./Games/Icons/learn morse numbers.jpg"
import sandboxIMG from "./Games/Icons/sandbox letters.jpg"
import sandBocWords from "./Games/Icons/sandbox words.jpg"
import LearnABCIMG from "./Games/Icons/learn words.jpg"
import chooseLettersIMG from "./Games/Icons/choose your letters.jpg"
import needleImg from "./Games/Icons/learn words 2.jpg"
import raceLevel3 from "./Games/Icons/alphabet race game.jpg"
import stackABC from "./Games/Icons/learn morse alphabet 2.jpg"
import unicycleImg from "./Games/Icons/learn words 3.jpg"
import raceLevel4 from "./Games/Icons/alphabet race game 2.jpg"
import { initial } from "./Games/Common/Functions"
import { Container } from '@material-ui/core';

const Games = forwardRef((props, ref) => {
  const [backgroundColor, setBackgroundColor] = useState(() => initial('backgroundColor'));
  const [fontColor, setFontColor] = useState(() => initial('fontColor'));
  useImperativeHandle(
    ref,
    () => ({
      update() {
        setBackgroundColor(initial('backgroundColor'));
        setFontColor(initial('fontColor'));
      }
    }),
  )

  return (
    <div style={{
      backgroundColor: backgroundColor,
      position: 'relative',
      height: '90vh',
      width: '100vw',
      display: 'grid',
      gridTemplate: '1fr 4fr / 1fr',
      gridTemplateAreas: '"top" "bottom'
    }}>
      <Container maxWidth='x1' style={{ backgroundColor: backgroundColor, paddingBottom: '2vh' }}>
        <Grid container justify='left' space={4}>
         <Grid item xs={8} justify='left' style={{ height: '40%', paddingBottom: '6vh', paddingTop: '3vh'}}>
          </Grid>
        <h1 style={{ fontSize: '8vh', color: fontColor, position: 'absolute', left: '42%', padding: 0, paddingTop: '20px', paddingBottom: '50px', margin: '1vh', userSelect: 'none', cursor: 'default' }}>Games</h1>
      </Grid>
      </Container>


      <Link className='nav-link' to="/GamesBasics" style={{
        backgroundColor: backgroundColor
      }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: '#0cbfe9',
          borderColor: '#21AAA4',
          color: 'white',
        }}>Learn Morse Basics</button>
      </Link>

      <Link className='nav-link' to="/GamesLetters" style={{
        backgroundColor: backgroundColor
      }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: '#0cbfe9',
          borderColor: '#21AAA4',
          color: 'white',
        }}>Learn Morse Letters and Numbers</button>
      </Link>

      <Link className='nav-link' to="/GamesThemes" style={{
        backgroundColor: backgroundColor
      }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: '#0cbfe9',
          borderColor: '#21AAA4',
          color: 'white',
        }}>Themed Morse Games</button>
      </Link>

      <Link className='nav-link' to="/GamesWords" style={{
        backgroundColor: backgroundColor
      }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: '#0cbfe9',
          borderColor: '#21AAA4',
          color: 'white',
        }}>Learn Morse Words</button>
      </Link>

      <Link className='nav-link' to="/" style={{
        backgroundColor: backgroundColor
      }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: '#21AAA4',
          borderColor: '#21AAA4',
          color: 'white',
        }}>Go Back to Home</button>
      </Link>

      <Link className='nav-link' to="/" style={{
        backgroundColor: backgroundColor
      }} onMouseUp={() => {
               window.open('https://docs.google.com/forms/d/1-Fy6sjP-xcLqWLefGCBUbdbZIKBPwEkvyng9boBpO58/edit', '_blank');
            }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: '#21AAA4',
          borderColor: '#21AAA4',
          color: 'white',
        }}>Give us Feedback!</button>
      </Link>
    </div>

  );
})

class GameSelection extends React.Component {
  render() {
    var color;
    if (this.props.difficulty === 'Level 4') {
      color = '#FF0000'
    } else if (this.props.difficulty === 'Level 3') {
      color = 'yellow'
    } else if (this.props.difficulty === 'Level 2') {
      color = '#39ff14'
    } else if (this.props.difficulty === 'Level 1') {
      color = '#0cbfe9'
    }
    return (
      <div>
        <Link style={{ textDecoration: 'none' }} to={this.props.link}>
          <Card>
            <CardActionArea>
              <div style={{ width: '100%', paddingTop: '66.66%' }}>
                <img style={{ width: '100%', margin: '0%', padding: '0%', position: 'absolute', left: '0', top: '0' }} src={this.props.img} type="image/png" alt={LearnAlphabetIMG}/* this should be the default for if we don't have an image source*/ />
              </div>
              <p style={{ color: 'black', fontWeight: 'bold', margin: 0, padding: 0, display: 'block', backgroundColor: 'white', fontSize: '2.5vh' }} >{this.props.name}</p>
              <div style={{ backgroundColor: 'white' }}>
                <text style={{ color: 'black', fontWeight: 'bold', fontSize: '1.75vh' }}>{this.props.difficulty}</text>
              </div>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    )
  }
}

export default Games;