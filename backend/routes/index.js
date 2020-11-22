'use strict'

/*
Conte totes les rutes, requerin al controlador (measurementCtrl o resistanceCtrl)
que es on estan implementades
 */

const express = require('express')
const resistanceCtrl = require('../controllers/resistance')
const measurementCtrl = require('../controllers/measurement')

const api = express.Router()

api.get('/getMeasurement',measurementCtrl.getMeasurement),
api.get('/getResistancesMEasurement/:measurementId',measurementCtrl.getResistancesFromMeasurement),
api.get('/afagirMostra',measurementCtrl.addSampleMeasurement),
api.get('/afagirMostra2',measurementCtrl.addSampleMeasurement2),
api.post('/addMeasurement',measurementCtrl.addMeasurement),
api.get('/getUnnasignedResistances',resistanceCtrl.getUnnasignedResistances),
api.get('/getResistances',resistanceCtrl.getResistances),
api.get('/assignResistance/:measurementId/:resistanceId',resistanceCtrl.assignResistanceToMeasurement),
api.get('/unassignResistance/:measurementId/:resistanceId',resistanceCtrl.unassignResistanceToMeasurement),
api.post('/addResistance',resistanceCtrl.addResistance),



module.exports =  api
