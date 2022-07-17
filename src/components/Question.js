import React from "react"

export default function Question(props) {
    const selectedButtonStyle = {
        backgroundColor: "#D6DBF5",
        border: "1px solid transparent"
    }
    
    const unselectedButtonStyle = {
        backgroundColor: "white"
    }
    
    const wrongButtonStyle = {
        backgroundColor: "#F8BCBC",
        border: "1px solid transparent",
        opacity: "0.5"
    }
    
    const correctButtonStyle = {
        backgroundColor: "#94D7A2",
        border: "1px solid transparent"
    }
    
    const unfocusedButtonStyle = {
        opacity: "0.5"
    }
    
    function getStyle(index) {
        if (props.isCheck) {
            if (props.correct_answer_index === index) {
                return correctButtonStyle
            } else if (props.selectedIndex === index && props.correct_answer_index !== index) {
                return wrongButtonStyle
            } else {
                return unfocusedButtonStyle
            }
        } else {
            if (props.selectedIndex === index) {
                return selectedButtonStyle
            } else {
                return  unselectedButtonStyle
            }
        }  
    }
    
    function getButtonElement(index) {
        return (
            <button 
                onClick={() => props.selectAnswer(props.id,index)}
                style={getStyle(index)}
            >{props.ans[index]}</button>
        )
    }
    
    return (
        <div className="question">
            <h1>{props.question}</h1>
            {getButtonElement(0)}
            {getButtonElement(1)}
            {getButtonElement(2)}
            {getButtonElement(3)}
            <hr/>
        </div>
    )
}