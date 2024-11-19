/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'

const START_SERVER = async () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  // Khai báo biến db để sử dụng trong các route
  const db = GET_DB()

  app.get('/', async (req, res) => {
    try {
      // Lấy danh sách collections trong database và log ra
      const collections = await db.listCollections().toArray()
      console.log(collections)
      res.end('<h1>Hello World!</h1><hr>')
    } catch (err) {
      console.error('Error fetching collections:', err.message)
      res.status(500).send('Internal Server Error')
    }
  })

  app.listen(port, hostname, () => {
    console.log(
      `3.Hi nDyuDev , Back-End Server MERN Stack is running successfully at Host: ${hostname} and PORT: ${port}
      `
    )
  })

  // Thực hiện các tác vụ clean up trước khi ta dừng server lại
  exitHook(() => {
    console.log('Closing database connection...')
    CLOSE_DB()
  })
}

// Chỉ khi kết nối tới DB thành công thì mới Start Server Back-End lên.
// Immediately-invoked / Anonymous Async Functions (IIFE)
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!')
    // Khởi động Server Back-End sau khi đã Connect Database thành công
    await START_SERVER()
  } catch (error) {
    console.error('Failed to start the server:', error.message)
    process.exit(0) // Thoát tiến trình nếu xảy ra lỗi
  }
})()

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
