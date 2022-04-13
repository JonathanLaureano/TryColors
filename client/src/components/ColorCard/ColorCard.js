import './ColorCard.css';
import React from 'react'

function ColorCard({ color, colorArray, backgroundColorRender }) {


    function handleClick() {
        colorArray.push(color)
        console.log(colorArray)
        backgroundColorRender()
        let parts = document.querySelector(".colorPart")
        let partsCount = parseInt(parts.textContent) + 1
        parts.textContent = partsCount
    }

    return (
      <React.Fragment>
          <div className='palette'>
            <div className='colorholder'>
                <div className='circle' style={{ "backgroundColor" : `${color}` }} onClick={handleClick}>
                    <h3 className='colorPart'>0</h3>
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