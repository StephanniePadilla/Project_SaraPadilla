'use strict'

const Measurement = require('../models/measurement')
const Resistance = require('../models/resistance')

function getMeasurements(req, res){
    //Funcio per obtindre totes les estacions

    console.log("Peticio de obtindre totes les estacions")
    Measurement.find({},(err, measurements)=>{
        if(err) {
            return res.status(500).send({message: `Error al obtener las estaciones: ${err}`})
        }
        else if(!measurements.length) {
            return res.status(400).send({message: `No hay estaciones`})
        }
        else {
            console.log("Enviando lista de estaciones"+measurements)
            res.status(200).send(measurements);
        }
    })

}

function getResistancesFromMeasurement(req, res){
    //Funcio per obtindre totes les estacions

    let measurementId = req.params.measurementId

    Measurement.findById(measurementId,(err, measurement) => {
        if(err)
            return res.status(500).send({message: `Error al obtener la medida: ${err}`})

        if(!measurement)
            return res.status(400).send({message: `La medida no existe`})

        Resistance.find({'_id': { $in: measurement.resistances}}, function(err, resistancesList){
            if(resistancesList.length==0)
            {
                return res.status(204).send({message: `La medida no tiene resistencias`})
            }
            else
            return res.status(200).send({resistances: resistancesList})
        })
    })

}

function addSampleMeasurement(req, res){
    console.log("Petició d'afagir estacio mostra")

    let resistanceNew= new Resistance ({name: "B1",value:250,description: "Value",assigned:true})

    Resistance.find({name: resistanceNew.name}).exec(function(err, resistance) {
        if(err) {
            return res.status(500).send({message: `Error al añadir bici: ${err}`})
        }
        if (resistance.length==0){
            resistanceNew.save((err,resistanceSaved) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir la bici: ${err}. Ya existe una bici con ese nombre`})
                }

                var measurementNew = new Measurement({name: "Plaça Catalunya",state:"available",description: "Value", resistances: resistanceSaved._id});

                Measurement.find(measurementNew).lean().exec(function (err, measurement) {
                    if (err) {
                        return res.status(500).send({message: `Error al añadir la estacion: ${err}.`})
                    }
                    if (!measurement.length) {
                        measurementNew.save((err) => {
                            if (err) {
                                return res.status(400).send({message: `Error al añadir la estacion: ${err}. Ya existe una estacion con algun campo único`})
                            }
                            return res.status(200).send({message: measurementNew})
                        })
                    } else {
                        return res.status(400).send({message: `Error al añadir la estacion: ${measurementNew.name}. Ya existe una estacion con ese nombre`})
                    }
                })
            } ) }
        else {
            return res.status(400).send({message: `Error al añadir la bici: ${resistanceNew.name}. Ya existe una bici con ese nombre`})
        }
    });

}

function addSampleMeasurement2(req, res){
    console.log("Petició d'afagir estacio mostra2")

    let resistanceNew= new Resistance ({name: "B2",value:100,description: "Value",assigned:true})

    Resistance.find({name: resistanceNew.name}).exec(function(err, resistance) {
        if(err) {
            return res.status(500).send({message: `Error al añadir bici: ${err}`})
        }
        if (resistance.length==0){
            resistanceNew.save((err,resistanceSaved) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir la bici: ${err}. Ya existe una bici con ese nombre`})
                }

                var measurementNew = new Measurement({name: "Les Corts",state:"available",description: "Value", resistances: resistanceSaved._id});

                Measurement.find(measurementNew).lean().exec(function (err, measurement) {
                    if (err) {
                        return res.status(500).send({message: `Error al añadir la estacion: ${err}.`})
                    }
                    if (!measurement.length) {
                        measurementNew.save((err) => {
                            if (err) {
                                return res.status(400).send({message: `Error al añadir la estacion: ${err}. Ya existe una estacion con algun campo único`})
                            }
                            return res.status(200).send({message: measurementNew})
                        })
                    } else {
                        return res.status(400).send({message: `Error al añadir la estacion: ${measurementNew.name}. Ya existe una estacion con ese nombre`})
                    }
                })
            } ) }
        else {
            return res.status(400).send({message: `Error al añadir la bici: ${resistanceNew.name}. Ya existe una bici con ese nombre`})
        }
    });

}

function addMeasurement(req, res){
    console.log("Petició d'afagir estacio");
    var measurementNew = new Measurement({name: req.body.name,state:"NA",description: req.body.description});

    Measurement.find(measurementNew).lean().exec(function (err, measurement) {
        if (err) {
            return res.status(500).send({message: `Error al añadir la estacion: ${err}.`})
        }
        if (!measurement.length) {
            measurementNew.save((err) => {
                if (err) {
                    return res.status(400).send({message: `Error al añadir la estacion: ${err}. Ya existe una estacion con algun campo único`})
                }
                return res.status(200).send({message: measurementNew})
            })
        } else {
            return res.status(400).send({message: `Error al añadir la estacion: ${measurementNew.name}. Ya existe una estacion con ese nombre`})
        }
    })

}

module.exports={
    getMeasurement: getMeasurements,
    getResistancesFromMeasurement: getResistancesFromMeasurement,
    addSampleMeasurement: addSampleMeasurement,
    addSampleMeasurement2: addSampleMeasurement2,
    addMeasurement: addMeasurement
}
