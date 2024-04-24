


import React, { useState } from 'react';

function FormTakerCheckboxes({ questionsIndex, allQuestions, allResponses }) {
  const [selectedChoices, setSelectedChoices] = useState([]);

  const handleChoiceSelection = (choice) => {
    console.log(choice) 
    const isSelected = selectedChoices.includes(choice);
    let newSelectedChoices;

    if (isSelected) {
      newSelectedChoices = selectedChoices.filter((selected) => selected !== choice);
    } else {
      newSelectedChoices = [...selectedChoices, choice];
    }

    allResponses[questionsIndex] = newSelectedChoices;
    setSelectedChoices(newSelectedChoices);
    console.log(newSelectedChoices)
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
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            value={choice}
            checked={selectedChoices.includes(choice)}
            onChange={() => handleChoiceSelection(choice)}
            className="form-checkbox h-5 w-5 text-[#29353c] focus:ring-[#29353c] border-gray-300 rounded"
          />
          <span className="ml-2">{choice}</span>
        </label>
      </div>
      ))}
    </div>
  );
}

export default FormTakerCheckboxes;
