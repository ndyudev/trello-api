/* eslint-disable no-unused-vars */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { json } from 'express'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
/**
  * Note : Mặc định chúng ta không cần phải custom message ở phía BE làm gì vì dể cho Front - End tự validate và custom message phía FE cho đẹp.
  * Back-End chỉ cần validate đảm bảo dữ liệu chính xác và trả về message mặc định từ thư viện là được.
  * Quan trọng : Việc validate dữ liệu bắt buộc phải có ở phía Back-End vì đây là điểm cuối để lưu trữ dữ liệu và Database
  * Và thông thường trong thực tế, điều tót nhất cho hệ thống là hãy luôn validate dữ liệu ở Back-End và Front-End.
*/
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'Tile is required ( ndyudev )',
      'string.empty': 'Tile is not allowed to be empty ( ndyudev )',
      'string.min': 'Tile lenght must be at least 3 characters long ( ndyudev )',
      'string.max': 'Tile length must be less than or equal to 5 characters long( ndyudev )',
      'string.trim': 'Tile must not have leading or trailing whitespace ( ndyudev )'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    // Set abortEarly : false de truong hop co nhieu validation de tra ve tat ca loi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu xong xuôi hộp lệ thì trỏ request đi tiếp sang Controller
    next()
  } catch (error) {
    // console.log(error.message)
    // const errorMessage = new Error(error).message
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message ))
  }
}
export const boardValidation = {
  createNew
}
