import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';




export default function Template ({title, image}) {
    const{username} = useParams() 
    const navigate = useNavigate() 

    const createNewForm = () => {

        
        let questions = [] 
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
                    options: ["Website", "Friend", "Newsletter", "Advertisement"]
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

        
        if (username) {
            console.log(questions) 
            console.log(username) 
            console.log(title)
            axios.post(`${process.env.REACT_APP_API_URL}/forms`, {
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
            axios.post(`${process.env.REACT_APP_API_URL}/forms`, {
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
        <button onClick={createNewForm} className="flex flex-col w-[169px] h-[139px] bg-[#f5f5f5] rounded-[8px] items-center border-2">
            <img className="h-[103px] p-4 "src={image}/>
            <p className=" font-bold bg-white w-full h-full border-t-2 rounded-b-[8px] flex items-center justify-center">{title}</p>
        </button>
    )
}