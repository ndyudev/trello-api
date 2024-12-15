
// Những domain được phép truy cập vào server
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173'
  'https://trello-web-lemon-two.vercel.app/'
  // Không cần local host nữa vì file config/cors đã luôn luôn cho phép môi trường dev (env.BUILD_MODE === 'dev')
  //...vv sau này có domain nữa.
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}