import './Mixer.css';
import ColorCard from '../ColorCard/ColorCard';
import React, { useEffect, useState } from 'react'

function Mixer() {

  const [backgroundColor, setBackgroundColor] = useState('')
  const [colorName, setColorName] = useState('')

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




  const [colorArray, setColorArray] = useState([])  
  const [colorOptions, setColorOptions] = useState(["#FFED00","#FF0000","#FF00AB","#0047AB","#00EDFF","#00B500","#FFFFFF","#000000"])
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

  async function handleReset() {
    setColorArray([])
    setBackgroundColor(averageColors(colorArray))
    await setColorOptions([])
    setColorOptions(["#FFED00","#FF0000","#FF00AB","#0047AB","#00EDFF","#00B500","#FFFFFF","#000000"])
  }

    return (
      <React.Fragment>
          <div>
            <div className='displaycolor'>
              <div className="background_display" >
                <div>
                  <button className='showPalette'>Show Palettes</button>
                </div>
                <img className="background_display1" style={{ "backgroundColor" : backgroundBoolean }} src={require("./Transparentcopy.png")}/>
                <div className="color-Info" style={{ "visibility" : colorInfoBoolean, "color" : textColor(backgroundColor)}}>
                  <h2 className='fontweight1'>{backgroundColor.toUpperCase()}</h2>
                  <h5>{colorName}</h5>
                  <h5 className='fontweight'>RGB: {hexToR(backgroundColor)}, {hexToG(backgroundColor)}, {hexToB(backgroundColor)}</h5>
                  <h5 className='fontweight'>Opacity: 100%</h5>
                  <button>ADD</button> <button onClick={handleReset}>RESET</button>
                </div>
              </div>
            </div>
            <div className='colorpercentage' style={{ "backgroundColor" : backgroundBoolean }}>
              {colorArray.map((color) => {
                return <div className='colorpercentage1' style ={{ "backgroundColor" : color, "width" : `${colorBarPercentage}vh` }}></div>
              })}
            </div>
            <div className='holder'>
            {colorPalette.length === 0 ? <p>no results</p> :colorPalette}
            </div>
          </div>
      </React.Fragment>
    )
  }
  
  export default Mixer;