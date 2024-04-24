import mongoose from "mongoose"  
import { Schema } from "mongoose"
const responseSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Form'
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User' 
    }, 
    answers: [
        {
            question: {
                type: String, 
            }, 
            response: {
                type: Schema.Types.Mixed,
            }
        }
    ]
})

export const Response = mongoose.model('Response', responseSchema) 

