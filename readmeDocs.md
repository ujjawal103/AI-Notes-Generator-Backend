# Barber Shop API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
The API uses JWT tokens for authentication. Include the token in the request header or as a cookie:

**Header:**
```
Authorization: Bearer <token>
```

**Cookie:**
```
token: <token>
```

---

## User Endpoints

### 1. Register User
**POST** `/api/user/register`

Register a new user account.

#### Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Validation Rules
- `fullName.firstName`: Required, minimum 3 characters
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

#### Success Response (201)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Error Responses
**400 - Validation Error:**
```json
{
  "errors": [
    {
      "msg": "First Name should be of at least 3 characters",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
```

**400 - User Already Exists:**
```json
{
  "message": "User already exists"
}
```

---

### 2. Login User
**POST** `/api/user/login`

Authenticate user and get access token.

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Validation Rules
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

#### Success Response (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Error Responses
**400 - Validation Error:**
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**401 - Invalid Credentials:**
```json
{
  "message": "Invalid Email or Password"
}
```

---

### 3. Get User Profile
**GET** `/api/user/profile`

Get authenticated user's profile information.

#### Headers
```
Authorization: Bearer <token>
```

#### Success Response (200)
```json
{
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": "socket_12345"
  }
}
```

#### Error Responses
**401 - Unauthorized:**
```json
{
  "message": "Unathorized access"
}
```

---

### 4. Logout User
**GET** `/api/user/logout`

Logout user and invalidate token.

#### Headers
```
Authorization: Bearer <token>
```

#### Success Response (200)
```json
{
  "message": "Logged out successfully"
}
```

#### Error Responses
**401 - Unauthorized:**
```json
{
  "message": "Unauthorized access"
}
```

---

## Store Endpoints

### 1. Register Store
**POST** `/api/store/register`

Register a new barber store.

#### Request Body
```json
{
  "storeName": "Elite Barbershop",
  "email": "elite@barbershop.com",
  "password": "password123",
  "storeDetails": {
    "photo": "https://example.com/store-photo.jpg",
    "address": "123 Main Street, City, State",
    "numberOfBarbers": 5,
    "phoneNumber": "+1234567890"
  }
}
```

#### Validation Rules
- `storeName`: Required, not empty
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters
- `storeDetails.phoneNumber`: Required, not empty
- `storeDetails.address`: Required, not empty
- `storeDetails.numberOfBarbers`: Required, positive integer

#### Success Response (201)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "store": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "storeName": "Elite Barbershop",
    "email": "elite@barbershop.com",
    "socketId": null,
    "status": "closed",
    "storeDetails": {
      "photo": "https://example.com/store-photo.jpg",
      "address": "123 Main Street, City, State",
      "numberOfBarbers": 5,
      "phoneNumber": "+1234567890"
    },
    "location": {
      "lang": null,
      "ltd": null
    }
  }
}
```

#### Error Responses
**400 - Validation Error:**
```json
{
  "errors": [
    {
      "msg": "Store name is required",
      "param": "storeName",
      "location": "body"
    }
  ]
}
```

**400 - Store Already Exists:**
```json
{
  "message": "Store already exists"
}
```

---

### 2. Login Store
**POST** `/api/store/login`

Authenticate store and get access token.

#### Request Body
```json
{
  "email": "elite@barbershop.com",
  "password": "password123"
}
```

#### Validation Rules
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

#### Success Response (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "store": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "storeName": "Elite Barbershop",
    "email": "elite@barbershop.com",
    "socketId": null,
    "status": "open",
    "storeDetails": {
      "photo": "https://example.com/store-photo.jpg",
      "address": "123 Main Street, City, State",
      "numberOfBarbers": 5,
      "phoneNumber": "+1234567890"
    },
    "location": {
      "lang": null,
      "ltd": null
    }
  }
}
```

#### Error Responses
**400 - Validation Error:**
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**401 - Invalid Credentials:**
```json
{
  "message": "Invalid Email or Password"
}
```

---

### 3. Get Store Profile
**GET** `/api/store/profile`

Get authenticated store's profile information.

#### Headers
```
Authorization: Bearer <token>
```

#### Success Response (200)
```json
{
  "store": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "storeName": "Elite Barbershop",
    "email": "elite@barbershop.com",
    "socketId": "socket_67890",
    "status": "open",
    "storeDetails": {
      "photo": "https://example.com/store-photo.jpg",
      "address": "123 Main Street, City, State",
      "numberOfBarbers": 5,
      "phoneNumber": "+1234567890"
    },
    "location": {
      "lang": 40.7128,
      "ltd": -74.0060
    }
  }
}
```

#### Error Responses
**401 - Unauthorized:**
```json
{
  "message": "Unathorized access"
}
```

---

### 4. Logout Store
**GET** `/api/store/logout`

Logout store and invalidate token.

#### Headers
```
Authorization: Bearer <token>
```

#### Success Response (200)
```json
{
  "message": "Store logged out successfully"
}
```

#### Error Responses
**401 - Unauthorized:**
```json
{
  "message": "Unauthorized access"
}
```

---

## Data Models

### User Model
```json
{
  "_id": "ObjectId",
  "fullName": {
    "firstName": "String (required, min: 3)",
    "lastName": "String (min: 3)"
  },
  "email": "String (required, unique, min: 5)",
  "password": "String (required, select: false)",
  "socketId": "String (optional)"
}
```

### Store Model
```json
{
  "_id": "ObjectId",
  "storeName": "String (required, min: 3)",
  "email": "String (required, unique, lowercase, trim)",
  "password": "String (required, select: false, min: 6)",
  "socketId": "String (optional)",
  "status": "String (enum: ['open', 'closed'], default: 'closed')",
  "storeDetails": {
    "photo": "String (optional)",
    "address": "String (required, unique, min: 3)",
    "numberOfBarbers": "Number (required, min: 1)",
    "phoneNumber": "String (required)"
  },
  "location": {
    "lang": "Number (optional)",
    "ltd": "Number (optional)"
  }
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation Error) |
| 401 | Unauthorized (Invalid Token/Credentials) |
| 500 | Internal Server Error |

---

## Notes

1. **Password Security**: Passwords are hashed using bcrypt with salt rounds of 10
2. **Token Expiry**: JWT tokens expire after 24 hours
3. **Token Blacklisting**: Logged out tokens are added to a blacklist and cannot be reused
4. **Socket Integration**: Both users and stores can have socketId for real-time communication
5. **Store Status**: Store status changes to "open" on login and "closed" on logout
6. **Email Uniqueness**: Both user and store emails must be unique across the system
```

The documentation is now complete with all endpoints, request/response examples, validation rules, and error handling for both user and store authentication systems.
