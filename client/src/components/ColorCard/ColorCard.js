import './ColorCard.css';
import React, { useState } from 'react'

function ColorCard({ color, setBackgroundColor, averageColors , setColorArray, colorArray }) {

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
                    <h3 className='colorPart'>{parts}</h3>
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