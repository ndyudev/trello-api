import { slugify } from '~/utils/formatters'
import { boardModel } from '../models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

// Định nghĩa service createNew


const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong database
    const createdBoard = await boardModel.createNew(newBoard)
    // Lấy bản ghi mới được tạo ra
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // Làm thêm các xử lý logic khác với các Collection khác tùy vào đặc thù dự án
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    return board
  } catch (error) { throw error }
}

// Xuất `boardController`
export const boardService = {
  createNew,
  getDetails
}
