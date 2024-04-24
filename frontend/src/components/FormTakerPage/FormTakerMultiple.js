import React, { useState } from 'react';

function FormTakerMultiple({ questionsIndex, allQuestions, allResponses }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelection = (choice) => {
    allResponses[questionsIndex] = choice;
    console.log(allResponses[questionsIndex])
    setSelectedChoice(choice);
  };

  return (
    <div className="w-[1000px] mr-auto ml-auto">
      <input
                placeholder="Type your question"
                className="mt-1 block w-full  py-2 bg-transparent focus:outline-none focus:ring-[#29353c] text-lg"
                disabled
                value={allQuestions[questionsIndex].text}
        />
      {allQuestions[questionsIndex].options.map((choice, choiceIndex) => (
        <div key={choiceIndex} className="mt-1 mb-2">
          <button
            onClick={() => handleChoiceSelection(choice)}
            className={`${
              selectedChoice === choice
                ? 'bg-[#aac7d8] text-white'
                : 'bg-[#F3F3F3] text-black'
            } w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#29353c]  sm:text-sm`}
          >
            {choice}
          </button>
        </div>
      ))}
    </div>
  );
}

export default FormTakerMultiple;
