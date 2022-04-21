import './Mixer.css';
import ColorCard from '../ColorCard/ColorCard';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Mixer({ user }) {

  const [backgroundColor, setBackgroundColor] = useState('')
  const [colorName, setColorName] = useState('')
  const [divType, setDivType] = useState(true)
  const [addDisable, setAddDisable] = useState(false)
  const [colorArray, setColorArray] = useState([]) 
  const [colorAddArray, setColorAddArray] = useState([]) 
  const [colorOptions, setColorOptions] = useState(["#FFED00","#FF0000","#FF00AB","#0047AB","#00EDFF","#00B500","#FFFFFF","#000000"])
  

  function onDivClick() {
    setDivType(divType => !divType)
}

  function cutHex(hex){
    return hex.substring(1,7);
  }
  function hexToR(hex){
    return parseInt((cutHex( hex )).substring( 0, 2 ), 16 )
  }
  function hexToG(hex){
    return parseInt((cutHex( hex )).substring( 2, 4 ), 16 )
  }
  function hexToB(hex){
    return parseInt((cutHex( hex )).substring( 4, 6 ), 16 )
  }
  function hexConvert(red, green, blue){
    return "#"+((1<<24)+(red<<16)+(green<<8)+ blue).toString(16).slice(1);
  }

  function averageColors( colorArray ){
    let red = 0, green = 0, blue = 0;

    for ( let i = 0; i < colorArray.length; i++ ){
        red += hexToR( "" + colorArray[ i ] + "" );
        green += hexToG( "" + colorArray[ i ] + "" );
        blue += hexToB( "" + colorArray[ i ] + "" );
    }

    //Average RGB
    red = Math.round(red/colorArray.length);
    green = Math.round(green/colorArray.length);
    blue = Math.round(blue/colorArray.length);

    console.log(red + ", " + green + ", " + blue);

    let rgbColor = "rgb("+ red +","+ green +","+ blue +")"
    let hexColor = hexConvert(red,green,blue)
    console.log(hexColor)
    return hexColor
  }

  function textColor(color) {
    let red = 0, green = 0, blue = 0;
    
    red += hexToR( "" + color + "" );
    green += hexToG( "" + color + "" );
    blue += hexToB( "" + color + "" );
    
    let hsp = Math.sqrt(
        0.299 * (red * red) +
        0.587 * (green * green) +
        0.114 * (blue * blue)
    );

    return hsp > 127.5 ? "#2B2B2B" : "#CFCFCF"
}


  
  let URL = `https://www.thecolorapi.com/id?format=json&hex=${backgroundColor.slice(1,)}`

  useEffect(() => {
    fetch(URL)
    .then((r) => r.json())
    .then((data) => setColorName(data.name.value)
    );
  }, [averageColors])

  const colorPalette = colorOptions.map((color) => {
    return <ColorCard 
    color={color} 
    setBackgroundColor={setBackgroundColor}
    backgroundColor={backgroundColor} 
    averageColors={averageColors} 
    setColorArray={setColorArray} 
    colorArray={colorArray}
    cutHex={cutHex}
    hexToR={hexToR}
    hexToG={hexToG}
    hexToB={hexToB}
    textColor={textColor}
    />
  })
  let backgroundBoolean = colorArray.length <= 0 ? "transparent" : `${backgroundColor}`
  let colorInfoBoolean = colorArray.length <= 0 ? "hidden" : "visible"
  let colorBarPercentage = ((1/colorArray.length)*99)
  let colorAddBarPercentage = ((1/colorAddArray.length)*100)

  let saveTernary = user ? <button onClick={handlePaletteSave}>Save Palette</button> : <h2>Sign In To Save Palettes</h2>

  async function handleReset() {
    setColorArray([])
    setBackgroundColor(averageColors(colorArray))
    await setColorOptions([])
    setColorOptions(["#FFED00","#FF0000","#FF00AB","#0047AB","#00EDFF","#00B500","#FFFFFF","#000000"])
  }

  function handleAdd() {
    colorAddArray.push({
      name : colorName,
      hexColor : backgroundColor
    })
    let colorAdded = (colorAddArray.map((color) => {
      return color.hexColor.includes(backgroundColor)
    }))
    let addBool = (arr) => arr.every(value => value === false)
    let addTernary = !(addBool(colorAdded))
    setAddDisable(addTernary)
    console.log(colorAddArray)
  }

  useEffect(() => {
    let colorAdded = (colorAddArray.map((color) => {
      return color.hexColor.includes(backgroundColor)
    }))
    let addBool = (arr) => arr.every(value => value === false)
    let addTernary = !(addBool(colorAdded))
    setAddDisable(addTernary)
  }, [backgroundColor])

  function handlePaletteSave(e) {
    e.preventDefault();
    const saveDetails = {
      palette : colorAddArray
    }
    axios.post("/palettes", saveDetails)
      .then(r => {
        console.log(r)
        setColorAddArray([])
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
          alert(error.response.data.errors)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  }

  let paletteDisplay = divType ? 
  null : 
  <div className='savedColorsHolder'>
    <div className='addedColors'>
      {divType ? null : colorAddArray.map((color) => {
                return <div className='currentPalette' style ={{ "backgroundColor" : color.hexColor, "width" : `${colorAddBarPercentage}vh` }}></div>
      })}
    </div>
    <div className='paletteHeader'>
      {divType ? null : saveTernary}
    </div>
    <div className='addedColorDetails'>
      {divType ? null : colorAddArray.map((color) => {
                return <div className='currentPaletteDetails' style ={{ "backgroundColor" : color.hexColor }}>
                  <h3 className='colorDetails' style={{ "color" : textColor(color.hexColor)}}>{color.name}</h3>
                  <h5 className='colorDetails1' style={{ "color" : textColor(color.hexColor)}}>{color.hexColor.toUpperCase()}</h5>
                </div>
      })}
    </div>
  </div>

    return (
      <React.Fragment>
          {paletteDisplay}
          <div className={divType ? "aRandomName" : "aRandomName show-palette-active" }>
            <div className="displaycolor">
              <div className="background_display">
                <div>
                  <button className='showPalette' onClick={onDivClick}>Show Palettes</button>
                </div>
                <img className="background_display1" style={{ "backgroundColor" : backgroundBoolean }} src={require("./Transparentcopy.png")}/>
                <div className="color-Info" style={{ "visibility" : colorInfoBoolean, "color" : textColor(backgroundColor)}}>
                  <h2 className='fontweight1'>{backgroundColor.toUpperCase()}</h2>
                  <h5>{colorName}</h5>
                  <h5 className='fontweight'>RGB: {hexToR(backgroundColor)}, {hexToG(backgroundColor)}, {hexToB(backgroundColor)}</h5>
                  <h5 className='fontweight'>Opacity: 100%</h5>
                  <button disabled={addDisable} onClick={handleAdd}>{addDisable ? "ADDED" : "ADD" }</button> <button onClick={handleReset}>RESET</button>
                </div>
              </div>
            </div>
            <div className='colorpercentage' style={{ "backgroundColor" : backgroundBoolean }}>
              {colorArray.map((color) => {
                return <div className='colorpercentage1' style ={{ "backgroundColor" : color, "width" : `${colorBarPercentage}vh` }}></div>
              }).sort()}
            </div>
            <div className='holder'>
            {colorPalette.length === 0 ? <p>no results</p> :colorPalette}
            </div>
          </div>
      </React.Fragment>
    )
  }
  
  export default Mixer;