import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
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

    const resBoard = cloneDeep(board)
    // Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // Xoa mang card khoi board ban dau
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}

const update = async (boardId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    return updatedBoard
  } catch (error) { throw error }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    /**
     * Khi duy chuyển card sang column khác:
     * B1: Cập nhập mảng cardOrderIds của Column ban đầu chứa nó ( Hiểu bản chất là xóa cái _id của Card ra khỏi mảng)
     * B2: Cập nhập mảng cardOrderIds của Column tiếp theo ( Hiểu bản chất là thêm _id của Card vào mảng )
     * B3: Cập nhập lại trường Column mới của cái Card đã kéo
     * => Làm một API support riêng.
     */
    // B1

    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updateAt: Date.now()
    } )
    // B2
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updateAt: Date.now()
    } )
    // B3
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'Successfully!' }
  } catch (error) { throw error }
}

// Xuất `boardController`
export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
