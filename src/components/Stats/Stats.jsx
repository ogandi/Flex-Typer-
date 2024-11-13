import "./Stats.css"

export default function Stats({ wpm, errorCount, resetGame, timeLeft, totalCharacters}) {
    
    return (
        <div className="stats-wrapper">
            <section>
                <h2>Thats a Wrap!</h2>
                <p>Time left: <span>{timeLeft}</span> Total Characters: <span>{totalCharacters}</span> WPM: <span>{wpm}</span> Errors: <span>{errorCount}</span></p>
                <button onClick={resetGame}>play again</button>
            </section>
        </div>
    )
}