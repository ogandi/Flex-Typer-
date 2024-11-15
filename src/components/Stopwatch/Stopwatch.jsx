import { useEffect, } from "react"
import "./Stopwatch.css"

export default function Stopwatch({setWPM, timeElapsed, setTimeElapsed, isUserTyping, setIsUserTyping, userTyped}) {
    let initialTime = 60


    useEffect(() => {
        let countdown

        if (isUserTyping) {
            countdown = setInterval(() => {
                setTimeElapsed((prevTime) => {
                    if (prevTime > 1) return prevTime - 1
                    else {
                        console.log("gameover")
                        setIsUserTyping(false)
                        clearInterval(countdown)
                        return 0
                    }
                })
            }, 1000)
        } else {  
            let finishTime = initialTime - timeElapsed 
            const calculatedWPM = Math.round((userTyped / 5) / (finishTime / 60))
            setWPM(calculatedWPM)
            console.log(`you finished with ${timeElapsed} left`);
            clearInterval(countdown)
        
        }

        return () => clearInterval(countdown)
    },  [isUserTyping])
    

    return (
        <>
        <span className="timer">{timeElapsed}</span> 
        </>
    )

}




