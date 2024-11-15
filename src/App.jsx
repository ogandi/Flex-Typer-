import './App.css'
import { useState } from "react"
import GameBox from './components/GameBox.jsx/GameBox'
import GameLandingPage from './components/GameLandingPage/GameLandingPage'

import callGemini from './utils.js/gemini-api'

function App() {
      const [isGameRunning, setIsGameRunning] = useState(false)
      const [isUserTyping, setIsUserTyping] = useState(false)
      const [promptedParagraph, setPromptedParagraph] = useState("")
  
      async function handleClickInitialise(prompt, selectedLength) {
          setIsGameRunning(true)
          setIsUserTyping(true)
          const returnedPrompt = await callGemini(prompt, selectedLength)        
          setPromptedParagraph(returnedPrompt)
      }

  return (
    <>
    {isGameRunning && promptedParagraph ? 
    <GameBox 
        setIsGameRunning={setIsGameRunning}
        isUserTyping={isUserTyping}
        setIsUserTyping={setIsUserTyping}
        promptedParagraph={promptedParagraph}
        setPromptedParagraph={setPromptedParagraph}
        /> 

    : 
    <GameLandingPage 
       handleClickInitialise={handleClickInitialise}
       />}


  </>
  )
}

export default App

