import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import logo from './logo.png'
import pic from './settings.png'
import { useSpring, animated } from 'react-spring'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Container } from '@material-ui/core';
import Settings from './Settings';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from "react-router-dom";
/*
* Nav.js
* Contains Logo (home button), About, Instructions, and Settings Pages
*/
const Nav = forwardRef((props, ref) => {

  const history = useHistory();
  function moveTo(input) {
    history.push(input);
  }

  var [dropdownState, setDropdownState] = useState(false);
  const toggle = (newValue) => {
    setDropdownState(newValue);
  };
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: dropdownState ? 1 : 0 },
    config: { duration: 500 }
  })
  var navbarColor = '#FFFFFF'

  const dropdownRef = useRef();

  const updateDropdown = (value) => {
    dropdownRef.current.update();
  }

  useImperativeHandle(
    ref,
    () => ({
      update() {
        updateDropdown();
      }
    }),
  )

  return (
    <div>
      <div style={{
        gridArea: 'header',
        position: 'relative',
        zIndex: 4,
        display: 'flex',
        justifContent: 'space-around',
        alignItems: 'center',
        minHeight: '14vh',
        background: navbarColor,
        color: 'white'
      }}>
        <Link style={{height: '9vh', paddingLeft: '1.5vw'}} to="/">
            <CardActionArea>
            <img style={{ height: '9vh', cursor: 'pointer', userSelect: 'none', paddingLeft: '1.5vw' }} src={logo} alt={logo}></img>
            </CardActionArea>
        </Link>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          listStyleType: 'none'
        }}>
          <Container>
            <Hidden smDown>
              <Grid container direction='row' justify='flex-start' alignItems='center' spacing={2}>
                <Grid item xs={1} />
                <Grid item xs={2}>
                  <Link style={{ textDecoration: 'none' }} to="/about">
                    <Card style={{ height: '5vh', width: '25vh', borderRadius: '20vh', backgroundColor: '#21AAA4' }}>
                      <CardActionArea>
                        <div style={{ height: '5vh', width: '25vh', borderRadius: '20vh',color: 'white', fontSize: '4vh' }}>
                          About
                        </div>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={2}>
                  <Link style={{ textDecoration: 'none' }} to="/GettingStarted">
                    <Card style={{ height: '5vh', width: '25vh', borderRadius: '20vh', backgroundColor: '#21AAA4' }}>
                      <CardActionArea>
                        <div style={{ height: '5vh', width: '25vh', borderRadius: '20vh', color: 'white', fontSize: '4vh' }}>
                          Instructions
                        </div>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={2}>
                  <Link style={{ textDecoration: 'none' }} to="/games">
                    <Card style={{ height: '5vh', width: '25vh', borderRadius: '20vh', backgroundColor: '#21AAA4' }}>
                      <CardActionArea>
                        <div style={{ height: '5vh', width: '25vh', borderRadius: '20vh',color: 'white', fontSize: '4vh' }}>
                          Games
                        </div>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              </Grid>
            </Hidden>
          </Container>
        </div>
        <Card style={{
          position: 'absolute',
          borderRadius: '10px',
          height: '9.25vh',
          width: '9.25vh',
          right: '1.5vw',
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#21AAA4',
          color: 'white'
        }}
          onMouseUp={() => {
            if (window.location.href.slice(-8) !== 'settings') {
              props.updateAppState(true);
              toggle(!dropdownState);
            }
          }}>
          <CardActionArea>
            <img style={{ width: '8vh' }} src={pic} alt={pic}></img>
          </CardActionArea>
        </Card>

      </div>
      <div id="root">
      </div>
      <animated.div style={{
        gridArea: 'header',
        display: 'flex',
        position: 'relative',
        zIndex: 4,
        top: '-1vh',
        height: 0,
        left: x.interpolate({ range: [0, 1], output: ['100vw', '0vw'] }),
        opacity: 1//x.interpolate({ range: [0, 1], output: [0, 0.95] })
      }}>
        <Card onMouseUp={() => {
          props.updateAppState(false);
          toggle(!dropdownState);
        }}>
          <CardActionArea style={{
            fontSize: '10vh',
            position: 'absolute',
            background: 'white',
            top: '-15vh',
            height: '15vh',
            width: '100%',
            zIndex: 5,
            cursor: 'pointer',
            userSelect: 'none',
            textAlign: 'right',
          }}>
            X
          </CardActionArea>
        </Card>
        <Card onMouseUp={() => {
          props.updateAppState(false);
          toggle(!dropdownState);
        }} style={{ backgroundColor: 'white' }}>
          <CardActionArea style={{
            fontSize: '10vh',
            position: 'absolute',
            top: '-15vh',
            height: '15vh',
            width: '100%',
            zIndex: 5,
            cursor: 'pointer',
            userSelect: 'none',
            textAlign: 'center',
          }}>
            <img style={{ height: '8vh' }} src={pic} alt={pic}></img>
            Settings
          </CardActionArea>
        </Card>
        <Grid container style={{ paddingTop: '1.25vh', zIndex: 6 }}>
          <Grid item xs={12} style={{ background: 'white' }}>
            <Hidden mdUp>
              <Grid container direction='row' justify='flex-start' alignItems='center' spacing={1} style={{ paddingLeft: '8vh', paddingRight: '8vh' }}>
                <Grid item xs={4}>
                  <Card style={{ borderRadius: '20vh' }} onMouseUp={() => {
                    moveTo('/about');
                    toggle(!dropdownState);
                  }}>
                    <CardActionArea>
                      <div style={{ color: 'black', fontSize: '4vh', textDecoration: 'none' }}>
                        About
                      </div>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card style={{ borderRadius: '20vh' }} onMouseUp={() => {
                    moveTo('/gettingStarted');
                    toggle(!dropdownState);
                  }}>
                    <CardActionArea>
                      <div style={{ color: 'black', fontSize: '4vh', textDecoration: 'none' }}>
                        Instructions
                      </div>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card style={{ borderRadius: '20vh'}} onMouseUp={() => {
                    moveTo('/games');
                    toggle(!dropdownState);
                  }}>
                    <CardActionArea>
                      <div style={{ color: 'black', fontSize: '4vh', textDecoration: 'none' }}>
                        Games
                      </div>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '-1.4vh' }}>
            <Settings updateSettingsPageState={() => void 0}
              updateNavState={props.updateAppState}
              ref={dropdownRef} />
          </Grid>
        </Grid>
      </animated.div>
    </div>
  );
})


export default Nav;
