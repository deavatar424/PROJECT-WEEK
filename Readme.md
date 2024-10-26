# Book Management System

A RESTful API for managing books with user authentication, profile management, and email notifications.

## Features

- User authentication (registration and login)
- Profile management
- Book management (CRUD operations)
- Welcome email using EJS templates
- JWT-based authentication
- MongoDB database

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/book-management-system.git
cd book-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookmanagement
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_smtp_username
EMAIL_PASS=your_smtp_password
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register
## API Endpoints (continued)

### Authentication
- POST /api/auth/register - Register a new user
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- POST /api/auth/login - Login user
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### Profile Management
- GET /api/profile - Get user profile (Protected)
- PUT /api/profile - Update user profile (Protected)
  ```json
  {
    "username": "newusername",
    "email": "newemail@example.com",
    "password": "newpassword123"
  }
  ```
- DELETE /api/profile - Delete user profile (Protected)

### Book Management
- POST /api/books - Add a new book (Protected)
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "published_date": "1925-04-10",
    "description": "A story of the American dream",
    "rating": 5
  }
  ```
- GET /api/books - Get all books (Protected)
  - Query parameters:
    - genre: Filter by genre
    - author: Filter by author
    - rating: Filter by rating
- GET /api/books/:id - Get a specific book (Protected)
- PUT /api/books/:id - Update a book (Protected)
- DELETE /api/books/:id - Delete a book (Protected)

## Testing with Postman

1. Import the following Postman collection:

```json
{
  "info": {
    "name": "Book Management System API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/auth/register",
            "body": {
              "mode": "raw",
              "raw": "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"test@example.com\",\"password\":\"password123\"}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            }
          }
        }
      ]
    }
  ]
}
```

2. Create a Postman environment with the following variables:
- base_url: http://localhost:3000
- token: (This will be automatically set after login)





## Error Handling

The API uses the following error status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Security Considerations

1. Password Security:
- Passwords are hashed using bcrypt
- Minimum password length is 6 characters

2. API Security:
- JWT tokens expire after 24 hours
- Protected routes require valid JWT token
- CORS is enabled for specified origins only

3. Data Validation:
- Input validation for all API endpoints
- Sanitization of user inputs
- MongoDB injection protection

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request


