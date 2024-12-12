import { StatusCodes } from 'http-status-codes'
import express from 'express'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'

const Router = express.Router()
// Check API V1 Status
Router.get('/status', ( req, res ) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use.' })
})

// Board API
Router.use('/boards', boardRoute)

// Column API
Router.use('/Columns', columnRoute)

// Card  API
Router.use('/Cards', cardRoute)

export const APIs_v1 = Router
