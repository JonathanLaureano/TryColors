import './SideNavBar.css';
import React from 'react'

function SideNavBar() {

    return (
      <React.Fragment>
        <div className='full-nav'>
            <img className='logo' src={require("./TryColorsLogo.png")} />
            <div className='nav-space'>
                <span className='nav-title'>WORKSPACE</span>
            </div>
            <div>
                <a className="nav-link" href="/">Mixer</a>
                <a className="nav-link" href="/Game">Game</a>
            </div>
            <div className='nav-space'>
                <span className='nav-title'>ACCOUNT</span>
            </div>
            <div>
                <a className="nav-link" href="/SignIn">Sign In</a>
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