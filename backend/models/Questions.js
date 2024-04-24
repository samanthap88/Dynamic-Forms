import mongoose from "mongoose" ; 

const questionSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true 
    },
    type: {
        type: String, 
        required: true 
    }
},  
    {
    timestamps: true, 
    }
    
);

export const Question = mongoose.model('Question', questionSchema);

