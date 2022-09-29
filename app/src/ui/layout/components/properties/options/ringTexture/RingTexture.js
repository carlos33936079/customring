import React from 'react'
import { OptionEngravingContainer, OptionEngravingDetail } from './RingTextureElements'
import * as THREE from "three"


function RingTexture({setCurrentRingTexture}) {

  const handleRingTextures = (folder) => {
    const textureLoader = new THREE.TextureLoader()
    setCurrentRingTexture({
      base: textureLoader.load("./model/textures/1/base.png"),
      normal: textureLoader.load("./model/textures/1/normal.png"),
      roughness: textureLoader.load("./model/textures/1/roughness_metalness.png"),
    })
  }

  return (
    <OptionEngravingContainer>
        <h2>Texturas</h2>
        <OptionEngravingDetail>
            <h4 onClick={() => handleRingTextures()}>Opcion 1</h4>
            <h4 onClick={() => handleRingTextures()}>Opcion 2</h4>
            <h4 onClick={() => handleRingTextures()}>Opcion 3</h4>
            <h4 onClick={() => handleRingTextures()}>Opcion 4</h4>
        </OptionEngravingDetail>
    </OptionEngravingContainer>
  )
}

export default RingTexture