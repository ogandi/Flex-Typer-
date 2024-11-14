import { useState } from "react";
import "./Stats.css"
import axios from "axios";

export default function Stats({ wpm, errorCount, resetGame, timeLeft, totalCharacters}) {
    const [username, setUsername] = useState("")

    function handleInput(e){
        setUsername(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let hiScoreEntry =  await axios.post(`/api/entry`, {username, wpm, totalCharacters}) 
        setUsername("")
        
    }
    
    return (
        <div className="stats-wrapper">
            <section>
                <h2>Thats a Wrap!</h2>
                <p>Time left: <span>{timeLeft}</span> Total Characters: <span>{totalCharacters}</span> WPM: <span>{wpm}</span> Errors: <span>{errorCount}</span></p>
                <button onClick={resetGame}>play again</button>
                <form onSubmit={handleSubmit} action="">
                <input onInput={handleInput} type="text"/>
                <button>log time</button>
                </form>

            </section>
        </div>
    )
}