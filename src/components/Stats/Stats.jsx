import "./Stats.css"

export default function Stats({ wpm, errorCount, resetGame, timeLeft }) {
    console.log(timeLeft);
    
    return (
        <div className="stats-wrapper">
            <section>
                <h2>Thats a Wrap!</h2>
                <p>Time left: <span>{timeLeft}</span>  WPM: <span>{wpm}</span> Errors: <span>{errorCount}</span></p>
                <button onClick={resetGame}>play again</button>
            </section>
        </div>
    )
}