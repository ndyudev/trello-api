# Trello Web Backend

## Giới thiệu

**Trello Web Backend** là phần backend của ứng dụng quản lý dự án Trello Web, được xây dựng bằng Node.js và Express. Backend này cung cấp API cho phép người dùng tương tác với cơ sở dữ liệu và thực hiện các thao tác quản lý bảng, danh sách và thẻ công việc.

## Tính năng

- **Xác thực người dùng**: Đăng nhập và đăng ký với JSON Web Tokens (JWT).
- **Quản lý bảng**: Tạo, đọc, cập nhật và xóa bảng.
- **Quản lý danh sách**: Tạo, đọc, cập nhật và xóa danh sách trong bảng.
- **Quản lý thẻ công việc**: Tạo, đọc, cập nhật và xóa thẻ công việc trong danh sách.
- **Theo dõi hoạt động**: Ghi lại các hoạt động của người dùng để dễ dàng theo dõi.

## Công nghệ sử dụng

- **Ngôn ngữ lập trình**: Node.js
- **Framework**: Express
- **Cơ sở dữ liệu**: MongoDB
- **Xác thực**: JSON Web Tokens (JWT)
- **WebSocket**: Socket.io cho cập nhật thời gian thực

## Cài đặt

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (cài đặt cục bộ hoặc sử dụng MongoDB Atlas)

### Bước 1: Clone repository

```bash
git clone https://github.com/ndyudev/trello-web-backend.git
cd trello-web-backend
```

### Bước 2: Cài đặt các phụ thuộc

```bash
npm install
```

### Bước 3: Cấu hình biến môi trường

Tạo file `.env` trong thư mục gốc và thêm các biến sau:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Bước 4: Chạy ứng dụng

```bash
npm start
```

API sẽ chạy trên `http://localhost:5000`.

## API Reference

### Xác thực

- **POST /api/auth/register**: Đăng ký người dùng mới.
- **POST /api/auth/login**: Đăng nhập và lấy token.

### Quản lý bảng

- **GET /api/boards**: Lấy danh sách bảng.
- **POST /api/boards**: Tạo bảng mới.
- **PUT /api/boards/:id**: Cập nhật bảng.
- **DELETE /api/boards/:id**: Xóa bảng.

### Quản lý danh sách

- **GET /api/boards/:boardId/lists**: Lấy danh sách trong bảng.
- **POST /api/boards/:boardId/lists**: Tạo danh sách mới.
- **PUT /api/lists/:id**: Cập nhật danh sách.
- **DELETE /api/lists/:id**: Xóa danh sách.

### Quản lý thẻ công việc

- **GET /api/lists/:listId/cards**: Lấy thẻ công việc trong danh sách.
- **POST /api/lists/:listId/cards**: Tạo thẻ công việc mới.
- **PUT /api/cards/:id**: Cập nhật thẻ công việc.
- **DELETE /api/cards/:id**: Xóa thẻ công việc.

## Cấu trúc dự án

```
trello-web-backend/
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── .env
├── package.json
└── server.js
```

## Đóng góp

Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng. Vui lòng gửi pull request hoặc mở issue nếu bạn tìm thấy lỗi hoặc có ý tưởng cải tiến.

## Giấy phép

Dự án này được cấp phép theo Giấy phép MIT. Vui lòng xem tệp [LICENSE](LICENSE) để biết thêm chi tiết.

## Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email: chauunhatduyyot@gmail.com.
