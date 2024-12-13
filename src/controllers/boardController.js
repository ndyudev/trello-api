import { StatusCodes } from 'http-status-codes'
// import { boardController } from '~/controllers/boardController'
import { boardService } from '~/services/boardService'


// class ApiError extends Error {
//   constructor(statusCode, message) {
//     // Gọi tới hàm khởi tạo của class Error (class cha) để còn dùng this (kiến thức OOP lập trình hướng đối tượng căn bản)
//     // Thằng cha (Error) có property message rồi nên gọi nó luôn trong super cho gọn
//     super(message)

//     // Tên của cái custom Error này, nếu không set thì mặc định nó sẽ kế thừa là "Error"
//     this.name = 'ApiError'

//     // Gán thêm http status code của chúng ta ở đây
//     this.statusCode = statusCode

//     // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
//     Error.captureStackTrace(this, this.constructor)
//   }
// }

// export default ApiError

const createNew = async (req, res, next) => {

  try {

    const createdBoard = await boardService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    // Sau này ở khóa MERN Stack Advance nâng cao học trực tiếp thì sẽ có thêm userId nữa đẻ chỉ lấy board thuộc về user đó thôi chẳng hạn
    const board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) { next(error) }
}

export const boardController = {
  createNew,
  getDetails,
  update
}
