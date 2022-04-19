import './ColorCard.css';
import React, { useState } from 'react'

function ColorCard({ color, setBackgroundColor, averageColors , setColorArray, colorArray, hexToR, hexToG, hexToB, textColor }) {

    const[parts, setParts] = useState(0)
    function handleClick() {
        setBackgroundColor(averageColors([...colorArray, color]))
        setColorArray([...colorArray, color])
        setParts(parts + 1)
    }
    function chickenwing(){ 
        setParts(parts - 1)
        setColorArray(colorArray.filter((x, index) => index!=colorArray.indexOf(color)))
        setBackgroundColor(averageColors(colorArray.filter((x, index) => index!=colorArray.indexOf(color))))
    }

    let subtractBoolean = parts <= 0 ? "hidden" : "visible"

    let percentage = Math.round((parts/colorArray.length)*100)


    return (
      <React.Fragment>
          <div className='palette'>
            <div className='colorholder'>
                <h4 className='percentage'>{percentage ? `${percentage}%` : null}</h4>
                <div className='circle' style={{ "backgroundColor" : `${color}` }} onClick={handleClick}>
                    <h3 className='colorPart' style={{ "color" : `${textColor(color)}`}}> {parts}</h3>
                </div>
                <div>
                    <p>{color}</p>
                </div>
                <div className='subtractcircle' style={{ "backgroundColor" : "grey", "visibility" : subtractBoolean }}>
                    <h2 className='colorPart1' onClick={chickenwing}>_</h2>
                </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
  
  export default ColorCard;