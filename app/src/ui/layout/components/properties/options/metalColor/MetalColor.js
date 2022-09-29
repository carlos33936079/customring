import React from 'react'
import { OptionMetalColorContainer, OptionMetalColorDetails } from './MetalColorElements'

function MetalColor({setCurrentRingColor}) {
  const handleRingColor=(ringColor)=>{
    setCurrentRingColor({color: ringColor})
  }
  return (
    <OptionMetalColorContainer>
        <h2>Color</h2>
        <OptionMetalColorDetails>
            <h4 onClick={()=> handleRingColor("gold")}>Oro</h4>
            <h4 onClick={()=> handleRingColor("white")}>Plata</h4>
            <h4 onClick={()=> handleRingColor("#CB6D51")}>Cobre</h4>
        </OptionMetalColorDetails>
    </OptionMetalColorContainer>
  )
}

export default MetalColor