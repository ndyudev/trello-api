import { MongoClient, ServerApiVersion } from 'mongodb'

const MONGODB_URI =
  'mongodb+srv://ndyudev:ia4t1sZkFL3eQay2@trello-ndyudev.nsw6d.mongodb.net/?retryWrites=true&w=majority&appName=Trello-nDyuDev'

const DATABASE_NAME = 'trello-ndyudev-mern-stack-pro'

// Khởi tạo một đối tượng TrelloDataBaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(MONGODB_URI, {
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
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}


/**
 * Hàm GET_DB không async, dùng để lấy ra instance của database
 * Đảm bảo hàm này chỉ được gọi sau khi CONNECT_DB đã thực thi
 */
export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Must connect to the database first!')
  }
  return trelloDatabaseInstance
}
