import './Homepage.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";
import SideNavBar from '../SideNavBar/SideNavbar';
import Mixer from '../Mixer/Mixer';
import Game from '../Game/Game';
import SignIn from '../SignIn/SignIn';
import Colors from '../Colors/Colors';
import Palettes from '../Palettes/Palettes';

function HomePage() {

    return (
        <>
            <div className='sidebarleft'>
                <SideNavBar />
            </div>
            <div className='main'>
                <Switch>
                    <Route exact path='/'>
                        <Mixer/>
                    </Route>
                    <Route path='/Game'>
                        <Game/>
                    </Route>
                    <Route path='/SignIn'>
                        <SignIn/>
                    </Route>
                    <Route path='/Colors'>
                        <Colors/>
                    </Route>
                    <Route path='/Palettes'>
                        <Palettes/>
                    </Route>
                </Switch>
            </div>
            <div className='sidebarright'>
            </div>
        </>
    )
  }
  
  export default HomePage;