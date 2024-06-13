import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true); 

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };
    const navigate = useNavigate() ; 
    const location = useLocation() 
    console.log(location) 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const handleSignUpSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { email, password });
            console.log("response") 
            const userId = response.data.userId; 
            if (userId) {
                console.log("Login successful");
                
                if (location.state?.fromForm) {
                    const formId = location.state.formId
                    const redirectUrl = `/form/${formId}/${userId}`;
                    navigate(redirectUrl);
                } else {
                    
                    navigate(`/${userId}`);
                }
            } else {
                console.error('User ID not found in response data');
            }
        } catch (error) {
            console.error(error.response.data);
        }
            
        
    }


    console.log('API URL:', process.env.REACT_APP_API_URL)
    const handleLoginSubmit = async (e) => {
        e.preventDefault() 
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
              email,
              password
            });
            if (response.status === 200) {
                console.log("Login successful");
                const userId = response.data.userId;
                if (location.state?.fromForm) {
                    const formId = location.state.formId
                    const redirectUrl = `/form/${formId}/${userId}`;
                    navigate(redirectUrl);
                } else {
                    
                    navigate(`/${userId}`);
                }
            } else {
              console.log("Login failed");
            }
          } catch (error) {
            console.error("Error logging in:", error);
          }
        
    }
    return (
        <div className="flex bg-white">
            
            <div className={`w-[50%] absolute h-screen bg-[#40586F] transition-transform duration-500 ease-in-out transform ${isLogin ? 'translate-x-0' : 'translate-x-full'}`}></div>

            <form onSubmit={handleSignUpSubmit} className='flex flex-col h-screen justify-center items-center w-[50%]'>
                <p className="text-[48px]">Sign up</p>
                <div className="mt-[30px]">
                    <p className='text-[12px]'>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} className="rounded-[5px] w-[300px] h-[45px] border text-black p-5"></input>
                </div>
                <div className="mt-[30px]  w-[300px]">
                    <p className='text-[12px]'>Password</p>
                    <input type="password"onChange={(e) => setPassword(e.target.value)} className="rounded-[5px] w-[300px] h-[45px] border text-black p-5"></input>
                </div>
                <button type="submit" className=" mt-6 rounded-[5px] w-[300px] h-[45px] bg-[#24353e] text-white">Sign up</button>
                <button className="mt-10 text-[12px] bg-transparent" onClick={handleToggle}><span>Have an account? </span><span className='text-blue-500 underline'>Login</span></button>
            </form>
            <form onSubmit={handleLoginSubmit} className="flex h-screen flex-col justify-center items-center w-[50%]">
                <p className="text-[48px]">Login</p>
                <div className="mt-[30px]">
                    <p className='text-[12px]'>Username or Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} className="rounded-[5px] w-[300px] h-[45px] border text-black p-5"></input>
                </div>
                <div className="mt-[30px]  w-[300px]">
                    <div>
                        <p className='text-[12px]'>Password</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="rounded-[5px] w-[300px] h-[45px] border text-black p-5"></input>
                    </div>
                    <p className="text-[12px] text-right">Forgot Password?</p>
                </div>
                <button type="submit" className=" mt-6 rounded-[5px] w-[300px] h-[45px] bg-[#24353e] text-white">Login</button>
                <button className="mt-10 text-[12px] bg-transparent" onClick={handleToggle}><span>Are you new? </span><span className='text-blue-500 underline'>Sign up</span></button>
            </form>
        </div>
    )
}