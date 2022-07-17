import React from "react"
import Start from "./components/Start.js"
import Questions from "./components/Questions.js"
import "./style.css"

export default function App() {
    const [isStart, setIsStart] = React.useState(false)
    
    function start() {
        setIsStart(true)
    }
    
    return (
        <main>
            <img className="blob5" src="./images/blob5.png" />
            {!isStart && <Start start={start} />}
            {isStart && <Questions />}
            <img className="blob4" src="./images/blob4.png" />
        </main>
    )
}