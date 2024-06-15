import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import BackButton from "../components/reuseable/BackButton"

export default function Responses() {
    const [form, setForm] = useState({})
    const [responses, setResponses] = useState([])
    const [tableData, setTableData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/forms/id/${id}`)
        .then((response) => {
            setForm(response.data)
        })
        .catch((error) => {
            console.error("error fetching form", error) 
        })
    }, [id]) 

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/forms/response/formId/${id}`)
        .then((response) => {
            setResponses(response.data)

        })
        .catch((error) => {
            console.error("error fetching responses: ", error) 
        })
    }, [id]) 

    useEffect(() => {
        const newTableData = {};
        responses.forEach((response) => {
            if (!newTableData[response._id]) {
                console.log(response._id)
                newTableData[response._id] = {};
            }
            response.answers.forEach((answer) => {
                
                newTableData[response._id][answer.question] = answer.response;
                console.log(newTableData)
            });
        });
        setTableData(newTableData);
    }, [responses]);
    

    const goToForm = () => {
        window.history.back();
    }

    return (
        <div className="flex flex-col items-center gap-5 ">
            <div className="flex w-full  gap-2 py-4 px-10 bg-[#354057]">
                <BackButton onClick={goToForm} text="back to form"/>
            </div>
            <div className="w-full p-10 flex flex-col items-center ">
                <p className="text-3xl mb-10">{form.title}</p>
                {responses.length === 0 && (
                    <p className="text-center mt-4">{"There are no responses yet :("}</p>
                )}
                {form.questions && responses.length > 0 && (
                    <div className="p-10 bg-white rounded-[20px]">
                        <table className="border-collapse w-full ">
                            <thead>
                                <tr>
                                    <th className="border-b-2  p-2"></th>
                                    {form.questions.map((question, index) => (
                                        <th key={index} className="border-b-2 p-2 text-left">{question.text}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {responses.map((response, responseIndex) => (
                                    <tr key={responseIndex}>
                                        
                                        {form.questions.map((question, questionIndex) => (
                                            <td key={questionIndex} className="border-b-2  p-2">
                                                {tableData[response._id] && tableData[response._id][question.text]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                )}

            </div>
            
        </div>
    )
}
