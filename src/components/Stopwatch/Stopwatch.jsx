import { useEffect, useState } from "react"

export default function Stopwatch({setWPM, timeElapsed, setTimeElapsed, isUserTyping, characterCount}) {
    let initialTime = 60

    useEffect(() => {
        let countdown

        if (isUserTyping) {
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
            setWPM(((characterCount/5) / (finishTime / 60)))
            console.log(`you finished with ${timeElapsed} left`);
            clearInterval(countdown)
            setTimeElapsed(60)
        }

        return () => clearInterval(countdown)
    },  [isUserTyping])

    return (
        <>
        <span>{timeElapsed}  </span> 
        </>
    )

}




