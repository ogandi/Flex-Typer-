import "./GameLandingPage.css"

export default function GameLandingPage({handleClickInitialise}) {
    

    return (
        <div className="landing-page-wrapper"> 
        <header>
            <h1>Flex Typer</h1>
            <h4>OG Industries</h4>
        </header>
        <section>
            <button onClick={handleClickInitialise}>Start Game</button>
        </section>
        </div>
    )
}