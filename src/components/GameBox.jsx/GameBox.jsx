import { useState, useEffect, useRef } from "react"
import Stopwatch from "../Stopwatch/Stopwatch"
import Stats from "../Stats/Stats"
import * as Game from "../../Utils.js/findTotalCharacterCount"
import hands from "../../images/hands.png"
import face from "../../images/face-trim.png"
import "./GameBox.css"

export default function GameBox({ setIsUserTyping, isUserTyping, promptedParagraph, setGameStatus, setPromptedParagraph }) {
    
    const [userTyped, setUserTyped] = useState("")
    const [errors, setErrors] = useState([])
    const [errorCount, setErrorCount] = useState(0)

    const [timeElapsed, setTimeElapsed] = useState(60);

    const [wpm, setWPM] = useState(0)

    const [inFocus, setInFocus] = useState(true)



    function handleInput(e) {
        let userInput = e.target.value
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
                setErrorCount(errorCount + 1)
            }
        }
        return errors;
    }



    function checkProgress(userInput) {
        const [currentParagraph] = paragraphs
        
        if (userInput.length === currentParagraph.length && errors.length === 0) {
            
            setIsUserTyping(false)
            console.log('you win');
            
        }
    }


    function resetGame() {
        setUserTyped("")
        setIsUserTyping(false)
        setGameStatus(false)
        setPromptedParagraph("")
    }

    
    const paragraphs = [promptedParagraph]
    console.log(paragraphs);
    
    const text = Game.filterParagraphs(paragraphs, errors, userTyped)

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

    let timeLeft = timeElapsed
    console.log(paragraphs);
    
    let totalCharacters = paragraphs[0].length

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

