import "./GameLandingPage.css"
import { useState } from "react"

export default function GameLandingPage({handleClickInitialise}) {
    const [prompt, setPrompt] = useState("")
    const [overPromptLimit, setOverPromptLimit] = useState(false)
    const [selectedLength, setSelectedLength] = useState("long paragraph")

    function handlePromptInput(e) {
        e.preventDefault()
        if (prompt.length > 30) {
            setOverPromptLimit(true)
        } else {
            setOverPromptLimit(false)
        }

        setPrompt(e.target.value)
    }
    function handleSelectChange(e) {
        setSelectedLength(e.target.value)
    }

    function handleStartGame(e) {
        e.preventDefault();
        handleClickInitialise(prompt, selectedLength)
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
                <form action="">
                  <input onChange={handlePromptInput}type="text" />
                  <select value={selectedLength} onChange={handleSelectChange}>
                    <option value="long Paragraph">Long Paragraph</option>
                    <option value="short Paragraph">Short Paragraph</option>
                  </select>
                  <button disabled={overPromptLimit} className="start-button" onClick={handleStartGame}>Start Game</button>

                </form>
            </div>
            </section>
        </div>
    )
}