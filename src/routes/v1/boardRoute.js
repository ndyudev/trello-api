import { StatusCodes } from 'http-status-codes'
import express from 'express'
import { boardValidation } from '~/validations/boardValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note : API get list boards' })
  })
  .post(boardValidation.createNew)

export const boardRoute = Router