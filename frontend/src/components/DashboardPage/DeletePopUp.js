import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function DeletePopUp({ onCancel, onConfirm, title }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
            <div className="bg-white p-10 rounded-md shadow-md ">
                <DeleteOutlineIcon style={{ fontSize: 36}}   className='text-[#D40C01] p-2 mb-2 bg-[#FFE9E7] rounded-full'/>
                <p className="text-lg font-extrabold mb-4">Are you sure? <br/>
                <p className="font-normal text-sm">You are about to delete "{title}"</p> </p>
                <div className="flex justify-center">
                    <button className="bg-[#FFE9E7] hover:bg-[#D40C01] hover:text-[#FFE9E7] text-[#D40C01] px-4 py-2 mr-2 rounded font-semibold" onClick={(e) => {
                        e.stopPropagation(); 
                        onConfirm(); 
                    }}>Yes, Delete</button>
                    <button className="bg-[#DCEBF8] hover:bg-[#718B96] hover:text-[#DCEBF8] text-[#718B96] px-4 py-2 rounded font-semibold" onClick={(e) => {
                        e.stopPropagation();
                        onCancel();
                    }}>No, Cancel</button>
                </div>
            </div>
        </div>
    );
}