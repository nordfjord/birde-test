import express from 'express'
import {
  getAllEventsForPatient,
  getAllPatients,
} from '../repository/data.repository'

export const dataController = express.Router()

dataController.get('/patient/:id/:event_type', async (req, res) => {
  const { id, event_type } = req.params
  const result = await getAllEventsForPatient(id, event_type)
  res.status(200).json(result)
})

dataController.get('/patients', async (_, res) => {
  const result = await getAllPatients()
  res.status(200).json(result)
})
