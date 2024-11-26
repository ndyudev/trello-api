import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
// import { boardController } from '~/controllers/boardController'


class ApiError extends Error {
  constructor(statusCode, message) {
    // Gọi tới hàm khởi tạo của class Error (class cha) để còn dùng this (kiến thức OOP lập trình hướng đối tượng căn bản)
    // Thằng cha (Error) có property message rồi nên gọi nó luôn trong super cho gọn
    super(message)

    // Tên của cái custom Error này, nếu không set thì mặc định nó sẽ kế thừa là "Error"
    this.name = 'ApiError'

    // Gán thêm http status code của chúng ta ở đây
    this.statusCode = statusCode

    // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
const createNew = async (req, res, next) => {
  try {
    // console.log('req.body:', req.body)
    // console.log('req.query:', req.query)
    // console.log('req.params:', req.params)
    // console.log('req.files:', req.files)
    // console.log('req.cookies:', req.cookies)
    // console.log('req.jwtDecoded:', req.jwtDecoded)
    // Điều hướng dữ liệu sang tầng Servic

    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'ndyudev test error')
    // Có kết quả thì trả về phía Client

    // Điều hướng dữ liệu sang tằng Service
    // const createdBoard = await boardService.createNew(req.body)
    const createdBoard = async (req, res, next) => {
      try {
        const createdBoard = await boardService.createNew(req.body)
        res.status(StatusCodes.CREATED).json(createdBoard)
      } catch (error) {
        next(error)
      }
    }


    // Có kết qua thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}
