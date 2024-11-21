import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo một đối tượng TrelloDataBaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: ServerAPI có từ phiên bản MongoDB 5.0.0 trở lên
  // Có thể không cần dùng nếu không cần chỉ định phiên bản Stable API
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

/**
 * Hàm CONNECT_DB dùng để kết nối tới MongoDB Atlas
 * Sau khi kết nối thành công, nó sẽ lưu database vào `trelloDatabaseInstance`
 */
export const CONNECT_DB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...')
    // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
    await mongoClientInstance.connect()
    // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến trelloDatabaseInstance
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
    console.log('Connected to MongoDB successfully!')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message)
    throw error // Ném lỗi để chương trình biết và xử lý
  }
}

/**
 * Hàm CLOSE_DB đóng kết nối tới Database
 */
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

/**
 * Hàm GET_DB không async, dùng để lấy ra instance của database
 * Đảm bảo hàm này chỉ được gọi sau khi CONNECT_DB đã thực thi
 */
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
