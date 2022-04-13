import './Mixer.css';
import ColorCard from '../ColorCard/ColorCard';
import React, { useState } from 'react'

function Mixer() {

  const [backgroundColor, setBackgroundColor] = useState('')

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
    red = (red/colorArray.length);
    green = (green/colorArray.length);
    blue = (blue/colorArray.length);

    console.log(red + ", " + green + ", " + blue);

    let rgbColor = "rgb("+ red +","+ green +","+ blue +")"
    let hexColor = hexConvert(red, blue, green)
    console.log(hexColor)
    return hexColor 
  }


  const [colorArray, setColorArray] = useState([])

  function backgroundColorRender() {
    setBackgroundColor(averageColors(colorArray))
  }

  
  const colorOptions = ["#FFED00","#FF0000","#FF00AB","#0047AB","#00EDFF","#00B500","#FFFFFF","#000000"]
  const colorPalette = colorOptions.map((color) => {
    return <ColorCard color={color} backgroundColorRender={backgroundColorRender} setColorArray={setColorArray} colorArray={colorArray} />
  })

    return (
      <React.Fragment>
          <h1 className='nuts'>You've Pissed Me Off</h1>
          <div>
            <div className='displaycolor'>
              <div className="background_display" >
                <img className="background_display1" style={{ "backgroundColor" : `${backgroundColor}` }} src={require("./Transparentcopy.png")}/>
              </div>
            </div>
            <div className='holder'>
            {colorPalette.length === 0 ? <p>no results</p> :colorPalette}
            </div>
          </div>
      </React.Fragment>
    )
  }
  
  export default Mixer;