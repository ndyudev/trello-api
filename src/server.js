/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'

const START_SERVER = async () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  // Sử dụng try...catch để bắt lỗi khi khởi tạo server
  try {
    console.log('1.Connecting to MongoDB Cloud Atlas...')

    // Kết nối tới MongoDB
    await CONNECT_DB()
    console.log('2.Connected to MongoDB Cloud Atlas!')

    // Lấy database sau khi kết nối thành công
    const db = GET_DB()
    console.info('Successfully connected to the database:', db.databaseName)

    app.get('/', async (req, res) => {
      try {
        // Lấy danh sách collections trong database và log ra
        console.log(await db.listCollections().toArray())
        res.end('<h1>Hello World!</h1><hr>')
      } catch (err) {
        console.error('Error fetching collections:', err.message)
        res.status(500).send('Internal Server Error')
      }
    })

    app.listen(port, hostname, () => {
      console.log(`3.Hi nDyuDev , Back-End Server MERN Stack is running successfully at Host: ${hostname} and PORT: ${port}`)
    })
  } catch (error) {
    console.error('Failed to start the server:', error.message)
    process.exit(1) // Thoát tiến trình nếu xảy ra lỗi
  }
}

// Cách làm cũ đã comment lại bên dưới để tham khảo
/*
console.log('1.Connecting to MongoDB Cloud Atlas...')
CONNECT_DB()
  .then(() => console.log('2.Connected to MongoDB Cloud Atlas!'))
  .then(() => START_SERVER())
  .catch(error => {
    console.log(error)
    process.exit(0)
  })
*/

// Cách mới sử dụng try...catch để xử lý lỗi khi gọi hàm START_SERVER
START_SERVER()
