import './Palettes.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserPalette from '../../UserPalette/UserPalette';

function Palettes() {

    const[colorObject, setColorObject] = useState([]);

    useEffect(() => {
      // fetch("/me")
      //   .then((r) => {
      //     if (r.ok) {
      //       r.json().then((data) => {
      //         setColorObject(data.palettes)
      //       }
      //     );
      //   }
      // });

      async function handleFetch() {
        const userData = await axios.get("/me")
        const paletteData = await axios.get("/palettes")
        setColorObject(paletteData.data.filter(user => user.user_id === userData.data.id))
      }
      handleFetch()
    }, [])


const userPalette = colorObject.map(palette => <UserPalette key={palette.id} palette={palette.palette} />)

    // let palette = colorObject.map(palette => {
    //   console.log(`${palette}`)
    //   // return <div key={palette.id} className='currentPaletteDetails' style ={{backgroundColor: `#${palette.palette.hexColor}`}}></div>
    // })

    // console.log(palette)

    // let palette = colorObject ? colorObject.map((palette) => {
    //   return palette.map((color) => {
    //     return <div className='currentPaletteDetails' style ={{ "backgroundColor" : color.hexColor }}></div>
    //   })
    // }) : null


    return (
      <React.Fragment>
          <div className='savedColorsHolder1'>
            <div className='paletteHeader1'>
              <div>
                <a className='paletteright' href="/Mixer">New Palette +</a>
              </div>
            </div>
            <div className='addedColorDetails1'>
              {userPalette}
            </div>
          </div>
      </React.Fragment>
    )
  }
  
  export default Palettes;