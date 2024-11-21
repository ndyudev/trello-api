import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { json } from 'express'


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
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log('req.body:', req.body)
    // Set abortEarly : false de truong hop co nhieu validation de tra ve tat ca loi
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // next()

    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation : API create new board' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}
export const boardValidation = {
  createNew
}