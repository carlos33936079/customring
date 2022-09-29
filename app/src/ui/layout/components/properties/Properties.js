import React from 'react'
import Gem from './options/gem/Gem'
import MetalColor from './options/metalColor/MetalColor'
import RingTexture from './options/ringTexture/RingTexture'
import {PropertiesContainer, PropertiesWrapper} from "./PropertiesElements"

function Properties({setCurrentGem, setCurrentRingColor, setCurrentRingTexture}) {
  return (
    <PropertiesContainer>
        <PropertiesWrapper>
            <h1>Anillo Custom</h1>
            <Gem setCurrentGem={setCurrentGem}/>
            <MetalColor setCurrentRingColor={setCurrentRingColor}/>
            <RingTexture setCurrentRingTexture={setCurrentRingTexture}/>
        </PropertiesWrapper>
    </PropertiesContainer> 
  )
}

export default Properties