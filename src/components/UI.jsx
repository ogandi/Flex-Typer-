import { useEffect, useState } from "react"
import Stopwatch from "./Stopwatch/Stopwatch"
import GameBox from "./GameBox.jsx/GameBox"
import GameLandingPage from "./GameLandingPage/GameLandingPage"

import callGemini from "../utils.js/gemini-api"

export default function UI() {
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


