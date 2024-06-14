
import express from 'express'
import {PORT, mongoDBURL} from './config.js'
import mongoose from 'mongoose'
import cors from 'cors';
import {Form} from './models/Forms.js'
import { User } from './models/Users.js';
import {Response} from './models/Responses.js'
import { Template } from './models/Forms.js';
import dotenv from "dotenv" ; 

import bcrypt from 'bcrypt'

const app = express();
dotenv.config() ; 
app.use(express.json());

const port = process.env.PORT 


app.get("/", (req, res) => {
  res.send("Hello App API") ; 
})

const corsOptions = {
  origin: ['http://localhost:3000', 'https://forms-gwa0m2zte-samanthap88s-projects.vercel.app', 
    'https://dynamic-forms-jn7uqr0gc-samanthap88s-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));



// Handle preflight requests
app.options('*', cors(corsOptions));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('App connected to database') 
    app.listen(port, () => {
      console.log("connection to db & listening on port", port)
    })
  })
  .catch((error) => {
    console.log(error) 
  })

app.post('/forms', async (req, res) => {
      try {
        if (!req.body) {
          return res.status(400).send({
            message: 'send all required fields: title, creator, questions', 
          });
        }
       
        const newForm = {
          title: req.body.title, 
          creator: req.body.creator || 'guest', 
          questions: req.body.questions
        };

        const form = await Form.create(newForm);
        return res.json(form);
      } catch (error) {
        console.error('Error saving question:', error);
        res.status(500).json({ message: 'Failed to save question' });
      }
  });


app.get('/forms/id/:formId', async (req, res) => {
  try {
    
    const {formId} = req.params
    const form = await Form.findById(formId)
    return res.status(200).json(form)
  } catch (error) {
    console.log(error.message) ; 
    res.status(500).send({message: error.message})
  }
})

app.get('/forms/username/:username', async (req, res) => {
  try {
    const { username } = req.params; 
    const forms = await Form.find({ creator: username});
    res.status(200).json(forms);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
});
   
app.delete('/forms/:id', async (req, res) => {
  try {
    const {id} = req.params
    await Form.findByIdAndDelete(id) 
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch(error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ message: 'An error occurred while deleting the form' });
  }
  
})
app.put('/forms/id/:id', async (req, res) => {
  try {
    const {id} = req.params  
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title: req.body.title , 
       creator: req.body.creator , 
       questions: req.body.questions},
      { new: true }
  );
  res.status(200).json(updatedForm)
  } catch (error) {
    console.log(error.message) 
    res.status(500).send({message: error.message})
  }
})

app.post('/signup', async (req, res) => {
  try {
    const {email, password} = req.body 
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({message: "Email already registered"})
    }

    const hashedPassword = await bcrypt.hash(password,10) 

    const newUser = new User({
      email: req.body.email, 
      password: hashedPassword
    })
    await newUser.save() 

    res.status(201).json({userId: newUser._id})
  } catch (error) {
    console.error("Error registering user:", error) 
    res.status(500).json({message: 'Failed to register user'})
  }
})


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({userId: user._id });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to log in user' });
  }
});


app.get('/users/getUserByEmail/:username', async (req, res) => {
  const { username} = req.params;
   

  try {

    if (!username || username === "guest" || username === "undefined") {
      return res.status(200).json({ userId: 'guest' });
    }
    const user = await User.findOne({_id: username}) 
    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }
    
    res.status(200).json({userId: user.email})
  } catch (error) {
    console.error("Error finding user by email:", error)
    res.status(500).json({message: 'Internal server error'})
  }
})

app.post('/forms/response/:formId', async (req, res) => {
  const formId = req.params.formId 
  console.log(req.body.answers)
  try {
    const response = new Response({
      formId, 
      answers:req.body.answers, 
      userId: req.body.userId
    })
    await response.save() 
    await Form.findByIdAndUpdate(formId, {$push: {response: response._id}})
    res.status(201).json({message: 'Form submitted successfully', response})
  } catch (error) {
    console.error("error submitting form: ", error) 
    res.status(500).json({message: 'an error occured while submitting the'})
  }
})


app.get('/forms/response/userId/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const responses = await Response.find({userId: userId });
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'An error occurred while fetching responses' });
  }
});

app.get('/forms/response/formId/:id', async (req,res) => {
  const formId =req.params.id
  try {
    const responses = await Response.find({ formId: formId });
    res.status(200).json(responses);
} catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'An error occurred while fetching responses' });
}
});



app.post('/templates', async (req, res) => {
  try {
      const newTemplate = new Template(req.body);
      const savedTemplate = await newTemplate.save();
      res.status(201).json(savedTemplate);
  } catch (error) {
      res.status(500).json({ error: 'Failed to save template' });
  }
});









