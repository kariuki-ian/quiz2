const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;
const Student_Schema = new Schema({
  name: { type: String, required: true },
  studentID: { type: Number, required: true }
});

// Create a Model object
const Student = mongoose.model("w24students",Student_Schema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});



app.post('/', async (req, res) => {

  // get the data from the form
  const url = req.body.myuri;
  const name = "Ian Kariuki";
  const studentID = 300356109
  // connect to the database and log the connection
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error("Failed to connect to MongoDB", err));
  // add the data to the database
  const newStudent = new Student({
    name,
    studentID

  });
  newStudent.save()
  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
