const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const toursRoute = require(`${__dirname}/routes/tourRoute.js`);
global.path = path.join(__dirname); //path of directory

//env inclusion
dotenv.config({path: './config.env'})

//MIDDLEWARE
app.use(express.json()); //to get data through req.body

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')); //shows logs in console e.g. POST url status code etc
}

//CONNECTION TO DATABASE
const DB = process.env.DATABASE_USERNAME.replace(
    '<DATABASE_NAME>',
    process.env.DATABASE_NAME
);
mongoose.connect(DB).then(() => {
    console.log('DB connected successfully!');
})
.catch(err => {
    console.log(`Errors: ${err}`);
});

app.use(express.static(`${__dirname}/public`)); //display static or html images to browser

//ROUTES
app.use('/api/tours', toursRoute);

const port = process.env.PORT;
app.listen(port, process.env.BASE_URL, () => {
    console.log(`listening on port ${port}`);
});