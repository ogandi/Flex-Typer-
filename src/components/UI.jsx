import { useEffect, useState } from "react"
import "./ui.css"
import Stopwatch from "./Stopwatch/Stopwatch"
import GameBox from "./GameBox.jsx/GameBox"
import GameLandingPage from "./GameLandingPage/GameLandingPage"

export default function UI() {
    const [gameStatus, setGameStatus] = useState(false)
    const [isGameRunning, setIsGameRunning] = useState(false)

    function handleClickInitialise() {
        setGameStatus(true)
        setIsGameRunning(true)
    }

    return (
        <div>
            {gameStatus ? 
            <GameBox 
                gameStatus={gameStatus} 
                setGameStatus={setGameStatus}
                isGameRunning={isGameRunning}
                setIsGameRunning={setIsGameRunning}/> 

            : 
            <GameLandingPage 
               handleClickInitialise={handleClickInitialise}/>}


        </div>
    )
}


