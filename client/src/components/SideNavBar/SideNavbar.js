import './SideNavBar.css';
import React from 'react'
import axios from 'axios'

function SideNavBar({ user, setSignedIn, setUser }) {

    let accountTitle = user ? <a className="nav-link" href="/Palettes">My Palettes</a> : <a className="nav-link1" href="/">Sign In</a>
    let logoutTernary = user ? <a className="nav-link1" onClick={handleLogOut}>Log Out</a> : null

    function handleLogOut() {
        axios.delete('/logout')
          .then(r => {
            setSignedIn(false);
            setUser(null);
        })
    }

    return (
      <React.Fragment>
        <div className='full-nav'>
            <div className='logodiv'>
                <img className='logo' src={require("./TryColorsLogo.png")} />   
            </div>
            <div className='nav-space'>
                <span className='nav-title'>WORKSPACE</span>
            </div>
            <div>
                <a className="nav-link" href="/Mixer">Mixer</a>
                <a className="nav-link" href="/Game">Game</a>
            </div>
            <div className='nav-space'>
                <span className='nav-title'>ACCOUNT</span>
            </div>
            <div>
                {accountTitle}
                {logoutTernary}
            </div>
            <div className='nav-space'>
                <span className='nav-title'>GALLERY</span>
            </div>
            <div>
                <a className="nav-link" href="/Colors">All Colors</a>
                <a className="nav-link" href="/Palettes">All Palettes</a>
            </div>
        </div>
      </React.Fragment>
    )
  }
  
  export default SideNavBar;