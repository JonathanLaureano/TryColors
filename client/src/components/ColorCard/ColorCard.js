import './ColorCard.css';
import React from 'react'

function ColorCard({ color, averageColors }) {

    const colorArray = []

    function handleClick(color) {
        colorArray.push(color)
        averageColors(colorArray)
        let parts = document.querySelector(".colorPart")
        let partsCount = parseInt(parts.textContent) + 1
        parts.textContent = partsCount
    }

    return (
      <React.Fragment>
          <div className='palette'>
            <div className='colorholder'>
                <div className='circle' style={{ "backgroundColor" : `${color}` }} onClick={handleClick(`${color}`)}>
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