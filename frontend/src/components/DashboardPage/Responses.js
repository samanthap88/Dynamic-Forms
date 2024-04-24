import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import BlueButton2 from "../reuseable/BlueButton2";

export default function Responses() {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);

    const { username } = useParams();

    const goToResponses = (id) => {
        navigate(`/responses/${id}`);
    };

    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:4000/forms/username/${username}`)
                .then((response) => {
                    setForms(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching forms:', error);
                });
        } else {
            axios.get(`http://localhost:4000/forms/username/guest`)
                .then((response) => {
                    setForms(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching forms:', error);
                });
        }

    }, [username]);

    return (
        <div className="mx-auto">
            <table className="border-collapse border border-gray-200 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Title</th>
                        
                        <th className="border border-gray-200 px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((form) => (
                        <tr key={form._id}>
                            <td className="border border-gray-200 px-4 py-2">{form.title}</td>
                            
                            <td className="border border-gray-200 px-4 py-2 flex justify-center">
                                <BlueButton2
                                    text="View Responses"
                                    onClick={() => goToResponses(form._id)}
                                    
                                />
                                    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
