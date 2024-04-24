import React, { useState , useEffect} from 'react';
import MultipleChoice from './MultipleChoice';
import TextResponse from './TextResponse';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom"
import BlueButton2 from '../reuseable/BlueButton2';
import BackButton from '../reuseable/BackButton';
import QuestionsButton from '../reuseable/QuestionsButton';
import Text from './Text';
import Checkboxes from './Checkboxes';



import axios from 'axios' 


function DropdownMenu({formId, userId}) {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('')
  const [shareLink, setShareLink] = useState('')
  const [showLink, setShowLink] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate=useNavigate() 

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/forms/id/${formId}`)
    .then((response) => {
      
      setQuestions(response.data.questions)
      console.log(response.data.questions)
      setTitle(response.data.title) 
      
    })
    .catch((error) => {
      console.error('Error fetching questions:', error);
    });
  }, [formId]); 

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
   
  };

  const goToResponsePage = () => {
    navigate(`/responses/${formId}`)
  }

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  }

  
  
  const handleOptionClick = (option, index) => {

    let newQuestion;
    if (option === 'Multiple Choice') {
      newQuestion = { text: "", type: 'Multiple Choice', options: [''] };
    } else if (option === 'Text Response') {
      newQuestion = { text: "", type: 'Text Response' };
    } else if (option === 'Text') {
      newQuestion = { text: "", type: 'Text'}
    } else if (option === 'Checkboxes') {
      newQuestion = {text: "", type: 'Checkboxes', options: ['']}
    }


  const updatedQuestions = [...questions];
  updatedQuestions.splice(index + 1, 0, newQuestion); // Insert new question after the current question
  setQuestions(updatedQuestions);
  setShowDropdown(false);
  };
  
  const saveQuestions =  () => {
    const data= {
      title: title, 
      creator: userId, 
      questions: questions
    }

    if (title.trim().length === 0) {
      data.title = "Untitled form"
    }
    
    axios.put(`${process.env.REACT_APP_API_URL}/forms/id/${formId}`, data)
    .then(() => {
      if (userId) {
        navigate(`/${userId}`)
      }else {
        navigate(`/guest`)
      }
      
    })
    .catch((error) => {
      alert("an error happened")
      console.log(error) 
    })
  };

  const generateLink = () => {
    const link = `http://localhost:3000/form/${formId}`
    setShareLink(link) 
    setShowLink(!showLink);
  }

 
  
  

  return (
    <div>
      <div className='flex justify-between gap-2 pr-10 pl-10 pt-10 pb-10  bg-[#354057]'>
        <BackButton onClick={saveQuestions}text="Dashboard"/>
        <div className='flex gap-2'>
          <BlueButton2 onClick={saveQuestions} text="Save"/>
          <div>
              <BlueButton2 onClick={generateLink} text="Share"/>
              {showLink && <p>Share this link: {shareLink} </p>}
          </div>
          <BlueButton2 onClick={goToResponsePage} text="Responses"/>
        </div>
      </div>

      <div className='flex'>
        <div className='pl-5 bg-white w-[300px] pt-5 flex flex-col gap-5 h-screen' style={{ position: 'sticky',top:0,  left: 0,overflow: 'auto' }}>
          <p>Add Questions</p>
          <QuestionsButton text="Multiple Choice" onClick={() => handleOptionClick('Multiple Choice', questions.length)} />
          <QuestionsButton text="Text Response" onClick={() => handleOptionClick('Text Response', questions.length)} />
          <QuestionsButton text="Checkboxes" onClick={() => handleOptionClick('Checkboxes', questions.length)} />
        </div>

        <div className='flex flex-col w-full py-10 px-20 items-center'>
          <input
            placeholder='Title'
            onChange={(e) => handleTitleChange(e)}
            value={title}
            className=' text-center text-[36px] bg-transparent w-full mt-10 focus:outline-none focus:ring-[#29353c] border-b border-[#718B96] '
            >
          </input>
          {questions.map((question, index) => (
            <div className="flex flex-col items-center mt-10 w-full" key={index}>
              <div className='flex ml-auto mr-auto w-full mb-10 '>
                <DeleteIcon onClick={() => deleteQuestion(index)} className='mr-2 mt-2.5 w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer'/>
                
                <p className="mt-2.5 text-gray-500">{index + 1}.</p>
                
                {question.type === 'Multiple Choice' && (
                  <MultipleChoice questionsIndex={index} allQuestions={questions}/>
                )}
                {question.type === 'Text Response' && (
                  <TextResponse questionsIndex={index} allQuestions={questions}/>
                )}
                {question.type === 'Text' && (
                  <Text questionsIndex={index} allQuestions={questions}/>
                )}
                {question.type === 'Checkboxes' && (
                  <Checkboxes questionsIndex={index} allQuestions={questions}/>
                )}
                
              </div>
              <div className='flex flex-row w-full   justify-center items-center '>
                <hr className='w-full border-gray-400'></hr>
                <div>
                  <button className="bg-gray-300 hover:bg-[#768a96] ml-4 mr-4 text-white px-4 py-2 rounded-full flex items-center"onClick={() => setShowDropdown(showDropdown === index ? null : index)}>
                    <p>+</p>
                  </button>

              
                  {showDropdown === index && (
                    <div className='absolute bg-white mt-4 p-2 flex flex-col gap-2'>
                      <button onClick={() => handleOptionClick('Multiple Choice', index)}>Multiple Choice</button>
                      <button onClick={() => handleOptionClick('Text Response', index)}>Text Response</button>
                      <button onClick={() => handleOptionClick('Text', index)}>Text</button>
                      <button onClick={() => handleOptionClick('Checkboxes', index)}>Checkboxes</button>
                    </div>
                  )}
                </div>
                <hr className='w-full border-gray-400 '></hr>
                

            
                
              </div>
            
              
                
      
              
            </div>
          ))}
        </div>
      
      </div>

      


      
    </div>
  );
}

export default DropdownMenu;
