import { useState } from "react";

export default function TextResponse ({questionsIndex, allQuestions}) {
    const [text, setText] = useState(allQuestions[questionsIndex].text);

    const handleInputChange = (e) => {
        setText(e.target.value);
        const updatedQuestions = [...allQuestions];
        updatedQuestions[questionsIndex].text = e.target.value;
    };

    return (
        <div className="w-full mb-10 ">
            <input
                placeholder="Type your question"
                className="mt-1 block w-full px-3 py-2 bg-transparent focus:outline-none focus:ring-[#29353c] border-b border-[#718B96] sm:text-sm mb-5"
                onChange={handleInputChange}
                value={text}
            />
            <textarea
                placeholder="answer"
                rows="2"
                disabled
                className="w-full bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-3 py-2"
            ></textarea>
        </div>
    )
}
