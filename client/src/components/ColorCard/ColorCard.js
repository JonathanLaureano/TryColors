import './ColorCard.css';
import React, { useState } from 'react'

function ColorCard({ color, setBackgroundColor, averageColors , setColorArray, colorArray, hexToR, hexToG, hexToB }) {


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

        return hsp > 127.5 ? "black" : "white"
    }

    const[parts, setParts] = useState(0)
    function handleClick() {
        setBackgroundColor(averageColors([...colorArray, color]))
        setColorArray([...colorArray, color])
        console.log(colorArray)
        setParts(parts + 1)
    }

    return (
      <React.Fragment>
          <div className='palette'>
            <div className='colorholder'>
                <div className='circle' style={{ "backgroundColor" : `${color}` }} onClick={handleClick}>
                    <h3 className='colorPart' style={{ "color" : `${textColor(color)}`}}> {parts}</h3>
                </div>
                <div>
                    <p>{color}</p>
                </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
  
  export default ColorCard;