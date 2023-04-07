const Tour = require('../models/tourModel');

module.exports = {
    getAllTours: async (req, res) => {
        try {
            const getTours = await Tour.find();
            res.status(200).json({
                status: 'success',
                count: getTours.length,
                data: getTours
            });
        }
        catch(err){
            res.status(404).json({
                status: 'fail',
                message: err
            })
        }
    },
    
    getSingleTour: async (req, res) => {
        try{
            const getTour = await Tour.findById(req.params.id);
            if (getTour != null){
                res.status(200).json({
                    status: 'success',
                    data: getTour
                });
            }
            else {
                res.status(404).json({
                    status: 'fail',
                    message: 'No record found'
                });
            }
            
        }
        catch(err){
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }
    },

    createTour: async (req, res) => {
        try {
            const newTour = await Tour.create(req.body);
            res.status(201).json({
                status: 'success',
                data: newTour
            });
        }
        catch(err){
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }  
    },
    
    updateTour: (req, res) => {
        res.status(200).json({
            status: 'success',
            data: 'Record updated'
        })
    },

    deleteTour: async (req, res) => {
        try{
            const delTour = await Tour.findByIdAndDelete(req.params.id);
            if (delTour != null){
                res.status(203).json({
                    status: 'success',
                    data: delTour
                })
            }
            else {
                res.status(404).json({
                    status: 'fail',
                    data: 'Record does not exist!'
                })
            }
        }
        catch(err){
            res.status(400).json({
                status: 'fail',
                data: err
            })
        }
    }
}
