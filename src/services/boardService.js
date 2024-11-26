import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

// Định nghĩa service createNew
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModel.create(newBoard)
    console.log(createdBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) { throw error }
}

// Xuất `boardController`
export const boardController = {
  createNew
}
