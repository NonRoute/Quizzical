import React from "react"
import Question from "./Question.js"
import {nanoid} from "nanoid"
import {decode} from "html-entities"

export default function Questions() {
    const [allQuestions, setAllQuestions] = React.useState([])
    const [isCheck, setIsCheck] = React.useState(false)
    const [handleRestart, setHandleRestart] = React.useState(false)
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setAllQuestions(data.results.map((item) => {
                return {
                    id: nanoid(),
                    question: decode(item.question),
                    correct_answer: decode(item.correct_answer),
                    answers: shuffle(decodeArray([item.correct_answer, ...item.incorrect_answers])),
                    selectedIndex: -1
                }
            })))
    }, [handleRestart])   
    
    function getScore() {
        let score = 0
        for (const item of allQuestions) {
            if (item.selectedIndex === item.answers.indexOf(item.correct_answer)) {
                score++
            }
        }
        return score
    }
    
    function decodeArray(array) {
        return array.map((item) => decode(item))
    }
    
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function selectAnswer(id, index) {
        if (!isCheck) {
            setAllQuestions(prev => prev.map((item) => {
                return item.id === id ? 
                    {...item, selectedIndex : index} :
                    item
            }))
        }
    }
    
    const QuestionElements = allQuestions.map(question => (
        <Question
            key={question.id}
            id={question.id}
            question={question.question}
            correct_answer_index={question.answers.indexOf(question.correct_answer)}
            ans={question.answers}
            selectedIndex={question.selectedIndex}
            selectAnswer={selectAnswer}
            isCheck={isCheck}
        />
    ))
    
    function restartGame() {
        setHandleRestart(prev => !prev)
        setIsCheck(false)  
    }
    
    return (
        <div>
            <div className="questions-container">
                {QuestionElements}
            </div>
            <div className="score">
                {isCheck && <p>You scored {getScore()}/5 correct answers</p>}
                {!isCheck && <button className="check-answer" onClick={() => setIsCheck(true)}>Check answers</button>}
                {isCheck && <button className="check-answer" onClick={restartGame}>Play again</button>}
            </div>
        </div>
    )
}