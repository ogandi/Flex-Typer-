import { useEffect, useState } from "react"
import "./ui.css"
import Stopwatch from "./Stopwatch/Stopwatch"
import GameBox from "./GameBox.jsx/GameBox"
import GameLandingPage from "./GameLandingPage/GameLandingPage"
import axios from "axios"

export default function UI() {
    const [gameStatus, setGameStatus] = useState(false)
    const [isGameRunning, setIsGameRunning] = useState(false)
    const [gamePrompt, setGamePrompt] = useState("")

    async function handleClickInitialise(prompt) {
        setGameStatus(true)
        setIsGameRunning(true)
        console.log(prompt);
        let res = await axios.get(`/api/generate-paragraph/${prompt}`)
        setGamePrompt(res.data.story)
        
        return res.data
        
    }

    return (
        <div>
            {gameStatus && gamePrompt ? 
            <GameBox 
                gameStatus={gameStatus} 
                setGameStatus={setGameStatus}
                isGameRunning={isGameRunning}
                setIsGameRunning={setIsGameRunning}
                gamePrompt={gamePrompt}
                /> 

            : 
            <GameLandingPage 
               handleClickInitialise={handleClickInitialise}/>}


        </div>
    )
}


