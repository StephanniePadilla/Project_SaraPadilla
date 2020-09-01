'use strict'

/*
Conte totes les rutes, requerin al controlador (subjectCtrl o studentCtrl)
que es on estan implementades
 */
const express = require('express')
const api = express.Router()
const resistanceCtrl = require('../controllers/resistance')
const stationCtrl = require('../controllers/measurement')

api.get('/getMeasurement',stationCtrl.getMeasurement),
api.get('/getResistancesMEasurement/:measurementId',stationCtrl.getResistancesFromMeasurement),
api.get('/afagirMostra',stationCtrl.addSampleMeasurement),
api.get('/afagirMostra2',stationCtrl.addSampleMeasurement2),
api.post('/addMeasurement',stationCtrl.addMeasurement),
api.get('/getUnnasigedResistances',resistanceCtrl.getUnnasignedResistances),
api.get('/getResistances',resistanceCtrl.getResistances),
api.get('/assignResistance/:measurementId/:resistanceId',resistanceCtrl.assignResistanceToMeasurement),
api.get('/unassignResistance/:measurementId/:resistanceId',resistanceCtrl.unassignResistanceToMeasurement),
api.post('/addResistance',resistanceCtrl.addResistance),



module.exports =  api
