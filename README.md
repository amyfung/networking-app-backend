# Networking Connections Organizer Backend

An Express.js and MongoDB backend application that allows users to organize their networking connections, including details such as name, company, role, how they met, LinkedIn profile link, email address, phone number, and notes.

## Table of Contents

- [Key Features](#🚀-key-features)
- [Tech Stack](#🛠️-tech-stack)
- [Getting Started](#💻-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#🔧-api-endpoints)
  - [Authentication](#authentication)
  - [Contacts](#contacts)
- [Environment Variables](#💿-environment-variables)
- [Best Practices](#🔐-best-practices)
- [License](#📄-license)

## 🚀 Key Features 

- User registration and authentication with JWT.
- Secure password hashing with bcrypt.
- CRUD operations for contacts.
- Search, filter, sort, and paginate contacts.
- Input validation and sanitization.
- Error handling and logging.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: express-validator
- **Logging**: Winston

## 💻 Getting Started

### Prerequisites

- **Node.js**: Version 14.x or higher.
- **npm**: Comes with Node.js.
- **MongoDB**: Ensure MongoDB is installed and running.

### Installation

1. **Clone the Repository**

(HTTP example)

```bash
git clone https://github.com/amyfung/networking-app-backend.git
cd networking-app-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set Up Environment Variables**

Create a `.env` file in the root directory:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/networking_app
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Replace `your_jwt_secret_key` with a strong, secure key.

Do not commit the `.env` file to version control.

### Running the Application

Start the application in development mode:

npm run dev

The server will run on http://localhost:3000.

Use tools like Postman or Insomnia to interact with the API.

## 🔧 API Endpoints

### Authentication

#### Register

- Endpoint: `POST /api/auth/register`
- Description: Register a new user.
- Request Body:
  {
    "email": "user@example.com",
    "password": "YourPassword123",
    "name": "John Doe"
  }

#### Login

- Endpoint: `POST /api/auth/login`
- Description: Login and receive a JWT token.
- Request Body:
  {
    "email": "user@example.com",
    "password": "YourPassword123"
  }

### Contacts

All contact routes require authentication. Include the `Authorization: Bearer <token>` header in your requests.

#### Get All Contacts

- Endpoint: `GET /api/contacts`
- Description: Retrieve contacts with optional search, filtering, sorting, and pagination.
- Query Parameters:
  - `name`, `company`, `role`, `email`, `phoneNumber`, `notes`: Filter contacts.
  - `page`: Page number (default: 1).
  - `limit`: Number of contacts per page (default: 10).
  - `sortBy`: Field to sort by (name, company, role, etc.).
  - `order`: `asc` or `desc`.

#### Get a Contact by ID

- Endpoint: `GET /api/contacts/:id`
- Description: Retrieve a single contact.
- Path Parameters:
  - `id`: The ID of the contact.

#### Create a Contact

- Endpoint: `POST /api/contacts`
- Description: Create a new contact.
- Request Body:
  {
    "name": "Jane Smith",
    "company": "TechCorp",
    "role": "Software Engineer",
    "howMet": "Tech Conference 2022",
    "linkedinProfile": "https://www.linkedin.com/in/janesmith",
    "email": "jane.smith@techcorp.com",
    "phoneNumber": "+1234567890",
    "notes": "Interested in collaboration"
  }

#### Update a Contact

- Endpoint: `PUT /api/contacts/:id`
- Description: Update an existing contact.
- Path Parameters:
  - `id`: The ID of the contact.
- Request Body: Include the fields you wish to update.

#### Delete a Contact

- Endpoint: `DELETE /api/contacts/:id`
- Description: Delete a contact.
- Path Parameters:
  - `id`: The ID of the contact.

## 💿 Environment Variables

- `PORT`: Port on which the server runs (default: 3000).
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT tokens.
- `NODE_ENV`: `development` or `production`.


## 🔐 Best Practices

### Security
- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Input validation and sanitization are enforced.
- Sensitive data is stored in environment variables.

### Code Quality
- Follows MVC architecture.
- Uses ES6 syntax.
- Code is modular and reusable.
- Consistent error handling.

### Performance
- Indexes are added to improve query performance.
- Pagination is implemented to handle large data sets.

### Scalability
- Designed to handle multiple users.
- Can be extended with additional features.

## 📄 License

This project is licensed under the MIT License.