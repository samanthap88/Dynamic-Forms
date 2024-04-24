
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
export default function BackButton({text, onClick}) {
    return (
        <div >
            
            <button onClick={onClick} className='text-white flex gap-2 items-center'>
                <ArrowBackIosNewRoundedIcon style={{ fontSize: 20}} className='text-white font-semibold'/>
                {text}
            </button>
        </div>
    )
}