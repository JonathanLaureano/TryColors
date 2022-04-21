import './UserPalette.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserPalette({palette}) {

    const color = palette.map(color => {
        return <div className="easel" key={color} style={{backgroundColor: `${color.hexColor}`, width: "100%", height: "100px"}}>
        </div>
    })
    console.log(color)
    return (
          <div className="paint" style={{display: "flex", flexDirection: "row", width: "100%"}}>
          {color}
          </div>
    )
  }
  
  export default UserPalette;