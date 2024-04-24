import mongoose from "mongoose" ; 

const formSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.Mixed, 
        ref: 'User',
        default: "guest" 
    },
    questions: [
    {
      text: {
        type: String,
      },
      type: {
        type: String,
      },
      options: {
        type: [String]
      },
    },
    ], 
});

export const Form = mongoose.model('Form', formSchema);
export const Template = mongoose.model('Template', formSchema);
