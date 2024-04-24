



export default function DarkBlueButton ({onClick, text}) {
    return (
        <button 
        onClick={onClick} 
        className="bg-[#40586F] text-white h-10 px-4 py-2 rounded-lg font-bold">
            {text}
        </button>
    )
}