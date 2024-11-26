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
    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong database
    const createdBoard = await boardModel.create(newBoard)
    // Lấy bản ghi mới được tạo ra
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // Làm thêm các xử lý logic khác với các Collection khác tùy vào đặc thù dự án
    return getNewBoard
  } catch (error) { throw error }
}

// Xuất `boardController`
export const boardController = {
  createNew
}
