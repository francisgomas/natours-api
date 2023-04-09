const Tour = require('../models/tourModel');

module.exports = {
    getAllTours: async (req, res) => {
        try {            
            //FILTER
            const queryObj = { ...req.query }; //assigns a copy of req.query, if directly assigned it would be passed by ref and not value
            const exceptions = ['page', 'sort', 'limit', 'fields'];
            exceptions.forEach(x => delete queryObj[x]);
            let getTours = Tour.find(queryObj);            

            //SORT
            if (req.query.sort){
                const sortBy = req.query.sort.split(',').join(' ');
                getTours = getTours.sort(sortBy);
            }
            else {
                getTours = getTours.sort('-createdAt');
            }

            //SELECTED FIELDS IN RESULT ONLY
            if (req.query.fields){
                const fields = req.query.fields.split(',').join(' ');
                getTours = getTours.select(fields);
            }
            else {
                getTours = getTours.select('-__v');
            }

            const result = await getTours;
            res.status(200).json({
                status: 'success',
                count: result.length,
                data:  result
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
    
    updateTour: async (req, res) => {
       try{
            const changeTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            if (changeTour != null){
                res.status(200).json({
                    status: 'success',
                    data: changeTour
                });
            }
            else {
                res.status(404).json({
                    status: 'fail',
                    message: 'Unable to update or id not found. Error has occured!'
                });
            }
       }
       catch(err){
            res.status(404).json({
                status: 'fail',
                message: err
            });
       }
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
