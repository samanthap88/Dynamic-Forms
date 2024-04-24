import React, { useState} from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import Header from '../components/DashboardPage/Header';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import YourForms from '../components/DashboardPage/YourForms';
import TemplatesSection from '../components/DashboardPage/TemplatesSection';
import Responses from '../components/DashboardPage/Responses';
import FormsYouveEdited from '../components/DashboardPage/FormsYouveEdited';

function Dashboard() {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(() => localStorage.getItem('activeButton') || 'YourForms');
    const{username} = useParams() 

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        localStorage.setItem('activeButton', buttonName);
        if (buttonName === "Logout") {
            navigate('/login')
        }
    };
      
      
    return (
        <div  className='flex flex-row h-screen bg-[#f5f5f5]'>
            <div className='flex w-screen'>
                <div className='fixed flex flex-col gap-[5px] items-center w-[294px] p-10 bg-[#24353E] pt-[29px] h-full '>
                    <button
                        className={`flex items-center rounded-[8px] h-[40px] w-[271px] font-extrabold text-[16px] bg-[#24353E]  text-[#718B96] text-left ${
                            activeButton === 'Home' ? 'bg-[#40586F] ' : ''
                        }`}
                        onClick={() => handleButtonClick('Home')}
                    >
                        <HomeRoundedIcon className={`ml-[31px] w-[30px] h-[30px] ${activeButton === 'Home' ? 'text-white' : ''}`} />
                        <p className={` ml-[18px] ${activeButton === 'Home' ? 'text-white' : ''}`}>Home</p>
                    </button>
                    <button
                        className={`flex items-center rounded-[8px] h-[40px] w-[271px] font-extrabold text-[16px] bg-[#24353E] text-[#718B96] text-left ${
                            activeButton === 'YourForms' ? 'bg-[#40586F] ' : ''
                        }`}
                        onClick={() => handleButtonClick('YourForms')}
                    >
                        <DynamicFormIcon className={`ml-[31px] w-[30px] h-[30px] ${activeButton === 'YourForms' ? 'text-white' : ''}`} />
                        <p className={` ml-[18px] ${activeButton === 'YourForms' ? 'text-white' : ''}`}>Your forms</p>
                    </button>
                    <button
                        className={`flex items-center rounded-[8px] h-[40px] w-[271px] font-extrabold text-[16px] bg-[#24353E]  text-[#718B96] text-left ${
                            activeButton === 'Templates' ? 'bg-[#40586F] ' : ''
                        }`}
                        onClick={() => handleButtonClick('Templates')}
                    >
                        <ViewQuiltIcon className={`ml-[31px] w-[30px] h-[30px] ${activeButton === 'Templates' ? 'text-white' : ''}`} />
                        <p className={` ml-[18px] ${activeButton === 'Templates' ? 'text-white' : ''}`}>Templates</p>
                    </button>
                    <button
                        className={`flex items-center rounded-[8px] h-[40px] w-[271px] font-extrabold text-[16px] bg-[#24353E] text-[#718B96] text-left ${
                            activeButton === 'Responses' ? 'bg-[#40586F] ' : ''
                        }`}
                        onClick={() => handleButtonClick('Responses')}
                    >
                        <QuestionAnswerIcon className={`ml-[31px] w-[30px] h-[30px] ${activeButton === 'Responses' ? 'text-white' : ''}`} />
                        <p className={` ml-[18px] ${activeButton === 'Responses' ? 'text-white' : ''}`}>Responses</p>
                    </button>
                    
                    <button
                        className={`flex items-center rounded-[8px] h-[40px] w-[271px] font-extrabold text-[16px] bg-[#24353E] text-[#718B96] text-left ${
                            activeButton === 'FormsEdited' ? 'bg-[#40586F] ' : ''
                        }`}
                        onClick={() => handleButtonClick('FormsEdited')}
                    >
                    <BorderColorIcon className={`ml-[31px] w-[30px] h-[30px] ${activeButton === 'FormsEdited' ? 'text-white' : ''}`} />
                        <p className={` ml-[18px] ${activeButton === 'FormsEdited' ? 'text-white' : ''}`}>Forms you've edited</p>
                    </button>
                    <div className='flex flex-col mt-auto gap-0'>
                    <button
                        className={`flex items-center  rounded-[8px] h-[40px] w-[271px] font-extrabold text-[16px] bg-[#24353E] text-[#718B96] text-left ${
                            activeButton === 'Settings' ? 'bg-[#40586F] ' : ''
                        }`}
                        onClick={() => handleButtonClick('Settings')}
                    >
                        <SettingsRoundedIcon className={`ml-[31px] w-[30px] h-[30px] font-extrabold ${activeButton === 'Settings' ? 'text-white' : ''}`} />
                        <p className={` ml-[18px] ${activeButton === 'Settings' ? 'text-white' : ''}`}>Settings</p>
                    </button>
                    <button
                        className={`flex items-center  rounded-[8px] h-[40px] w-[271px] font-extrabold text-[16px] bg-[#24353E] text-[#718B96] text-left ${
                            activeButton === 'Logout' ? 'bg-[#40586F] ' : ''
                        }`}
                        onClick={() => handleButtonClick('Logout')}
                    >
                        <LogoutIcon className={`ml-[31px] w-[30px] h-[30px] ${activeButton === 'Logout' ? 'text-white' : ''}`} />
                        <p className={` ml-[18px] ${activeButton === 'Logout' ? 'text-white' : ''}`}>Logout</p>
                    </button>
                    </div>
                </div>
                <div className='flex-1 ml-[294px]  flex-col w-full'>
                    <Header username={username}/>
                    {activeButton === 'YourForms' && <YourForms setActiveButton={setActiveButton} />}
                    {activeButton === 'Templates' && <TemplatesSection/>}
                    {activeButton === 'Responses' && <Responses/>}
                    {activeButton === 'FormsEdited' && <FormsYouveEdited/>}
                    
                    
                    
                </div>
                
            </div>
            
        </div>
    );
}

export default Dashboard;
