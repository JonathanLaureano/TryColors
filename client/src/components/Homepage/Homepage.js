import './Homepage.css';
import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import SideNavBar from '../SideNavBar/SideNavbar';
import Mixer from '../Mixer/Mixer';
import Game from '../Game/Game';
import SignIn from '../SignIn/SignIn';
import Colors from '../Colors/Colors';
import Palettes from '../Palettes/Palettes';

function HomePage() {

    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    

    return (
        <>
            <div className='sidebarleft'>
                <SideNavBar user={user} setUser={setUser} setSignedIn={setSignedIn} />
            </div>
            <div className='main'>
                <Switch>
                    <Route exact path='/'>
                        <SignIn setUser={setUser} setSignedIn={setSignedIn}/>
                    </Route>
                    <Route path='/Game'>
                        <Game/>
                    </Route>
                    <Route path='/Mixer'>
                        <Mixer user={user}/>
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