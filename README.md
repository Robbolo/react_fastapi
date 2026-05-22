# react_fastapi
This is a simple set-up aimed to teach me how to use FastAPI and react to create simple a front-end live dashboard that displays data from a backend database 

backend/
    database.py - holds the database details including url and engine object
    models.py - stores the table definitions
    init_db.py - creates the tables and populates with some test data
    main.py - creates the API

FastAPI
    - defaults to http://127.0.0.1:8000
    - http://127.0.0.1:8000/docs - comes with some sweet built in docs for endpoints and tests

uvicorn
    - used as the webserver to listen/send requests
    - started by running 'uvicorn main:app --reload' in /backend
    - triggers the app logic of FastAPI