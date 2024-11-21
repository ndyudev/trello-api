/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = async () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3.Hi ${env.AUTHOR} , Back-End Server MERN Stack is running successfully at Host: ${env.APP_HOST} and PORT: ${env.APP_PORT}`
    )
  })

  // Hook để đóng database khi thoát
  exitHook(() => {
    console.log('4.Closing database connection...')
    CLOSE_DB()
    console.log('5.Goodbye! Server stopped successfully.')
  })
}

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
    process.exit(1) // Thoát tiến trình nếu xảy ra lỗi
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
