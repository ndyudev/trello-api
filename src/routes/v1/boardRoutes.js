import { StatusCodes } from 'http-status-codes'
import express from 'express'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note : API get list boards' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'Note : API create new board' })
  })

export const boardRoutes = Router