import React, { useState } from 'react'
import Properties from '../properties/Properties'
import Ring from '../Ring/Ring'
import {GeneralContainer, Wrapper} from "./MenuElemnent"

function NavBar() {
  
  const [currentGem, setCurrentGem] = useState({name: ""})
  const [currentRingColor, setCurrentRingColor] = useState({color: ""})
  const [currentRingTexture, setCurrentRingTexture] = useState({
    base:"",
    normal:"",
    roughness:"",
  })

  return (
    <GeneralContainer>
        <Wrapper>
            <Properties setCurrentGem={setCurrentGem} setCurrentRingColor={setCurrentRingColor} setCurrentRingTexture={setCurrentRingTexture}/>
            <Ring currentGem={currentGem} currentRingColor={currentRingColor} currentRingTexture={currentRingTexture}/>
        </Wrapper>
    </GeneralContainer>
  )
}

export default NavBar