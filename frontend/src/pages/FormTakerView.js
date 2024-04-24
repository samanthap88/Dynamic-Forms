import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import FormTakerText from "../components/FormTakerPage/FormTakerText";
import FormTakerMultiple from "../components/FormTakerPage/FormTakerMultiple";
import DarkBlueButton from "../components/reuseable/DarkBlueButton";
import BlueButton2 from "../components/reuseable/BlueButton2";
import { Link } from "react-router-dom";
import FormTakerCheckboxes from "../components/FormTakerPage/FormTakerCheckboxes";


function FormTakerView() {
    const{formId, userId} = useParams() 
    const [title, setTitle] = useState('')
    const [questions, setQuestions] = useState([])
    const [responses] = useState([])

    const saveAndSubmitForm = () => {
        
        const answers = responses.map((response, index) => ({
            question: questions[index].text,
            response: response
        })) 
        console.log(answers) 
        console.log("this is answers")
        axios.post(`${process.env.REACT_APP_API_URL}/forms/response/${formId}`, { userId, answers })
        .then((response) => {
            console.log('Form submitted successfully:' , response.data) 
        })
        .catch((error) => {
            console.error('Error submitting form: ', error) 
        })
    }
 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/forms/id/${formId}`)
        .then((response) => {
          setTitle(response.data.title) 
          setQuestions(response.data.questions)
        })
        .catch((error) => {
          console.error('Error fetching forms:', error);
        });
      }, ); 



      return (
        <div className="flex flex-col items-center " >
            <div className='flex  bg-[#354057] w-full items-center justify-end py-4 pr-4'>
                
                {userId ? (
                    <p  className=" text-white border-l-2 h-full pl-4">{userId}</p>
                ) : (
                    <Link to={`/login`} state={{ fromForm: true, formId }}>
                        <BlueButton2 text="login" />
                    </Link>
                )}
                
            </div>
            <p className="text-3xl px-3  py-10 mx-auto mb-10  w-full flex justify-center">{title}</p>
            {questions.map((question,index) => (
                <div>
                    {question.type === 'Multiple Choice' && (
                        <FormTakerMultiple questionsIndex={index} allQuestions={questions} allResponses={responses}/>
                    )}
                    {question.type === 'Text Response' && (
                        <FormTakerText questionsIndex={index} allQuestions={questions} answers={questions.answer} allResponses={responses}/>
                    )}
                    {question.type === 'Checkboxes' && (
                        <FormTakerCheckboxes questionsIndex={index} allQuestions={questions} answers={questions.answer} allResponses={responses}/>
                    )}
                </div>
            ))}
            <DarkBlueButton onClick={saveAndSubmitForm} text="Save and Submit"/>
            
        </div>
      )
}

export default FormTakerView