import { useEffect, useState } from "react"
import "./ui.css"
import Stopwatch from "./Stopwatch/Stopwatch"
import GameBox from "./GameBox.jsx/GameBox"
import GameLandingPage from "./GameLandingPage/GameLandingPage"
import axios from "axios"

export default function UI() {
    const [gameStatus, setGameStatus] = useState(false)
    const [isUserTyping, setIsUserTyping] = useState(false)
    const [promptedParagraph, setPromptedParagraph] = useState("")

    async function handleClickInitialise(prompt) {
        setGameStatus(true)
        setIsUserTyping(true)

        const res = await axios.get(`/api/generate-paragraph/${prompt}`)        
        setPromptedParagraph(res.data.filteredStory)
        
        return res.data
        
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


