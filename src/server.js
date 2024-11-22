
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_v1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = async () => {
  const app = express()
  // Enable req.body json data
  app.use(express.json())
  // Use API V1
  app.use('/v1', APIs_v1)

  // Middlerware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

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
