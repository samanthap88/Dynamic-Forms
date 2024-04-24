


export default function QuestionsButton({text, onClick}) {
    return (
        <div>
            <button
            onClick={onClick}
            className="border-2 px-5 py-2 shadow-sm "
            >
                {text}
            </button>
        </div>
    )
}