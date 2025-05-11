# 📚 Documentation

### 📄 `setup.py` – Project Initialization Script

This script is designed to automate the initial setup of your Python project. It ensures that all required dependencies are installed and that the necessary directory structure is created before running the application.

#### 🧩 Purpose

- ✅ **Install Required Packages**  
  Automatically installs any missing dependencies using `pip`.

- 📁 **Set Up Project Folders**  
  Creates essential folders (e.g., `logs/`, `uploads/`, etc.) to prevent runtime errors due to missing directories.

#### 🔍 Code Overview

```python
from configs.checkingintro import check_and_install_requirements, setUpingFolders

if __name__ == '__main__':
    check_and_install_requirements()
    setUpingFolders()
```

---
## 🚀 `app.py` – Main Entry Point of the Flask Application

The `app.py` file is the heart of your Flask application. It initializes the Flask app, configures logging, registers blueprints, and runs the server.
    
---
    
### 🔍 What It Typically Contains
    
### 1. **Importing Dependencies**
```python
    from flask import Flask
    from configs.logger import LogInstance
```
---
---
## ⚙️ `setting.json` – Centralized Configuration File

The `setting.json` file is a **central configuration hub** for your Flask application. It allows you to define and manage environment-specific and app-level settings in a structured and easily editable format.

---

### 📁 File Structure Overview

```json
{
  "file_location": "C:/",
  "database": {
    "db": "tut",
    "host": "localhost",
    "password": "12345",
    "username": "root",
    "port": "3306"
  },
  "appname": "flaskOS",
  "mailpassword": "",
  "secure": true,
  "secret_key": "your_secret_key_here",
  "cross_orgins": [
    "http://127.0.0.1:5000"
  ]
}
```

### 📦 Reading the JSON: utils/settingsreader.py
This script is responsible for loading configuration data from the setting.json file so it can be used throughout your app.



#### utils/settingsreader.py
```python
import json

path = "./setting.json"

def propReader():
    data = None
    with open(path) as json_file:
        data = json.load(json_file)
    return data
```
#### ✅ Usage Example
```python
from utils.settingsreader import propReader

settings = propReader()
db_config = settings["database"]
file_path = settings["file_location"]
```
This makes your app:
```
✅ More flexible

🛠️ Easier to configure per environment

📦 Keeps code clean by avoiding hardcoded values
```
#### 📘 Best Practice Tip
Never hardcode passwords or secret keys in source files. For production, use environment variables or encrypted secrets managers.Let me know if you'd like a versioned loader for dev/prod environments or validation for required keys.

---
## 🧭 Blueprint Configuration in Flask

This file defines how **Flask Blueprints** are used to modularize and organize the routing structure of the application.


### 📄 File Overview : configs\routingconfig.py

```python
# Blue Print for the routing configuration
from flask import Blueprint
from routers.routeexample import loginController
  
def init_Blueprint(app):
    # Create a blueprint for the routing configuration
    # Import the route example module and register it with the blueprint
    app.register_blueprint(loginController, url_prefix="/usercontroller")
    # Add more blueprints as needed
```
#### 🧩 What is a Blueprint?
A Blueprint in Flask is a way to organize your application into modules. It helps split routes, models, views, etc., into separate files or packages, making large applications more maintainable and scalable.

#### 🔍 Function: init_Blueprint(app)
This function is called during app initialization (usually in app.py) to register all necessary route modules (blueprints) with the Flask app.

✅ Key Responsibilities:
```
Imports loginController from routers.routeexample

Registers it under the URL prefix /usercontroller

Prepares your app to add more modular route handlers in the future
```
---

## 🧾 Common Response Model – `model/commonresponsemodel.py`

This file defines a **standard response structure** used across the Flask application to maintain consistency and clarity in all API responses.


### 📄 File Overview

```python
from flask import jsonify

def createResponse(rescode, response):
    return jsonify(response.createDictionarie, rescode)
```
🔹 Purpose:
The createResponse function takes a status code and a response object (instance of CommonRequestModel) and returns a Flask jsonify() response using the structured data from the object.
#### 🧩 Class: CommonRequestModel
```python
class CommonRequestModel:
    def __init__(self, message, code, data, stcodes=None):
        self.message = message
        self.code = code
        self.data = data
        self.stcode = stcodes
```
#### 🔹 Parameters:
* message: A string describing the result of the API call.
* code: A custom code to classify the type of response (e.g., 1001 for success).
* data: The actual response payload.
### 🔹 Purpose:
The createResponse function takes a status code and a response object (instance of CommonRequestModel) and returns a Flask jsonify() response using the structured data from the object.

### ✅ Example Usage
1. Constructing a response manually:
      ```python 
       from model.commonresponsemodel import CommonRequestModel

        response_model = CommonRequestModel(
            message="Data fetched successfully",
            code=1001,
            data={"user": "John Doe"},
            stcodes=200
        )
        return response_model.createDictionari_respo()
      ```
2. Using createResponse wrapper:
   ```python
      return createResponse(200, response_model)
    ```
### 💡 Benefits
* ✅ Consistent API responses for frontend integration

* ✅ Easy to debug and extend

* ✅ Centralized format handling

---
## 🧾 `LogInstance` – Centralized Logging Utility for Flask

The `LogInstance` class provides a reusable logging utility that integrates with Flask and supports centralized logging configuration using Python's `logging` module.



### 🎯 Purpose

This class encapsulates the logic for:

- Loading logging configuration from `LOGGING_CONFIG`
- Attaching log handlers to the Flask app
- Providing simple methods for logging at different severity levels


## 🛠️ Code Breakdown

```python
import logging
import logging.config
from flask import Flask
from configs.checkingintro import LOGGING_CONFIG
```
## 🚀 Class: LogInstance
### __init__(self, app: Flask = None)
* Applies the logging configuration using dictConfig.
* Retrieves a named logger FlaskAppLogger.
* Optionally initializes with the Flask app instance.

### init_app(self, app: Flask)
* Overrides Flask’s default logger with the one configured here.
* Ensures all logs go through the centralized logger.

### Logging Methods
* ```logger_info(message, file=None)```
  Logs info-level messages. If file is provided, prepends it to the message.
* ```logger_error(message, file=None)``` Logs error-level messages.
* ```logger_warning(message, file=None)``` Logs warning-level messages.

### Usage
in app.py 
```python
from flask import Flask
from configs.logger import LogInstance
app = Flask(__name__)
logger = LogInstance(app)
logger.logger_info("Server started successfully")
```
In other routine blueprint
```python
from utils.logger import LogInstance
logg= LogInstance()

@loginController.route("/")
def index():
    logg.logger_info(message="hello starter", file="logincontroller")
    return "hello"
``` 
#### LOGGING_CONFIG
Typically loaded from configs/checkingintro.py: 
```python
LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'detailed': {
            'format': '[%(asctime)s] [%(levelname)s] %(name)s: %(message)s',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'detailed',
        },
        'file': {
            'class': 'logging.FileHandler',
            'formatter': 'detailed',
            'filename': 'app.log',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
}
```
### ✅ Benefits
- Centralized log control for all app modules.
- Easily extendable for more advanced handlers (email, rotating files, etc.).
- Clean separation of configuration and logic.


---