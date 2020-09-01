'use strict'

const Station = require('../models/measurement')
const Resistance = require('../models/resistance')


function getUnnasignedResistances(req, res) {
    //Funcio per obtindre totes les bicis sense asignar

    console.log("Peticio de obtindre totes les bicis sense asignar")
    Resistance.find({assigned: false}).exec(function(err, bikes) {
        if(err) {
            return res.status(500).send({message: `Error to obtain the resistances: ${err}`})
        }
        if (bikes.length==0){
            return res.status(204).send({message: `There are no resistances unasigned`})
            }
        else {
            return res.status(200).send(bikes)
        }
    });
}

function getResistances(req, res) {
    //Funcio per obtindre totes les bicis estiguin asignades com no

    console.log("Peticio de obtindre totes les bicis");
    Resistance.find().exec(function(err, resistances) {
        if(err) {
            return res.status(500).send({message: `Error al obtindre les bicis: ${err}`})
        }
        if (resistances.length==0){
            return res.status(204).send({message: `No hay ninguna bici`})
        }
        else {
            return res.status(200).send(resistances)
        }
    });
}



function assignResistanceToMeasurement(req, res){
    //Funció per assignar una bici a una estacio
    let stationId= req.params.measurementId
    let resistanceId= req.params.resistanceId

    //Fem $push per afagir sempre, i $addToSet per afagir només si no hi es
    console.log("Petició d'afagir l'a bici "+resistanceId+" a la seguent estacio: "+stationId)

    //Mirem que la bici existeixi
    Resistance.findById(resistanceId).lean().exec(function(err, bike) {
        if(err){
            return res.status(500).send({message: `Error al obtener la bixi: ${err}`})}
        if (bike.length==0){
            return res.status(400).send({message: `Error al obtener la bici: ${err}. No existe ninguna bici con ese ID`})
        }
        else if (bike.assigned==true){
            return res.status(400).send({message: `Esta bici ya se encuentra asignada a una estacion`})
        }
        else {
            //resistance.assigned==true;
            Resistance.update({_id: resistanceId},{ assigned: true},(err, resistance)=>{
                if(err)
                    return res.status(500).send({message: `Error al asignar la bici: ${err}`})
                else if(!resistance)
                    return res.status(400).send({message: `Error al asignar la bici: ${err}`})
                else {
                    if (resistance.nModified == 1) {
                        //La añadimos a la estacion
                        Station.update({_id: stationId},{$addToSet: { resistances: resistanceId}},(err, sta)=>{
                            if(err)
                                return res.status(500).send({message: `Error al asignar la bici: ${err}`})
                            else if(!sta)
                                return res.status(400).send({message: `Error al asignar la bici: ${err}. No existe ninguna estacion con ese ID`})
                            else {
                                if (sta.nModified == 1) {
                                    //Pasem a posar la estació com disponible (al tindre bicis)
                                    Station.update({_id: stationId}, {state: "available"}, (err, stas) => {
                                        if (err)
                                            return res.status(500).send({message: `Error al alterar la estacion: ${err}`})
                                        else if (!stas)
                                            return res.status(400).send({message: `Error al alterar la estacion ${err}`})
                                        else {
                                            res.status(200).send(sta);
                                        }
                                    })
                                }
                                else{
                                    res.status(400).send(sta);
                                }
                            }
                        })
                    }
                    else{
                        res.status(400).send(resistance);
                    }
                }
            })
        }
    });

}
function unassignResistanceToMeasurement(req, res){
    //Funció per assignar una bici a una estacio
    let stationId= req.params.measurementId
    let resistanceId= req.params.resistanceId

    //Fem $push per afagir sempre, i $addToSet per afagir només si no hi es
    console.log("Petició de treure la bici "+resistanceId+" a la seguent estacio: "+stationId)

    //Mirem que la bici existeixi
    Resistance.findById(resistanceId).lean().exec(function(err, resistance) {
        if(err){
            return res.status(500).send({message: `Error al obtener la bixi: ${err}`})}
        if (resistance.length==0){
            return res.status(400).send({message: `Error al obtener la bici: ${err}. No existe ninguna bici con ese ID`})
        }
        else if (resistance.assigned==false){
            return res.status(400).send({message: `Esta bici ya no se encuentra asignada`})
        }
        else {
            //resistance.assigned==true;
            Resistance.update({_id: resistanceId},{ assigned: false},(err, resistance)=>{
                if(err)
                    return res.status(500).send({message: `Error al desasignar la bici: ${err}`})
                else if(!resistance)
                    return res.status(400).send({message: `Error al desasignar la bici: ${err}`})
                else {
                    if (resistance.nModified == 1) {
                        //La eliminamos a la estacion
                        Station.update({_id: stationId},{$pull: { resistances: resistanceId}},(err, sta)=>{
                            if(err)
                                return res.status(500).send({message: `Error al desasignar la bici: ${err}`})
                            else if(!sta)
                                return res.status(400).send({message: `Error al desasignar la bici: ${err}. No existe ninguna estacion con ese ID`})
                            else {
                                //res.status(200).send(sta);
                            //}
                            //Ara hauriem de cambiar el camp a NA de l'estacio
                                if (sta.nModified == 1) {
                                    Station.find({_id: stationId,resistances: {$size: 0}}, (err, estacions) => {
                                        if (err) {
                                            return res.status(500).send({message: `Error al obtener las estaciones: ${err}`})
                                        } else if (estacions.length == 0) {
                                            //Aun tiene bicis
                                            res.status(200).send(sta);
                                        } else {
                                            Station.update({_id: stationId}, {state: "NA"}, (err, stas) => {
                                                if (err)
                                                    return res.status(500).send({message: `Error al alterar la estacion: ${err}`})
                                                else if (!stas)
                                                    return res.status(400).send({message: `Error al alterar la estacion ${err}`})
                                                else {
                                                    res.status(200).send(sta);
                                                }
                                            })
                                        }
                                    })}
                                else
                                    {
                                        res.status(400).send(sta);
                                    }
                                }
                        })
                    }
                    else{
                        res.status(400).send(resistance);
                    }
                }
            })
        }
    });

}

function addResistance(req, res){
    console.log("Petició d'afagir bici")
    let resistanceNew= new Resistance ({name: req.body.name,value:req.body.value,description:req.body.description,assigned:false})

    Resistance.find({name: resistanceNew.name}).exec(function(err, resistance) {
        if(err) {
            return res.status(500).send({message: `Error al añadir bici: ${err}`})
        }
        if (resistance.length==0){
            resistanceNew.save((err,resistanceSaved) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir la bici: ${err}. Ya existe una bici con ese nombre`})
                }
                return res.status(200).send(resistanceSaved)
            } ) }
        else {
            return res.status(400).send({message: `Error al añadir la bici: ${resistanceNew.name}. Ya existe una bici con ese nombre`})
        }
    });

}

module.exports={
    getUnnasignedResistances: getUnnasignedResistances,
    getResistances: getResistances,
    assignResistanceToMeasurement: assignResistanceToMeasurement,
    unassignResistanceToMeasurement: unassignResistanceToMeasurement,
    addResistance: addResistance,

}
