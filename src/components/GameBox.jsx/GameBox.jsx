import { useState, useEffect, useRef } from "react"
import Stopwatch from "../Stopwatch/Stopwatch"
import Stats from "../Stats/Stats"
import highlightParagraphs from "../../utils.js/highlight-paragraph"
import hands from "../../images/hands.png"
import face from "../../images/face-trim.png"
import "./GameBox.css"

export default function GameBox({ setIsGameRunning, isUserTyping, setIsUserTyping, promptedParagraph, setPromptedParagraph }) {
    const [userTyped, setUserTyped] = useState("")
    const [errors, setErrors] = useState([])
    const [errorCount, setErrorCount] = useState(0)
        
    const [timeElapsed, setTimeElapsed] = useState(60);

    const [wpm, setWPM] = useState(0)

    const [inFocus, setInFocus] = useState(true)

    const paragraphs = [promptedParagraph]
    const totalCharacters = paragraphs[0].length
    let timeLeft = timeElapsed
    const text = highlightParagraphs(paragraphs, errors, userTyped)
    
    


    function handleInput(e) {
        const userInput = e.target.value
        setUserTyped(userInput)
        setErrors(checkError(userInput))
        checkProgress(userInput)
    }



    function checkError(userInput) {
        const errors = [];
        const [currentParagraph] = paragraphs

        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] !== currentParagraph[i]) {
                errors.push(i);
            }
        }
        setErrorCount(errors.length)
        return errors;
    }



    function checkProgress(userInput) {
        const [currentParagraph] = paragraphs
        const userFinished = userInput.length === currentParagraph.length && errors.length === 0
        
        if (userFinished) {
            setIsUserTyping(false)
        }
    }


    function resetGame() {
        setUserTyped("")
        setIsUserTyping(false)
        setIsGameRunning(false)
        setPromptedParagraph("")
    }

    


    function handleBlur() {
        console.log('out of focus');
        setInFocus(false)
        
    }
    function handleFocus() {
        console.log('in focus');
        setInFocus(true)
        
    }

    const gameInput = useRef(null)
    

    useEffect(() => {
        gameInput.current.focus()
    },[])

    

    return (
        <>

            <Stopwatch
                isUserTyping={isUserTyping}
                characterCount={promptedParagraph.length}
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
                wpm={wpm}
                setWPM={setWPM}
                timeLeft={timeLeft}
                setIsUserTyping={setIsUserTyping}
            />


            <section className="game-box">
                <img  
                    className="focus-hands" 
                    src={hands}/>

                <img  
                    className={inFocus ? "focus-face" : "unfocus-face"} 
                    src={face}/>

                {!inFocus && 
                        <h1 className="focus-warning">Not in focus, Click here</h1>}

                {isUserTyping ?
                    <div 
                    className={ inFocus ? 
                        "game-wrapper"
                        :
                        "blurred"}>
                            
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

                        <input ref={gameInput} onFocus={handleFocus} onBlur={handleBlur} value={userTyped} onInput={handleInput} />
                    </div>
                    :
                    <Stats totalCharacters={totalCharacters} timeLeft={timeLeft} wpm={wpm} errorCount={errorCount} resetGame={resetGame} />
                   
                }

            </section>
        </>
    );
}

