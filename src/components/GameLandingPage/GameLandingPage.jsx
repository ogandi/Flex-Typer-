import "./GameLandingPage.css"

export default function GameLandingPage({handleClickInitialise}) {
    

    return (
        <div className="landing-page-wrapper"> 
        
        <section>
        <header>
            <h1>Flex Typer</h1>
            <h4>OG Industries <span>_</span></h4>
        </header>
        <div>
            <button onClick={handleClickInitialise}>Start Game</button>
        </div>
        </section>
        </div>
    )
}