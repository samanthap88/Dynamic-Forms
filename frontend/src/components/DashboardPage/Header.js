import { useNavigate} from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";


import DarkBlueButton from "../reuseable/DarkBlueButton";



import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header ({username}) {
    const navigate=useNavigate() 
    const [name, setName] = useState("")


    useEffect(() => {
        
        
        axios.get(`${process.env.REACT_APP_API_URL}/users/getUserByEmail/${username}`)
        .then((response) => {
            setName(response.data.userId)
            
        })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
        
        
      }, ); 

    
    const goToLogin = () => {
        navigate('/login')
    }
    const createNewForm = () => {
        console.log("this has been clicked")
        if (username) {
            axios.post(`${process.env.REACT_APP_API_URL}/forms`, {
              title: "",
              creator: username, 
              questions: [],
            })
            .then((response) => {
                
                navigate(`/editForm/${response.data._id}/${username}`);
            })
            .catch((error) => {
                console.error("Error creating form:", error);
            });

        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/forms`, {
              title: "",
              creator: "guest", 
              questions: [],
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
       <div className="w-full h-[82px] flex bg-white gap-4  pr-8 items-center justify-end border-2"> 
            <DarkBlueButton onClick={createNewForm} text="+ Create Form"/>
            { !username || username === "guest"? (
                <DarkBlueButton onClick={goToLogin} text="Login" />
               
            ): (
                
                <div className="flex text-sm items-center gap-2 border-l px-2 py-1 border-gray-400">

                    <AccountCircleIcon style={{ fontSize: 48 }} className="text-gray-500"/>
                    <p className="font-semibold">{name}</p>
                </div>
                
            )
        }
            
       </div>
    )
}