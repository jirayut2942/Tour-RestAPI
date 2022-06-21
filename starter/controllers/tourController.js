const { query } = require('express');
const Tour = require('./../Models/tourModel');


exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            massage: 'Missing name or price'
        })
    }
    next();
}

exports.GetAllTours = async (req, res) => {
    try {
        // BUILD QUERY
        // const tours = await Tour.find();
        const queryOjb = { ...req.query };
        const excludefield = ['page', 'sort', 'limit', 'fields'];
        excludefield.forEach((el) => {
            delete queryOjb[el]
        });

        // Advance filtering
        let queryStr = JSON.stringify(queryOjb);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));

        // EXEUTE QUERY
        const query = Tour.find(JSON.parse(queryStr));
        const tours = await query;


        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.GetTours = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        // tours.findOne({_id: req.params.id})

        console.log(tour);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.CreateNewTours = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.UpdateTours = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

};

exports.DeleteTours = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

};