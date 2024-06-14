import React, { useState, useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';

import Template from './Template';
import FormCard from './FormCard';

import axios from 'axios';
function YourForms({setActiveButton}) {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);

    const{username} = useParams() 

    const goToTemplates = () => {
        setActiveButton("Templates")
    }
  
    console.log("this is happening ")


    const goToForm = (id) => {
        navigate(`/editForm/${id}/${username}`);
    }
    console.log(`${process.env.REACT_APP_API_URL}`)
    useEffect(() => {
        if (username) {
            axios.get(`${process.env.REACT_APP_API_URL}/forms/username/${username}`)
            .then((response) => {
                console.log("i got the forms")
                setForms(response.data)
            })
            .catch((error) => {
                console.error('Error fetching forms:', error);
            });
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/forms/username/guest`)
            .then((response) => {
                setForms(response.data)
            })
            .catch((error) => {
                console.error('Error fetching forms:', error);
            });
        }
        
      }, ); 
      
      
    return (
        <div className='flex flex-col w-full'>
            <div className='h-[240px] bg-white flex flex-col'>
                <div className='mx-auto'>
                    <div className='flex items-center mt-4 justify-between'>
                        <p className='font-bold '>Templates</p>
                        <button onClick={goToTemplates}className='text-sm '>{"View all >"}</button>

                    </div>
                    
                    <div className='flex flex-row gap-[26px] mt-[23px] mb-6  '>
                        <Template title="Quiz" image="/templateImages/quiz.png"/>
                        <Template title="Contact" image="/templateImages/contact.webp"/>
                        <Template title="RSVP" image="/templateImages/eventInvite.png"/>
                        <Template title="Survey" image="/templateImages/survey.webp"/>
                        <Template title="Orders" image="/templateImages/orders.png"/>
                        <Template title="Invitation" image="/templateImages/invitation.webp"/>
                    </div>

                </div>
               
            </div>
            <div className='bg-[#f5f5f5] grid grid-cols-3 gap-y-[27px] mt-[96px] mx-auto gap-x-[30px]'>
                {forms.map(form => (
                    <FormCard 
                    onClick={() => goToForm(form._id)} 
                    formTitle={form.title}
                    formId ={form._id}
                    forms={forms}
                    setForms={setForms}
                    questions={form.questions}/>
                    ))}
                        
                        
                    
            </div>
        </div>
                
           
            
    );
}

export default YourForms;
