
import { useState } from "react";

export default function Text ({questionsIndex, allQuestions}) {
    const [text, setText] = useState(allQuestions[questionsIndex].text);


    const handleInputChange = (e) => {
        setText(e.target.value);
        const updatedQuestions = [...allQuestions];
        updatedQuestions[questionsIndex].text = e.target.value;
    };
    return (


            <div className="w-full mb-10">
                <textarea
                    placeholder="answer"
                    rows="2"
                    onChange={handleInputChange}
                    value={text}
                    className="w-full bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-3 py-2"
                ></textarea>
            </div>
 
    )
}