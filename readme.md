# KANBAN Server

KANBAN is here to list all your task with more agile. We use RESTful API with JSON formatted responses.

## Global Response

    - Response 500: Internal server error
        {
            "message": "Internal Server Error. <show error>"
        }

## Users Routes

### POST /register : Create new user

    - Request Header
        Not required.

    - Request Body

        {
            "name": "<user's name>"
            "email": "<user's email>",
            "password": "<user's password>"
        }
    
    - Response 201: Created
        {
            "id": "<given id by system>",
            "name": "<posted user's name>"
            "email": "<posted user's email>",
            "organization": "<created by server>"
            "password": "<posted user's password>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
   
    - Response 400: Bad Request
        {
            "message": [...] "<list of validation errors>"
        }

### POST /login : login to user's account

    - Request Header
        Not required.

    - Request Body
        {
            "email": "<user's email>",
            "password": "<user's password>"
        }
    
    - Response 200: OK
        {
            "access_token": "<user's token>"
        }
   
    - Response 400: Bad Request
        {
            "message": "Invalid Email or Password! Please try again!"
        }

### POST /login/google : login via google

    - Request Body
        {
            "id_token": "<google user's id_token>"
        }

    - Response 200: OK
        {
            "access_token": "<user's token>"
        }

## KANBAN Routes

### POST /tasks : Create new task

    - Request Header
        {
            "access_token":"<access token>"
        }


    - Request Body
        {
            "title": "<task's title>",
            "description": "<description of task>",
            "category": "<task's category>"
        }
    
    - Response 201: Created
        {
            "id": "<given id by system>",
            "title": "<posted to-do title>",
            "description": "<posted description>",
            "category": "<posted category>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
   
    - Response 400: Bad Request
        {
            "message": [...] "<list of validation errors>"
        }

### GET /tasks : show all tasks.

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Body
        Not required.
    
    - Response 200: OK
        {
            "data": [
                {
                    "id": 1,
                    "title": "Mengerjakan Vue bersama Kak Fiq",
                    "description": "masih bingung sumpah",
                    "category": "Done",
                    "UserId": 1,
                    "createdAt": "2020-07-15T09:37:50.579Z",
                    "updatedAt": "2020-07-15T09:39:49.946Z",
                    "User": {
                        "id": 1,
                        "name": "Mayana Fitri",
                        "email": "mayana@email.com",
                        "password": "$2b$10$wDdrnWrValGDTAFXGGyge.JegiEmGox5AI3jbwckRIavJTEqEGJiK",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:17:45.588Z",
                        "updatedAt": "2020-07-15T09:17:45.588Z"
                    }
                },
                {
                    "id": 4,
                    "title": "Mengerjakan Lifecycle bersama kak Dzakki",
                    "description": "aslii masih bingung sumpah",
                    "category": "On Progress",
                    "UserId": 1,
                    "createdAt": "2020-07-15T09:46:57.324Z",
                    "updatedAt": "2020-07-15T09:46:57.324Z",
                    "User": {
                        "id": 1,
                        "name": "Mayana Fitri",
                        "email": "mayana@email.com",
                        "password": "$2b$10$wDdrnWrValGDTAFXGGyge.JegiEmGox5AI3jbwckRIavJTEqEGJiK",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:17:45.588Z",
                        "updatedAt": "2020-07-15T09:17:45.588Z"
                    }
                },
                {
                    "id": 7,
                    "title": "Apakah Bisa bisa bisa",
                    "description": "Apakah bisa guys",
                    "category": "On Progress",
                    "UserId": 1,
                    "createdAt": "2020-07-15T15:39:08.753Z",
                    "updatedAt": "2020-07-16T16:55:53.282Z",
                    "User": {
                        "id": 1,
                        "name": "Mayana Fitri",
                        "email": "mayana@email.com",
                        "password": "$2b$10$wDdrnWrValGDTAFXGGyge.JegiEmGox5AI3jbwckRIavJTEqEGJiK",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:17:45.588Z",
                        "updatedAt": "2020-07-15T09:17:45.588Z"
                    }
                },
                {
                    "id": 8,
                    "title": "Ini juga",
                    "description": "Apakah bisa guys",
                    "category": "Backlog",
                    "UserId": 1,
                    "createdAt": "2020-07-15T15:42:33.031Z",
                    "updatedAt": "2020-07-15T15:42:33.031Z",
                    "User": {
                        "id": 1,
                        "name": "Mayana Fitri",
                        "email": "mayana@email.com",
                        "password": "$2b$10$wDdrnWrValGDTAFXGGyge.JegiEmGox5AI3jbwckRIavJTEqEGJiK",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:17:45.588Z",
                        "updatedAt": "2020-07-15T09:17:45.588Z"
                    }
                },
                {
                    "id": 11,
                    "title": "Tes",
                    "description": "BACKLOOOOOG PLEASE PLEASE",
                    "category": "Backlog",
                    "UserId": 1,
                    "createdAt": "2020-07-16T15:40:36.471Z",
                    "updatedAt": "2020-07-16T15:40:36.471Z",
                    "User": {
                        "id": 1,
                        "name": "Mayana Fitri",
                        "email": "mayana@email.com",
                        "password": "$2b$10$wDdrnWrValGDTAFXGGyge.JegiEmGox5AI3jbwckRIavJTEqEGJiK",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:17:45.588Z",
                        "updatedAt": "2020-07-15T09:17:45.588Z"
                    }
                },
                {
                    "id": 13,
                    "title": "Coba lagi ah",
                    "description": "KENAPAAA DIA GABISA LANGSUNG UPDATE GUYS",
                    "category": "To Do",
                    "UserId": 1,
                    "createdAt": "2020-07-16T15:44:46.662Z",
                    "updatedAt": "2020-07-16T15:44:46.662Z",
                    "User": {
                        "id": 1,
                        "name": "Mayana Fitri",
                        "email": "mayana@email.com",
                        "password": "$2b$10$wDdrnWrValGDTAFXGGyge.JegiEmGox5AI3jbwckRIavJTEqEGJiK",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:17:45.588Z",
                        "updatedAt": "2020-07-15T09:17:45.588Z"
                    }
                },
                {
                    "id": 14,
                    "title": "Kami baru",
                    "description": "tapi ga baru baru amat masa sih",
                    "category": "Done",
                    "UserId": 1,
                    "createdAt": "2020-07-16T16:53:13.729Z",
                    "updatedAt": "2020-07-16T16:53:54.805Z",
                    "User": {
                        "id": 1,
                        "name": "Mayana Fitri",
                        "email": "mayana@email.com",
                        "password": "$2b$10$wDdrnWrValGDTAFXGGyge.JegiEmGox5AI3jbwckRIavJTEqEGJiK",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:17:45.588Z",
                        "updatedAt": "2020-07-15T09:17:45.588Z"
                    }
                },
                {
                    "id": 15,
                    "title": "ini belum diedit kok",
                    "description": "asli dah",
                    "category": "Backlog",
                    "UserId": 1,
                    "createdAt": "2020-07-16T17:00:15.612Z",
                    "updatedAt": "2020-07-16T17:00:15.612Z",
                    "User": {
                        "id": 1,
                        "name": "Mayana Fitri",
                        "email": "mayana@email.com",
                        "password": "$2b$10$wDdrnWrValGDTAFXGGyge.JegiEmGox5AI3jbwckRIavJTEqEGJiK",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:17:45.588Z",
                        "updatedAt": "2020-07-15T09:17:45.588Z"
                    }
                },
                {
                    "id": 30,
                    "title": "test",
                    "description": "test",
                    "category": "Done",
                    "UserId": 3,
                    "createdAt": "2020-07-17T09:25:47.517Z",
                    "updatedAt": "2020-07-17T11:31:11.118Z",
                    "User": {
                        "id": 3,
                        "name": "Fitri Mayana",
                        "email": "fitri@email.com",
                        "password": "$2b$10$/GCz/U3F1bG6TkkT0PgzseX/FAGknMMZ2Jo2wZh86uKVj2ijixPT.",
                        "organization": "Hacktiv8",
                        "createdAt": "2020-07-15T09:54:02.010Z",
                        "updatedAt": "2020-07-15T09:54:02.010Z"
                    }
                }
            ],
            "userName": "Fitri Mayana"
        }
        
    - Response 404: Not Found
        {
            "message": "Can't find the data."
        }

### GET /tasks/:id : show a selected task based on id

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": "<selected task's id>"
        }

    - Request Body
        Not required.
    
    - Response 200: OK
            {
                "id": "<searched id>",
                "title": "<searched to-do title>",
                "description": "<searched description>",
                "category": "<searched category>",
                "createdAt": "<date given by system>",
                "updatedAt": "<date given by system>"
            }
   
    - Response 404: Not Found
        {
            message: "Can't find the data."
        }

### PUT /tasks/:id : update a task

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": "<selected to-do list id>"
        }

    - Request Body
        {
            "title": "<task's title>",
            "description": "<description of task>",
            "category": "<task's category>"
        }
    
    - Response 200: OK
        {
            "id": "<updated id>",
            "title": "<updated to-do title>",
            "description": "<updated description>",
            "category": "<updated category>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
    
    - Response 404: Not Found
        {
            message: "Can't find the data."
        }
   
    - Response 400: Bad Request
        {
            "message": [...] "<list of validation errors>"
        }
   
### DELETE /tasks/:id : delete a selected task based on id

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": "<selected task's id>"
        }

    - Request Body
        Not required.
    
    - Response 200: OK

        {
            "id": 2,
            "title": "Cat's Duty",
            "description": "membersihkan poop dan tempat makan MengMeng",
            "status": "uncompleted",
            "due_date": "2020-09-19T17:00:00.000Z",
            "createdAt": "2020-07-06T10:54:51.004Z",
            "updatedAt": "2020-07-06T11:53:25.979Z"
        }
   
    - Response 404: Not Found
        {
            "message": "Can't find the data."
        }
