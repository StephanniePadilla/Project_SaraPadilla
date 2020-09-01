'use strict'

const Measurement = require('../models/measurement')
const Resistance = require('../models/resistance')


function getUnnasignedResistances(req, res) {
    //Funcio per obtindre totes les resistencies sense asignar

    console.log("Peticio de obtindre totes les resistencies sense asignar")
    Resistance.find({assigned: false}).exec(function(err, resistances) {
        if(err) {
            return res.status(500).send({message: `Error to obtain the resistances: ${err}`})
        }
        if (resistances.length==0){
            return res.status(204).send({message: `There are no resistances unasigned`})
            }
        else {
            return res.status(200).send(resistances)
        }
    });
}

function getResistances(req, res) {
    //Funcio per obtindre totes les resistencies estiguin asignades com no

    console.log("Peticio de obtindre totes les resistencies");
    Resistance.find().exec(function(err, resistances) {
        if(err) {
            return res.status(500).send({message: `Error al obtindre les resistencies: ${err}`})
        }
        if (resistances.length==0){
            return res.status(204).send({message: `No hay ninguna resistencia`})
        }
        else {
            return res.status(200).send(resistances)
        }
    });
}



function assignResistanceToMeasurement(req, res){
    //Funció per assignar una resistencia a una mesura
    let measurementId= req.params.measurementId
    let resistanceId= req.params.resistanceId

    //Fem $push per afagir sempre, i $addToSet per afagir només si no hi es
    console.log("Petició d'afagir la resstencia "+resistanceId+" a la seguent mesura: "+measurementId)

    //Mirem que la resistencia existeixi
    Resistance.findById(resistanceId).lean().exec(function(err, resistencia) {
        if(err){
            return res.status(500).send({message: `Error al obtener la resistencia: ${err}`})}
        if (resistencia.length==0){
            return res.status(400).send({message: `Error al obtener la resistencia: ${err}. No existe ninguna resistencia con ese ID`})
        }
        else if (resistencia.assigned==true){
            return res.status(400).send({message: `Esta resistencia ya se encuentra asignada a una medida`})
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
                        //La añadimos a la medida
                        Measurement.update({_id: measurementId},{$addToSet: { resistances: resistanceId}},(err, sta)=>{
                            if(err)
                                return res.status(500).send({message: `Error al asignar la resistencia: ${err}`})
                            else if(!sta)
                                return res.status(400).send({message: `Error al asignar la resistencia: ${err}. No existe ninguna medida con ese ID`})
                            else {
                                if (sta.nModified == 1) {
                                    //Pasem a posar la estació com disponible (al tindre bicis)
                                    Measurement.update({_id: measurementId}, {state: "available"}, (err, stas) => {
                                        if (err)
                                            return res.status(500).send({message: `Error al alterar la medida: ${err}`})
                                        else if (!stas)
                                            return res.status(400).send({message: `Error al alterar la medida ${err}`})
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
    //Funció per assignar una resistencia a una mesura
    let measurementId= req.params.measurementId
    let resistanceId= req.params.resistanceId

    //Fem $push per afagir sempre, i $addToSet per afagir només si no hi es
    console.log("Petició de treure la resistencia "+resistanceId+" a la seguent mesura: "+measurementId)

    //Mirem que la resistencia existeixi
    Resistance.findById(resistanceId).lean().exec(function(err, resistance) {
        if(err){
            return res.status(500).send({message: `Error al obtener la resistencia: ${err}`})}
        if (resistance.length==0){
            return res.status(400).send({message: `Error al obtener la resistencia: ${err}. No existe ninguna resistencia con ese ID`})
        }
        else if (resistance.assigned==false){
            return res.status(400).send({message: `Esta resistencia ya no se encuentra asignada`})
        }
        else {
            //resistance.assigned==true;
            Resistance.update({_id: resistanceId},{ assigned: false},(err, resistance)=>{
                if(err)
                    return res.status(500).send({message: `Error al desasignar la resistencia: ${err}`})
                else if(!resistance)
                    return res.status(400).send({message: `Error al desasignar la resistencia: ${err}`})
                else {
                    if (resistance.nModified == 1) {
                        //La eliminamos a la medida
                        Measurement.update({_id: measurementId},{$pull: { resistances: resistanceId}},(err, sta)=>{
                            if(err)
                                return res.status(500).send({message: `Error al desasignar la resistencia: ${err}`})
                            else if(!sta)
                                return res.status(400).send({message: `Error al desasignar la resistencia: ${err}. No existe ninguna medida con ese ID`})
                            else {
                                //res.status(200).send(sta);
                            //}
                            //Ara hauriem de cambiar el camp a NA de la mesura
                                if (sta.nModified == 1) {
                                    Measurement.find({_id: measurementId,resistances: {$size: 0}}, (err, estacions) => {
                                        if (err) {
                                            return res.status(500).send({message: `Error al obtener las estaciones: ${err}`})
                                        } else if (estacions.length == 0) {
                                            //Aun tiene bicis
                                            res.status(200).send(sta);
                                        } else {
                                            Measurement.update({_id: measurementId}, {state: "NA"}, (err, stas) => {
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
    console.log("Petició d'afagir resistencia")
    let resistanceNew= new Resistance ({name: req.body.name,value:req.body.value,description:req.body.description,assigned:false})

    Resistance.find({name: resistanceNew.name}).exec(function(err, resistance) {
        if(err) {
            return res.status(500).send({message: `Error al añadir resistencia: ${err}`})
        }
        if (resistance.length==0){
            resistanceNew.save((err,resistanceSaved) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir la resistencia: ${err}. Ya existe una resistencia con ese nombre`})
                }
                return res.status(200).send(resistanceSaved)
            } ) }
        else {
            return res.status(400).send({message: `Error al añadir la resistencia: ${resistanceNew.name}. Ya existe una resistencia con ese nombre`})
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
