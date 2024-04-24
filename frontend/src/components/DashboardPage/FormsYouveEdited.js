import {useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


export default function FormsYouveEdited() {
    const [responses, setResponses] = useState([]);
    const {username} = useParams();
    
    useEffect(() => {
        
        if (username) {
            const userId = username
            axios.get(`http://localhost:4000/forms/response/userId/${userId}`)
                .then((response) => {
                    setResponses(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching responses:', error);
                });
        }

    }, [username]);

    return (
        <div className="mx-auto">
            <table className="border-collapse border border-gray-200 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Form ID</th>
                        <th className="border border-gray-200 px-4 py-2">User ID</th>
                        <th className="border border-gray-200 px-4 py-2">Response Data</th>
                    </tr>
                </thead>
                <tbody>
                    {responses.map((response) => (
                        <tr key={response._id}>
                            <td className="border border-gray-200 px-4 py-2">{response.formId}</td>
                            <td className="border border-gray-200 px-4 py-2">{response.userId}</td>
                            <td className="border border-gray-200 px-4 py-2">{response.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
