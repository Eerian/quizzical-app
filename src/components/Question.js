import React from "react";
import Answer from './Answer'

export default function Question({apiData, question, setApiData, showAnswers, setSelectionMade}) {
  const [choices , setChoices] = React.useState([])
  const [clickedChoice, setClickedChoice] = React.useState("")

  React.useEffect(()=> {
    if(!question.choices.length) return
    setChoices(question.choices)
  },[apiData])
  
  function handleClick(e) {
    e.preventDefault()
    setClickedChoice(e.target.innerText)
    setSelectionMade(prev => !prev)
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

  const allChoices = choices.map((choice, index) => {
    const isCorrectChoice = choice === question.correct_answer ? true : false

    return (
      <Answer 
        choice={decodeHtml(choice)}
        handleClick={handleClick}
        clickedChoice={clickedChoice}
        showAnswers={showAnswers}
        isCorrectChoice={isCorrectChoice}
        key={index}
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
