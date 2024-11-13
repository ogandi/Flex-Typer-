// import UI from './components/UI'
// import './App.css'

// function App() {

//   return (
//     <UI />
//   )
// }

// export default App




import UI from './components/UI'
import './App.css'
import { useEffect, useState } from "react"
import Stopwatch from "./Stopwatch/Stopwatch"
import GameBox from "./GameBox.jsx/GameBox"
import GameLandingPage from "./GameLandingPage/GameLandingPage"

import callGemini from "../utils.js/gemini-api"

function App() {
      const [gameStatus, setGameStatus] = useState(false)
      const [isUserTyping, setIsUserTyping] = useState(false)
      const [promptedParagraph, setPromptedParagraph] = useState("")
  
      async function handleClickInitialise(prompt, selectedLength) {
          setGameStatus(true)
          setIsUserTyping(true)
          
          const returnedPrompt = await callGemini(prompt, selectedLength)        
          setPromptedParagraph(returnedPrompt)
      
          
      }

  return (
    <UI />
  )
}

export default App







    return (
        <div>
            {gameStatus && promptedParagraph ? 
            <GameBox 
                gameStatus={gameStatus} 
                setGameStatus={setGameStatus}
                isUserTyping={isUserTyping}
                setIsUserTyping={setIsUserTyping}
                promptedParagraph={promptedParagraph}
                setPromptedParagraph={setPromptedParagraph}
                /> 

            : 
            <GameLandingPage 
               handleClickInitialise={handleClickInitialise}/>}


        </div>
    )
}