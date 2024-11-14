import axios from "axios";
import { useEffect, useState } from "react";


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
                <p>{score.username} | <span>{score.wpm} wpm -</span> <span>{score.totalCharacters} total characters</span></p>
            ))}
        </div>
    )
}