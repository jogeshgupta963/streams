import React from 'react'
import logo from '../assets/logo2.png'
function Navbar() {
  return (
    <div className='bg-dark mh-25 text-white' style={{
        maxHeight:'7rem'
    }} >
        <img className='mh-25' style={{
            height:"300px",
            position:'relative',
            top:'-100px'
        }} src={logo} alt="hello" />
    </div>
  )
}

export default Navbar