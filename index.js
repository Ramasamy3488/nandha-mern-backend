const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conn = require('./db');

conn.connectDB();

const app = express();

app.use(cors({
  origin: "*"   // Or your frontend domain
}));

app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

const studentRoute = require('./routes/student-route')

app.use("/v1/api/students",studentRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);

});
