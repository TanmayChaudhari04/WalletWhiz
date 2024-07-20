import React from 'react'
import './style.css'

function Buttons({text, onClick, blue, disabled}) {
  return (
    <div className={blue ? "btn btn-blue" : "btn"} onClick={onClick} disabled={disabled}>
        {text}
    </div>
  )
}

export default Buttons