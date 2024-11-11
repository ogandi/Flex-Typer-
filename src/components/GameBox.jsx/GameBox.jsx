import { useState, useEffect } from "react"
import Stopwatch from "../Stopwatch/Stopwatch"
import * as Game from "../../Utils/findTotalCharacterCount"



export default function GameBox({ setIsGameRunning, isGameRunning }) {

    const [userOutput, setUserOutput] = useState("")
    const [totalParagraphs, setTotalParagraphs] = useState(2)
    const [paragraphs, setParagraphs] = useState(["   ", "test", "testt"])
    const [paragraphIndex, setParagraphIndex] = useState(0)
    const [totalCharacterCount, setTotalCharacterCount] = useState(0)
    const [text, setText] = useState({ correctText: "", remainingText: "" })

    const [errors, setErrors] = useState([])
    const [errorCount, setErrorCount] = useState(0)

    const [timeElapsed, setTimeElapsed] = useState(60);
    const [wpm, setWPM] = useState(0)

    const originalParagraphs = ["   ", "test", "enter into the paragraph two"]

    function findTotalCharacterCount() {
        setTotalCharacterCount(Game.findTotalCharacters(paragraphs))
    }

    useEffect(() => {
        findTotalCharacterCount()
    }, [])

    function createParagraphs() {
        setText(Game.filterParagraphs(paragraphs, paragraphIndex, errors, userOutput));
    }


    useEffect(() => {
        createParagraphs();
    }, [userOutput]);





    function handleInput(e) {
        let userInput = e.target.value
        setUserOutput(userInput)
        setErrors(checkError(userInput))
        checkProgress(userInput)
    }



    function checkError(userInput) {
        let errors = [];
        let currentParagraph = checkParagraph(userInput)

        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] !== currentParagraph[i]) {
                errors.push(i);
                setErrorCount(errorCount + 1)
            }
        }
        return errors;
    }

    function checkParagraph(userInput) {
        if (userInput[0] === " ") {
            return ""
        }
        for (let i = 0; i < paragraphs.length; i++) {
            if (userInput[0] === paragraphs[i][0]) {
                setParagraphIndex(i)
                return paragraphs[i]
            }
        }
    }

    function checkProgress(userInput) {
        let currentParagraph = checkParagraph(userInput)


        if (userInput.length === currentParagraph.length && errors.length === 0) {
            if (totalParagraphs - 1 === 0) {
                setIsGameRunning(false)
            } else {
                nextParagraph(currentParagraph)
            }
        }
    }

    function nextParagraph(currentParagraph) {
        let index = paragraphs.indexOf(currentParagraph)
        let poppedParagraph = paragraphs.filter((p, i) => i !== index)
        setParagraphs(poppedParagraph)
        setTotalParagraphs(totalParagraphs - 1)
        setParagraphIndex(0)
        setUserOutput("")
    }

    function resetGame() {
        // console.log('You win!');
        setTotalParagraphs(2)
        setUserOutput("")
        setIsGameRunning(true)
        setParagraphIndex(0)
        setParagraphs(originalParagraphs)
    }








    return (
        <>

            <Stopwatch
                isGameRunning={isGameRunning}
                totalCharacterCount={totalCharacterCount}
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
                                    className={index === paragraphIndex ? "current" : ""}
                                >
                                    {index === paragraphIndex ? (
                                        <>
                                            <span className="correct">
                                                {text.correctText}
                                            </span>
                                            <span className={`remaining ${errors.length > 0 ? "wrong" : ""}`}>
                                                {text.remainingText}
                                            </span>
                                        </>
                                    ) : (
                                        paragraph
                                    )}
                                </p>
                            ))}
                        </div>

                        <input value={userOutput} onInput={handleInput} />
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

