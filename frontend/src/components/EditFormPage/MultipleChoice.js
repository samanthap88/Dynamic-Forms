import React, { useState } from 'react';

function MultipleChoice({ questionsIndex, allQuestions }) {
  const [question, setQuestion] = useState(allQuestions[questionsIndex].text);
  const [answerChoices, setAnswerChoices] = useState(allQuestions[questionsIndex].options);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    allQuestions[questionsIndex].text = e.target.value;
  };

  const handleAddAnswerChoice = () => {
    setAnswerChoices([...answerChoices, '']);
    allQuestions[questionsIndex].options = answerChoices;
  };

  const handleAnswerChoiceChange = (choiceIndex, e) => {
    const newAnswerChoices = [...answerChoices];
    newAnswerChoices[choiceIndex] = e.target.value;
    setAnswerChoices(newAnswerChoices);
    allQuestions[questionsIndex].options[choiceIndex] = e.target.value;

  };

  return (
    <div className="w-full ">
      
        <div >
          <input
            type="text"
            placeholder="Type your question"
            value={question}
            onChange={(e) => handleQuestionChange(e)}
            className="mt-1 block w-full px-3 py-2 bg-transparent focus:outline-none focus:ring-[#29353c] border-b border-[#718B96] sm:text-sm mb-5"
          />
          {answerChoices.map((choice, choiceIndex) => (
            <div key={choiceIndex} className="mt-1">
              <input
                type="text"
                value={choice}
                placeholder="Type answer choice"
                onChange={(e) => handleAnswerChoiceChange(choiceIndex, e)}
                className="bg-[#F3F3F3] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#29353c] focus:border-[#29353c] sm:text-sm"
              />
            </div>
          ))}
          <button
            onClick={() => handleAddAnswerChoice()}
            className="mb-10 mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#718B96] hover:bg-[#29353c] focus:outline-none focus:ring-2  focus:ring-[#29353c]"
          >
            Add Answer Choice
          </button>
        </div>
   
    </div>
  );
}

export default MultipleChoice;
