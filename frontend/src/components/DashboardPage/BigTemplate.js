import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

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


export default function BigTemplate ({title}) {
    const{username} = useParams() 
    const navigate = useNavigate() 
    
    let questions = [
        {text: 'Question 1',type: 'Multiple Choice',options: ['Option 1', "Option 2"],answers: ['Option 1', "Option 2"]},
        {text: 'Question 2',type: 'Multiple Choice',options: ['Option 1', "Option 2"],answers: ['Option 1', "Option 2"]}, 
        {text: 'Question 3',type: 'Multiple Choice',options: ['Option 1', "Option 2"],answers: ['Option 1', "Option 2"]}, 
    ]

    if (title === "Quiz") {
        questions = [
            {text: 'Question 1',type: 'Multiple Choice',options: ['Option 1', "Option 2"],answers: ['Option 1', "Option 2"]},
            {text: 'Question 2',type: 'Multiple Choice',options: ['Option 1', "Option 2"],answers: ['Option 1', "Option 2"]}, 
            {text: 'Question 3',type: 'Multiple Choice',options: ['Option 1', "Option 2"],answers: ['Option 1', "Option 2"]}, 
        ]
    }
    if (title === "Contact") {
        questions = [
            {text: 'What is your name',type: 'Text Response'},
            {text: 'Email',type: 'Text Response'}, 
            {text: "Address", type: "Text Response"}, 
            {text: "Phone Number", type: "Text Response"}
        ]
    }
    if (title === "RSVP") {
        questions = [
            {text: 'What is your name',type: 'Text Response',},
            {
                text: 'Can You attend?',
                type: 'Multiple Choice',
                options: ['Yes, I\'ll be there', "Sorry, can't make it"],
                answers: ['Yes, I\'ll be there', "Sorry, can't make it"]
            }, 
            {
                text: "What are the names of people attending?", 
                type: "Text Response", 
            }, 
            {
                text:"How did you hear about this event?", 
                type: "Multiple Choice", 
                options: ["Website", "Friend", "Newsletter", "Advertisement"],
                answers: ["Website", "Friend", "Newsletter", "Advertisement"]
            }, 
            {
                text: "Comments and/or questions" , 
                type: "Text Response"
            }
        ]
    }

    if (title === "Surveys") {
        questions = [
            {text: 'How satisfied were you with this event?',type: 'Text Response'},
            {text: 'How relevant and helpful do you think it was for your job?',type: 'Text Response'}, 
            {text: 'What were your key takeaways?',type: 'Text Response'},
            {text: 'Additional feedback',type: 'Text Response'},
        ]
    }
    if (title === "Orders") {
        questions = [
            {text: 'What is your name',type: 'Text Response'},
            {text: 'What item would you like to order?',type: 'Text Response'},
            {text: 'What color(s) would you like to order?',type: 'Text Response'},
            {text: 'What size?',type: 'Text Response'},
            {text: 'What is your phone number?',type: 'Text Response'},
            {text: 'Question and comments',type: 'Text Response'},
        ]
    }
    if (title === "Invitation") {
        questions = [
            {text: 'What is your name',type: 'Text Response'},
            {text: 'Can you attend?',type: 'Text Response'},
            {text: 'How many of you are attending?',type: 'Text Response'},
            {text: 'What will you be bringing?',type: 'Text Response'},
            {text: 'Do you have any allergies?',type: 'Text Response'},
        ]

    }

    const createNewForm = () => {

        

        
        if (username) {
            console.log(questions) 
            console.log(username) 
            console.log(title)
            axios.post("http://localhost:4000/forms", {
            title: title,
            creator: username, 
            questions: questions,
            })
            .then((response) => {
                
                navigate(`/editForm/${response.data._id}/${username}`);
            })
            .catch((error) => {
                console.error("Error creating form:", error);
            });

        } else {
            axios.post("http://localhost:4000/forms", {
            title: title,
            creator: "guest", 
            questions: questions,
            })
                .then((response) => {
                
                navigate(`/editForm/${response.data._id}/guest`);
            })
            .catch((error) => {
                console.error("Error creating form:", error);
            });

        }
        
    }
    return (
        <button onClick={createNewForm} className="flex flex-col w-[362px] h-[332px] bg-[#f5f5f5] rounded-[8px] border-2 p-5 hover:cursor-pointer">
            <div className='bg-[#e6e6e6] w-full overflow-hidden h-full rounded-[6px]'>
                <div className='bg-[#e6e6e6] border-2 flex flex-col gap-2 '>
                    <div className='bg-[#354057] text-white text-[8px] p-2 rounded-t-[6px]' >{title}</div>
                    <div className='px-8 flex flex-col gap-2  overflow-hidden'>
                        {questions.map((question, index) => (
                            <div key={index}>
                                {question.type === 'Multiple Choice' ? (
                                <MultipleChoice title={question.text} options={question.answers} answers={question.answers}/>
                                ) : (
                                <TextResponse title={question.text} />
                                )}
                            </div>
                        ))}

                    </div>
                    

                </div>
                
                
                
                
            </div>
            <p className=" font-bold  mt-5 w-full rounded-b-[8px]  flex justify-start">{title}</p>
        </button>
    )
}