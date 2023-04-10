const express = require('express');
const cors = require('cors');
const app = express();
const PORT =  4000;
const { Novu } = require("@novu/node");
const novu = new Novu("42f8432116fab84045ac4c23ab629f6e");

//An array containing all the users
const users = [];

//generate a random string as id
const generateID = () => Math.random().toString(36).substring(2, 10)

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({message: "Hello World!"});
});

app.post("/api/register", (req, res) => {
    //get the user's credentials
    const { email, password, tel, username } = req.body;

    //checks if there is an existing user with the same email or password
    let result = users.filter((user) => user.email === email || user.tel === tel);
    
    //if no user exists
    if(result.length === 0) {
        //creates the structure for the user
        const newUser = { id: generateID(), email, password, username, tel };
        //Adds the user to the array of users
        users.push(newUser);
        //returns a message to the user
        return res.json({ message: "Account created successfully"});
    }
    //runs if the user already exists
    res.json({
        error_message: "User already exists",
    })
})

app.post('/api/login', (req, res) => {
    //accepts the user's email and password
    const { email, password } = req.body;
    //checks for the user(s) with the same email and password
    let result = users.filter((user) => user.email === email && user.password === password);

    //if no user is found, it returns an error message
    if(result.length !== 0) {
        return res.json({
            error_message: "Invalid credentials"
        });
    }
    //returns the username of the user after a successful login
    res.json({
        message: "Login successful",
        data: {
            username: result[0].username,
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});