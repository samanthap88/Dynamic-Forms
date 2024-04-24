
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
import { useState } from 'react';

import DeletePopUp from './DeletePopUp';

const MultipleChoice = ({title, options}) => {
    
    return (
        <div className='flex flex-col gap-1 '>
            <p className='w-full  border-b-[1px] border-black h-4 flex text-[8px]'>{title}</p>
            {options.map((option, index) => (
                <p className="h-4 bg-white rounded-[4px] text-[8px]"key={index}>{option}</p>
            ))}
        </div>
    )
}

const TextResponse = ({title}) => {
    return (
        <div className='flex flex-col gap-1'>
            <p className='h-4 border-b-[1px] border-black flex text-[8px]'>{title}</p>
            <textarea placeholder='description' disabled className='text-[8px] rounded-[4px] p-1 bg-white border-[1px]' ></textarea>

        </div>
    )
}

export default function FormCard({onClick, formTitle, formId, setForms, forms, questions}) {
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    
    const deleteForm = () => {
        axios
            .delete(`http://localhost:4000/forms/${formId}`)
            .then(() => {
                setForms(forms.filter(form => form._id !== formId))
            })
            .catch((error) => {
                console.error('Error deleting form:', error);
                alert('An error happened');
            });


            setShowDeletePopUp(false) 

        
    };

    
    return (
        
        <button type="button"  onClick={onClick} className="bg-[#f5f5f5] border-2 w-[363px] h-[235px] rounded-[8px] flex flex-col justify-between items-end">
            {showDeletePopUp && (
                <DeletePopUp
                    onCancel={() => setShowDeletePopUp(false)}
                    onConfirm={deleteForm}
                    title={formTitle}
                />
            )}
            <div className='w-full overflow-hidden p-8 '>
                <div className='bg-[#e6e6e6] border-2 flex flex-col gap-2 h-[200px] '>
                    <div className='bg-[#354057] text-white text-[8px] p-2 rounded-t-[6px]' >{formTitle}</div>
                    <div className='px-8 flex flex-col gap-2  '>
                        {questions.map((question, index) => (
                            <div key={index}>
                                {question.type === 'Multiple Choice' ? (
                                <MultipleChoice title={question.text} options={question.options} />
                                ) : (
                                <TextResponse title={question.text} />
                                )}
                            </div>
                        ))}

                    </div>
                    

                </div>
                
                
                
                
            </div>
            <div className='w-full border-t-2'>
                <h2 className='bg-white w-full rounded-b-[8px] h-10  flex justify-between items-center px-4 font-semibold'>
                <p >{formTitle}</p>
                                    
                <DeleteIcon onClick={(e) => {
                e.stopPropagation(); 
                setShowDeletePopUp(true) ;
                }}
                className="top-2 right-2 w-6 h-6 text-gray-400 hover:text-red-600 cursor-pointer" />
                </h2>

            </div>
            
                            
        </button>
        
    )
}