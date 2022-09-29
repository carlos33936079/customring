import React from 'react'
import { OptionGemContainer, OptionGemDetails } from './GemElements'

function Gem({setCurrentGem}) {

  const handleGem =(gem)=>{
    setCurrentGem({name: gem})
  }

  return (
    <OptionGemContainer>
        <h2>Opciones de Gema</h2>
        <OptionGemDetails>
            <h4 onClick={()=> handleGem("blue")}>Opcion 1</h4>
            <h4 onClick={()=> handleGem("monkey")}>Opcion 2</h4>
            <h4 onClick={()=> handleGem("red")}>Opcion 3</h4>
        </OptionGemDetails>
    </OptionGemContainer>
  )
}

export default Gem