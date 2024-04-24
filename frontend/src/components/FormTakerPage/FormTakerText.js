

export default function FormTakerText({questionsIndex, allQuestions, allResponses}) {
    

    const handleInputChange = (e) => {
        allResponses[questionsIndex] = e.target.value
        console.log(allResponses[questionsIndex])
    };

    return (
        <div className=" w-[1000px] mx-auto mb-10">
            <input
                placeholder="Type your question"
                className="mt-1 block w-full  py-2 bg-transparent focus:outline-none focus:ring-[#29353c] text-lg"
                disabled
                value={allQuestions[questionsIndex].text}
            />
            <textarea
                placeholder="answer"
                rows="2"
                onChange={handleInputChange}
                className="w-full bg-white text-gray-600 border border-gray-300 rounded-md px-3 py-2"
            ></textarea>
        </div>
    )
}
