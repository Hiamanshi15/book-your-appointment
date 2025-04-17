#this bookyour appointment project api code.

#node -v v20.9.0
#mongod --version "8.0.3",

#sand grid for send mail 

#baseUrl -> "http://localhost:5000/api"

#api end points ->
------------------------------------------------------------------------------------------------
  --mail api -> '/send-email'

    Method => "Post",
    json Body => 
    {
        "to": "fawotoy923@oronny.com",
        "templateId": "d-992282e2d725483487d34af2703fb771",
        "dynamicData": {
            "firstName": "John",
            "lastName": "Doe",
            "customField": "Some custom value"
        }
    }

    Responce Body =>
    {
        "success": true,
        "message": "Email sent successfully using template"
    }

------------------------------------------------------------------------------------------------

  --register user -> '/auth/register'

    Method => "Post",
    json Body =>
    {
        "name": "Aditi Doe",
        "email": "aditi.Doe@gmail.com",
        "password": "password123",
        "roleName": "User" or "roleName": "ServiceProvider" 
    } 

------------------------------------------------------------------------------------------------

  --login user -> '/auth/login'
    
    Method => "Post",
    json Body =>
    {
        "email": "john@example.com",
        "password": "password123"
    }

    Responce Body =>
    {
        "token": "your_jwt_token",
        "user": {
            "id": "user_id",
            "name": "John Doe",
            "email": "john@example.com",
            "role": "User"
        }
    }

------------------------------------------------------------------------------------------------

  --Access Protected Route -> "/protected/dashboard"

    Method => "Get"
    Header => " Authorization: Bearer your_jwt_token",

------------------------------------------------------------------------------------------------

  --create and role '/api/roles' "
    
    Method => "Post" and "Get for get rols all no need to send anything in body",
    json Body =>
    {
        "name": "User" 
    }

    and,

    {
        "name": "ServiceProvider"
    }

------------------------------------------------------------------------------------------------

  --Add a Service: POST http://localhost:5000/api/services/add

  --Get All Services: GET http://localhost:5000/api/services

  --Get Service by ID: GET http://localhost:5000/api/services/:id

  --Update a Service: PUT http://localhost:5000/api/services/update/:id

  --Delete a Service: DELETE http://localhost:5000/api/services/:id

    json Body => for  both  upadte and Delete
    {
    "serviceName": "Doctor",
    "description": "Healthcare services"
    }

------------------------------------------------------------------------------------------------

  --Add Service Provider Details

    URL: POST /api/service-providers/add
    Headers: Authorization: Bearer <TOKEN>
    json Body: 
    {
      "serviceName": "Doctor",
      "aboutService": "Specialist in heart surgeries",
      "address": "123 Medical Street, NY",
      "phone": "1234567890",
      "experience": 10,
      "availability": "Mon-Fri, 9 AM - 5 PM"
    }


  --Get All Service Providers
    URL: GET /api/service-providers

  --Get Service Provider by ID
    URL: GET /api/service-providers/:id

  --Update Service Provider Details

    URL: PUT /api/service-providers/:id
    Headers: Authorization: Bearer <TOKEN>
    Body json: (only send fields that need updating)
    {
      "address": "456 Health Lane, NY",
      "availability": "Mon-Sat, 10 AM - 6 PM"
    }

  --Delete Service Provider

    URL: DELETE /api/service-providers/:id
    Headers: Authorization: Bearer <TOKEN>

-------------------------------------------------------------------------------------------------
  -- Contact us apis 
______________________________________________________________________
|   Method     |        URL             |        Description          |
----------------------------------------------------------------------|
|POST          | /api/contact           |   Create contact message    |
|GET           | /api/contact           |   Get all contact messages  |
|DELETE        | /api/contact/:id       |   Delete contact by ID      |
-----------------------------------------------------------------------