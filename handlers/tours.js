const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`dev-data/data/tours-simple.json`));

const writeFile = (template, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(template, data, (err) => {
            if (err) reject(err);
            resolve('Written to file!');
        });
    });
}

module.exports = {
    checkTourId: (req, res, next, val) => {
        let id = req.params.id * 1;
        if (id > data.length){
            return res.status(404).json({
                status: 'error',
                data: 'No record found!'
            })
        }
        next();
    },

    checkPostReq: (req, res, next) => {
        if (!(req.body.name && req.body.price)){
            return res.status(400).json({
                status: 'error',
                data: 'Bad request'
            })
        }
        next();
    },

    getAllTours: (req, res) => {
        res.status(200).json({
            status: 'success',
            count: data.length, 
            data: data
        });
    },
    
    getSingleTour: (req, res) => {
        let id = req.params.id * 1;
        const search = data.find(x => x.id === id);

        res.status(200).json({
            status: 'success',
            data: search
        })
    },


    createTour: (req, res) => {
        const newId = data[data.length-1].id + 1;
        req.body.id = newId
    
        data.push(req.body);        

        writeFile(`${global.path}/dev-data/data/tours-simple.json`, JSON.stringify(data)).then(data => {
            res.status(201).json({
                status: 'success',
                data: data
            });
        })
        .catch(err => {
            res.status(404).json({
                status: 'error',
                data: err
            });
        })
    },
    
    updateTour: (req, res) => {
        res.status(200).json({
            status: 'success',
            data: 'Record updated'
        })
    },

    deleteTour: (req, res) => {
        res.status(203).json({
            status: 'success',
            data: null
        })
    }
}
