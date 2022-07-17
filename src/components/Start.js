import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h1>Quizzical</h1>
            <p>5 Trivia questions</p>
            <button onClick={props.start}>Start quiz</button>
        </div>
    )
}