import axios from "axios";
import { useEffect, useState } from "react";
import "./Leaderboard.css"


export default function Leaderboard() {
    const [scores, setScores] = useState([])

    useEffect(() => {
        fetchScores()
    },[])

    async function fetchScores() {
        let entries = await axios.get('api/entries')
        setScores(entries.data)
    }

    return (
        <div className="scores-wrapper">
            <h3>Club 110 wpm</h3>
            {scores.map((score, i) => (
                <p><span className="user">{score.username}
                <br></br></span> <span className="stat">{score.wpm}</span> wpm <br></br><span className="stat">{score.totalCharacters}</span> total characters</p>
            ))}
        </div>
    )
}