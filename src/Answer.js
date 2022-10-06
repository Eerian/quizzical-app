import React, {useState} from "react";

export default function Answer({choice, handleClick, clickedChoice, isCorrectChoice, showAnswers}) {
    let cssClass = "answers"
    if(showAnswers) {
        if(isCorrectChoice && clickedChoice === choice) {
            cssClass += " correct-answer"
        } else if (!isCorrectChoice && clickedChoice === choice) {
            cssClass += " wrong-answer"
        } else if (isCorrectChoice) {
            cssClass += " correct-answer"
        } else {
            cssClass += " faded-color"
        }
    }
    if(choice === clickedChoice) cssClass += " selected"

    return <button className={cssClass} onClick={handleClick}>{choice}</button>
}


// choice === clickedChoice ? "lightblue": "white"