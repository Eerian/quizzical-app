import React from "react";
import Answer from './Answer'
import { nanoid } from "nanoid";

export default function Question({apiData, question, setApiData, showAnswers}) {
  const [choices , setChoices] = React.useState([])
  const [clickedChoice, setClickedChoice] = React.useState("")

  React.useEffect(()=> {
    if(!question.choices.length) return
    setChoices(question.choices)
  },[apiData])
  
  function handleClick(e) {
    e.preventDefault()
    setClickedChoice(e.target.innerText)
    setApiData(
      apiData.map((item) => {
        if (question.question === item.question) {
          return {...item, selectedAnswer : e.target.innerText};
        } else {
          return item
        }
      })
    )
  }

  //decode code gotten from stackoverflow
 function decodeHtml(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

  const allChoices = choices.map(choice => {
    const isCorrectChoice = choice === question.correct_answer ? true : false

    return (
      <Answer 
        choice={decodeHtml(choice)}
        handleClick={handleClick}
        clickedChoice={clickedChoice}
        showAnswers={showAnswers}
        isCorrectChoice={isCorrectChoice}
        id={nanoid()}
      />
    )
  })
  
  return (
    <div>
      <h3 className="question-text">{decodeHtml(question.question)}</h3>
      <div className="answers-container">
        {allChoices}
      </div>
    </div>

  )

}