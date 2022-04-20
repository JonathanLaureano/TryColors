import './Game.css';
import ColorCard from '../ColorCard/ColorCard';
import React, { useEffect, useState } from 'react'
import Transparentcopy from './Transparentcopy.png'

function Game() {

  const [backgroundColor, setBackgroundColor] = useState('')
  const [colorArray, setColorArray] = useState([])  
  const [colorOptions, setColorOptions] = useState(["#FFED00","#FF0000","#FF00AB","#0047AB","#00EDFF","#00B500","#FFFFFF","#000000"])
  const [targetNumber, setTargetNumber] = useState(0)

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

  function MatchPerc(color, color2) {
    let red = 0, green = 0, blue = 0, red2 = 0, green2 = 0, blue2 = 0;

    red += hexToR( "" + color + "" );
    green += hexToG( "" + color + "" );
    blue += hexToB( "" + color + "" );
    red2 += hexToR( "" + color2 + "" );
    green2 += hexToG( "" + color2 + "" );
    blue2 += hexToB( "" + color2 + "" );

    let diffRed   = Math.abs(red - red2);
    let diffGreen = Math.abs(green - green2);
    let diffBlue  = Math.abs(blue - blue2);

    let pctDiffRed   = diffRed   / 255;
    let pctDiffGreen = diffGreen / 255;
    let pctDiffBlue   = diffBlue  / 255;

    return 100 - Math.round(((pctDiffRed + pctDiffGreen + pctDiffBlue) / 3) * 100)

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

  let targets = ["#0058b3", "#ffd500", "#001533", "#db5531", "#00b6aa", "#333333", "#6db7bd", "#77613a"]
  let backgroundBoolean = colorArray.length <= 0 ? "transparent" : `${backgroundColor}`;
  let backgroundTypeBoolean = colorArray.length <= 0 ? `url(${Transparentcopy})` : null;
  let colorBarPercentage = ((1/colorArray.length)*99);
  let defaultTextColor = backgroundColor ? textColor(backgroundColor) : "#2B2B2B";
  let colorInfoBoolean = colorArray.length <= 0 ? "hidden" : "visible"
  let altDefaultTextColor = textColor(targets[targetNumber])
  let matches = backgroundColor ? MatchPerc(backgroundColor,targets[targetNumber]) : 0
  const targetFunc = () => {
    if (targetNumber === 7) {
      handleReset()
      return setTargetNumber(targetNumber * 0)
    } else {
      handleReset()
      return setTargetNumber(targetNumber + 1)
    }
  }
  

  async function handleReset() {
    setColorArray([])
    setBackgroundColor("")
    await setColorOptions([])
    setColorOptions(["#FFED00","#FF0000","#FF00AB","#0047AB","#00EDFF","#00B500","#FFFFFF","#000000"])
  }

    return (
      <React.Fragment>
          <div>
            <div className='displaycolor'>
              <div className="background_display4" >
                <div className="background_display2" style={{ "backgroundColor" : backgroundBoolean, "backgroundImage" : backgroundTypeBoolean }}>
                  <div className='TargetBox'>
                    <img className="TargetColor" style={{ "backgroundColor" : `${targets[targetNumber]}` }} src={require("./Transparentcopy.png")}/>
                  </div>
                </div>
                <div className="YourMix" style={{ "color" : defaultTextColor }}>
                  <h2 className='fontweight2'>Your Mix</h2>
                  <h4 className='fontweight2' style={{ "visibility" : colorInfoBoolean}}>Match: {matches}%</h4>
                </div>
                <div className="Target" style={{ "color" : altDefaultTextColor }}>
                  <h2 className='fontweight2'>Target</h2>
                  <h4 className='fontweight2' style={{ "visibility" : "hidden"}}>hidden</h4>
                </div>
                <div>
                  <button className='color-Info1' onClick={handleReset}>RESET</button>
                </div>
                <div>
                  <button className='color-Info2' onClick={targetFunc}>Next</button>
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
  
  export default Game;