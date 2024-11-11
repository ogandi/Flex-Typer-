import { useState, useEffect } from "react";
import Stopwatch from "../Stopwatch/Stopwatch";

// const [gameStatus, setGameStatus] = useState(false)

export default function GameBox({ gameStatus, setGameStatus, setIsGameRunning, isGameRunning }) {
    const [userOutput, setUserOutput] = useState("")
    const [totalParagraphs, setTotalParagraphs] = useState(2)
    const [paragraphs, setParagraphs] = useState(["   ", "test", "testt"])
    const [paragraphIndex, setParagraphIndex] = useState(0)
    const [errors, setErrors] = useState([])
    const [text, setText] = useState({ correctText: "", remainingText: "" })
    const [totalCharacterCount, setTotalCharacterCount] = useState(0)
    const originalParagraphs = ["   ", "test", "enter into the paragraph two"]

    function findTotalCharacterCount() {
        let totalCharacterCount = 0
        for (let i = 1; i < paragraphs.length; i++) {
            totalCharacterCount += paragraphs[i].length
        }
        setTotalCharacterCount(totalCharacterCount)
    }

    useEffect(()=>{
        findTotalCharacterCount()
    },[])

    function paragraphHolder() {
        const currentParagraph = paragraphs[paragraphIndex];
        const firstErrorIndex = errors.length > 0 ? errors[0] : userOutput.length;
        const correctText = currentParagraph.slice(0, firstErrorIndex);
        const remainingText = currentParagraph.slice(firstErrorIndex);
        setText({ correctText, remainingText });
    }


    useEffect(() => {
        paragraphHolder();
    }, [userOutput]);





    function startGame(e) {
        let userInput = e.target.value
        // !isGameRunning ? setIsGameRunning(true) : null
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
                let index = paragraphs.indexOf(currentParagraph)
                let poppedParagraph = paragraphs.filter((p, i) => i !== index)
                setParagraphs(poppedParagraph)
                setTotalParagraphs(totalParagraphs - 1)
                setParagraphIndex(0)
                setUserOutput("")

            }
        }
    }

    // function resetGame() {
    //     console.log('You win!');
    //     setTotalParagraphs(2)
    //     setUserOutput("")
    //     setGameStatus(false)
    //     setParagraphIndex(0)
    //     setParagraphs(originalParagraphs)
    // }


 





    return (
        <>

            <Stopwatch
                setIsGameRunning={setIsGameRunning}
                isGameRunning={isGameRunning}
                setGameStatus={setGameStatus}
                paragraphs={paragraphs}
                totalCharacterCount={totalCharacterCount} />


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
                                            <span className="correct">{text.correctText}</span>
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

                        <input value={userOutput} onInput={startGame} />
                    </div>
                    :
                    <div>
                        <h2>You Win!</h2>
                        Time left: 
                        WPM: 
                        Errors: 
                    </div>
                    }




            </section>
        </>
    );
}

