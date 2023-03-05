const express = require('express');
const fs = require('fs');
const app = express();
//use middleware to get data for post requests
app.use(express.json());

const writeToFile = (template, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(template, data, (err) => {
            if (err) reject(err);
            resolve('Written to file!');
        });
    });
}

const data = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//routes
const BASE_URL = '/api';
app.get(`${BASE_URL}/tours`, (req, res) => {
    res.status(200).json({
        status: 'success',
        count: data.length, 
        data: data
    });
});

app.get(`${BASE_URL}/tours/:id`, (req, res) => {
    let id = req.params.id * 1;
    const search = data.find(el => el.id === id);

    if (search == undefined) {
        return res.status(404).json({
            status: 'error',
            data: 'No record found!'
        })
    }
 
    res.status(200).json({
        status: 'success',
        data: search
    })
});



app.post(`${BASE_URL}/tours`, (req, res) => {
    const newId = data[data.length-1].id + 1;
    req.body.id = newId

    data.push(req.body);
    
    writeToFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(data)).then(output => {
        res.status(201).json({
            status: 'success',
            data: output
        })
    })
    .catch(err => {
        res.status(404).json({
            status: 'error',
            data: err
        })
    })
});

const port = 8000;
app.listen(port, '127.0.0.1', () => {
    console.log(`listening on port ${port}`);
});