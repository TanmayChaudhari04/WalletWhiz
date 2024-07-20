import React from 'react'

function Inputs({label, state, setState, placeholder, type}) {
  return (
    <div className='mb-3'>
        <p className='capitalize mb-0 text-base'>{label}</p>
        <input type={type} value={state} placeholder={placeholder} onChange={(e) => setState(e.target.value)} className='mt-1 border-0 border-b-2 w-full py-2 text-base outline-none opacity-80 focus:opacity-100'></input>
    </div>
  )
}

export default Inputs