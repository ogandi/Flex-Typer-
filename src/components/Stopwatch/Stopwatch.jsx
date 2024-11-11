import { useEffect, useState } from "react"

export default function Stopwatch({setIsGameRunning, isGameRunning, totalCharacterCount}) {
    const [timeElapsed, setTimeElapsed] = useState(60);
    const [wpm, setWPM] = useState(0)
    let initialTime = 60
    
    console.log(totalCharacterCount);

    
    useEffect(() => {
        let countdown

        if (isGameRunning) {
            countdown = setInterval(() => {
                setTimeElapsed((prevTime) => {
                    if (prevTime > 1) return prevTime - 1
                    else {
                        console.log("gameover")
                        setIsGameRunning(false)
                        clearInterval(countdown)
                        return 0
                    }
                })
            }, 1000)
        } else {  
            let finishTime = initialTime - timeElapsed 
            console.log(finishTime);
            console.log((totalCharacterCount/finishTime) * 60)
            // let wpmTest = (totalCharacterCount/finishTime) * 60
            setWPM((totalCharacterCount/finishTime) * 60)
            
            console.log(`you finished with ${timeElapsed} left`);
            setIsGameRunning(false)
            clearInterval(countdown)
            setTimeElapsed(60)
        }

        return () => clearInterval(countdown)
    },  [isGameRunning])

    return (
        <>
        <span>{timeElapsed}  </span> 
        <br />
        <span>{wpm}</span>
        </>
    )

}