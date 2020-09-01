'use strict'

const mongoose = require('mongoose')

const resistanceSchema = new mongoose.Schema({
    //Podem marcar els camps únics amb unique:true i  requerits required:true.
    // En el nostre cas posem el nom del estudiant com a requerit i unic,
    name: {type: String,unique: true},
    value: Number,
    description: String,
    assigned: Boolean,
});

module.exports = mongoose.model('Resistance',resistanceSchema);
