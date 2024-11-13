import "./GameLandingPage.css"
import { useState } from "react"

export default function GameLandingPage({handleClickInitialise}) {
    const [prompt, setPrompt] = useState("")

    function handlePromptInput(e) {
        setPrompt(e.target.value)
    }
    

    return (
        <div className="landing-page-wrapper"> 
        
            <section>
            <header>
                <h1>Flex Typer</h1>
                <h4>OG Industries <span>_</span></h4>
            </header>
                <label htmlFor="">Start by giving Gemini Ai a prompt!</label>
            <div>
                <input onChange={handlePromptInput}type="text" />
                <button onClick={()=> handleClickInitialise(prompt)}>Start Game</button>
            </div>
            </section>
        </div>
    )
}