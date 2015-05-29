/*
 * Homework 
 * JSCRIPT300-Spring2015/Module_7
 * by Diane Zevenbergen
 */

var express = require('express');

// Defining a model for Mongoose to use ('Truck' is instance of truckModel)
var Truck = require('../models/truckModel');

var router = express.Router();

router.route('/')
    .get(function (request, response) {
        Truck.find(function (error, trucks) {    
            if (error) {
                response.status(500).send(error);
            } else {
                response.json(trucks);
            }
        });
    })
    .post(function (request, response) {
        var newTruck = new Truck(request.body);
    
        newTruck.save(function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(201).send(truck);
            }
        });
    });

router.route('/:truckId')
    
    .all(function (request, response, next) {
    
        Truck.findById(request.params.truckId, function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                request.foundTruck = truck;
                next();
            }
        });
    })
    .get(function (request, response) {
        if (request.foundTruck) {
            response.send(request.foundTruck);
        } else {
            // note we haven't determined what we'll do if truck not found...
            response.send({});
        }
    })
    .delete(function (request, response) {
        if (request.foundTruck) {
            request.foundTruck.remove(function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.sendStatus(200);
                }
            });
        } else {
            // don't we need an else here?
        }
    });

module.exports = router;
