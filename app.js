const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const morgan = require('morgan');
const toursRoute = require(`${__dirname}/routes/tours.js`);
global.path = path.join(__dirname); //path of directory

//MIDDLEWARE
app.use(express.json()); //to get data through req.body
app.use(morgan('dev')); //shows logs in console e.g. POST url status code etc
app.use(express.static(`${__dirname}/public`)); //display static or html images to browser

app.use((req, res, next) => {
    console.log('this is the middleware');
    next();
})

//GET DATA FROM FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));


const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        count: users.length,
        data: users
    })
}

const getSingleUser = (req, res) => {
    const search = users.find(x => x._id === req.params.id);

    if (!search){
        return res.status(404).json({
            status: 'error',
            message: 'Record does not exist!'
        });
    }

    res.status(200).json({
        status: 'success',
        data: search
    })
}

const createUser = (req, res) => {
    const id = users[users.length-1]._id;
    req.body.id = id;
    
    users.push(req.body);

    writeToFile(`${__dirname}/dev-data/data/users.json`, users).then(data => {
        res.status(200).json({
            status: 'success',
            message: data
        })
    })
    .catch(err => {
        res.status(404).json({
            status: 'error',
            data: err
        })
    })
}


//ROUTES
const usersRoute = express.Router();

app.use('/api/tours', toursRoute);
app.use('/api/users', usersRoute);


usersRoute.route('/').get(getAllUsers).post(createUser);
usersRoute.route('/:id').get(getSingleUser)



//SERVER
const port = 8000;
app.listen(port, '127.0.0.1', () => {
    console.log(`listening on port ${port}`);
});