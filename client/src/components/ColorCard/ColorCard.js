import './ColorCard.css';
import React from 'react'

function ColorCard() {

    function handleClick() {

    }

    return (
      <React.Fragment>
          <div className='palette'>
            <div className='colorholder'>
                <div className='circle color1' onClick={handleClick}>
                    <h3 className='colorPart'>0</h3>
                </div>
                <div>
                    <p>#FFED00</p>
                </div>
            </div>
            <div className='colorholder'>
                <div className='circle color2'>
                    <h3 className='colorPart'>0</h3>
                </div>
                <div>
                    <p>#FF0000</p>
                </div>
            </div>
            <div className='colorholder'>
                <div className='circle color3'>
                    <h3 className='colorPart'>0</h3>
                </div>
                <div>
                    <p>#FF00AB</p>
                </div>
            </div>
            <div className='colorholder'>
                <div className='circle color4'>
                    <h3 className='colorPart'>0</h3>
                </div>
                <div>
                    <p>#0047AB</p>
                </div>
            </div>
            <div className='colorholder'>
                <div className='circle color5'>
                    <h3 className='colorPart'>0</h3>
                </div>
                <div>
                    <p>#00EDFF</p>
                </div>
            </div>
            <div className='colorholder'>
                <div className='circle color6'>
                    <h3 className='colorPart'>0</h3>
                </div>
                <div>
                    <p>#00B500</p>
                </div>
            </div>
            <div className='colorholder'>
                <div className='circle color7'>
                    <h3 className='colorPart'>0</h3>
                </div>
                <div>
                    <p>#FFFFFF</p>
                </div>
            </div>
            <div className='colorholder'>
                <div className='circle color8'>
                    <h3 className='colorPart1'>0</h3>
                </div>
                <div>
                    <p>#000000</p>
                </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
  
  export default ColorCard;