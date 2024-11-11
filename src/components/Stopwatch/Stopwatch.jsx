import { useEffect, useState } from "react"

export default function Stopwatch({setWPM, timeElapsed, setTimeElapsed, isGameRunning, characterCount}) {
    let initialTime = 60

    useEffect(() => {
        let countdown

        if (isGameRunning) {
            countdown = setInterval(() => {
                setTimeElapsed((prevTime) => {
                    if (prevTime > 1) return prevTime - 1
                    else {
                        console.log("gameover")
                        clearInterval(countdown)
                        return 0
                    }
                })
            }, 1000)
        } else {  
            let finishTime = initialTime - timeElapsed 
            console.log(finishTime);
            console.log((characterCount/finishTime) * 60)
            // let wpmTest = (totalCharacterCount/finishTime) * 60
            setWPM((characterCount/finishTime) * 60)
            
            console.log(`you finished with ${timeElapsed} left`);
            clearInterval(countdown)
            setTimeElapsed(60)
        }

        return () => clearInterval(countdown)
    },  [isGameRunning])

    return (
        <>
        <span>{timeElapsed}  </span> 
        </>
    )

}