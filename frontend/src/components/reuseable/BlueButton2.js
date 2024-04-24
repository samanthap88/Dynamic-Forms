


export default function BlueButton2 ({text, onClick}) {
    return (
        <div>
            <button onClick={onClick} className="rounded-lg bg-[#354057] border px-5 text-white border-[#646D7F] h-8">
                {text}
            </button>
        </div>
    )
}