const express =  require("express")
const mongoose = require("mongoose")
const port = 4000;
const app = express()

// middleware for json response
app.use(express.json())

// database configuration
const db = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/lap4dev");
        console.log("database coneected...");
    } catch (error) {
        console.log(error);
    }
}
db()

// applicants schema model 
const Applicants = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo : {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    }
})
const participant = mongoose.model('Applicants', Applicants)


// route for viewing all the participants who showed interest for the program
app.get("/", async (req, res, next) => {
    const  part = await participant.find();

    if (!part){
        return res.status(200).json({ message: "No participants found"});
    }

    return res.status(200).json({message: part});
})

 
// route for registering interest for the program
app.post("/register",  async (req, res, next) => {
    const { firstname, lastname, email, phoneNo, purpose } = req.body;

    if(!firstname || !lastname || !email || !phoneNo || !purpose){
        return res.status(400).json({
            message: "firstname, lastname, email, phoneNo and purpose fields are required!",
            Fields: {
                "firstname": "",
                "lastname": "",
                "email": "",
                "phoneNo": "",
                "purpose": ""}   
            }
        )
    }

    const participantsExist = await participant.findOne({email: email});

    if(participantsExist){
        return res.status(400).json({message: "participants already exist,", data: participantsExist})
    }

    const newParticipants = new participant({
        firstname : firstname, 
        lastname : lastname, 
        email : email, 
        phoneNo : phoneNo, 
        purpose : purpose
    })
    const participantCreated = await newParticipants.save();

    if(!participantCreated){
        console.log("could not save participant")
        return res.status(400).json({message: "Registration failed"});
    }

    return res.status(201).json({
        message: "Registration successful",
        data: participantCreated
    });
})

// route for inspecting number of participants that showed interest
app.get("/participants/count", async (req, res, next) => { 
    const participants = await participant.find().estimatedDocumentCount()

    if(!participants){
        return res.status(500).json({message: "Internal Server Error"});
    }

    return res.status(200).send({count: participants});
})

// Error handler for internal server error
app.use((req, res, next) => {
    const error = new Error('Resource Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// the listener configuration
app.listen(port, (err)=>{
    if(err) console.log(err);
    console.log(`Server is running on port ${port}`);
})