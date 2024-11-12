
import { useState, useEffect } from "react"
import Stopwatch from "../Stopwatch/Stopwatch"
import * as Game from "../../Utils.js/findTotalCharacterCount"
import "./GameBox.css"


export default function GameBox({ setIsGameRunning, isGameRunning, gamePrompt }) {
    
    const [userOutput, setUserOutput] = useState("")

    const [characterCount, setCharacterCount] = useState(0)
    // const [text, setText] = useState({ correctText: "", remainingText: "" })

    const [errors, setErrors] = useState([])
    const [errorCount, setErrorCount] = useState(0)

    const [timeElapsed, setTimeElapsed] = useState(60);
    const [wpm, setWPM] = useState(0)

    // const originalParagraphs = ["test"]




    // async function setTotalCharacters() {
    //         // setParagraphs([gamePrompt])
    //         // setCharacterCount(gamePrompt.length)
    //         // setText(Game.filterParagraphs([gamePrompt], errors, userOutput))

    // }
    
    // function createParagraphs() {
    //     // setText(Game.filterParagraphs(paragraphs, errors, userOutput)); // highlight paragraphs
    // }
    
    // useEffect(() => {
    //     setTotalCharacters()
    // }, [])



    // useEffect(() => {
    //     createParagraphs();
    // }, [userOutput]);





    function handleInput(e) {
        let userInput = e.target.value
        setUserOutput(userInput)
        setErrors(checkError(userInput))
        checkProgress(userInput)
    }



    function checkError(userInput) {
        let errors = [];
        let currentParagraph = paragraphs[0]

        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] !== currentParagraph[i]) {
                errors.push(i);
                setErrorCount(errorCount + 1)
            }
        }
        return errors;
    }

    // function checkParagraph(userInput) {
    //     if (userInput[0] === " ") {
    //         return ""
    //     }
    //     for (let i = 0; i < paragraphs.length; i++) {
    //         if (userInput[0] === paragraphs[i][0]) {
    //             setParagraphIndex(i)
    //             return paragraphs[i]
    //         }
    //     }
    // }

    function checkProgress(userInput) {
        // let currentParagraph = checkParagraph(userInput)
        let currentParagraph = paragraphs[0]

        if (userInput.length === currentParagraph.length && errors.length === 0) {
            setIsGameRunning(false)
            console.log('you win');
            
        }
    }

    // function nextParagraph(currentParagraph) {
    //     let index = paragraphs.indexOf(currentParagraph)
    //     let poppedParagraph = paragraphs.filter((p, i) => i !== index)
    //     setParagraphs(poppedParagraph)
    //     setTotalParagraphs(totalParagraphs - 1)
    //     setParagraphIndex(0)
    //     setUserOutput("")
    // }

    function resetGame() {
        // console.log('You win!');
        // setTotalParagraphs(2)
        setUserOutput("")
        setIsGameRunning(true)
        // setParagraphIndex(0)
        // setParagraphs(originalParagraphs)
    }

    
    const paragraphs = [gamePrompt]
    const text = Game.filterParagraphs(paragraphs, errors, userOutput)


    return (
        <>

            <Stopwatch
                isGameRunning={isGameRunning}
                characterCount={gamePrompt.length}
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
                wpm={wpm}
                setWPM={setWPM}
            />


            <section className="game-box">
                {isGameRunning ?
                    <div className="game-wrapper">
                        <div className="paragraphs">
                            {paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className={'current'}>
                                        <>


                                            {errors.length > 0 ?  
                                            <span className="wrong">
                                                {text.correctText}
                                            </span> 
                                            :
                                            <span className="correct">
                                                {text.correctText}
                                            </span>}


                                            <span className={`remaining `}>
                                                {text.remainingText}
                                            </span>
                                        </>
                            
                                </p>
                            ))}
                        </div>

                        <input tabIndex={0} value={userOutput} onInput={handleInput} />
                    </div>
                    :
                    <div>
                        <h2>You Win!</h2>
                        <p>Time left:  WPM: {wpm} Errors: {errorCount}</p>
                        <button onClick={resetGame}>play again</button>
                    </div>
                }




            </section>
        </>
    );
}

