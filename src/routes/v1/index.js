import { StatusCodes } from 'http-status-codes'
import express from 'express'
import { boardRoutes } from './boardRoutes'

const Router = express.Router()
// Check API V1 Status
Router.get('/status', ( req, res ) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use.' })
})

// Board API
Router.use('/boards', boardRoutes)

export const APIs_v1 = Router

