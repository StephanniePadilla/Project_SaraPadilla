'use strict'

const mongoose = require('mongoose')

const measurementSchema = new mongoose.Schema({
    //Podem marcar els camps únics amb unique:true i  requerits required:true.
    // En el nostre cas posem el nom de la mesura com a requerit i unic, i les resistencies no com a unics (Una mateixa
    // resistencia pot anar a varies mesures)
    name: {type: String,unique: true, required: true},
    state: {type: String, enum: ['available', 'Performed']},
    description: String,
    resistances: [{type: mongoose.Schema.Types.ObjectId, ref: 'Resistances',unique: false}]
});

module.exports = mongoose.model('Measurement',measurementSchema);
