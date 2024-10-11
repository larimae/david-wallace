# Employee Tracker
## Overview
Employee Tracker is a command-line application that allows business owners and managers to interact with a database to manage information about their company's departments, roles, and employees. Built with Node.js and PostgreSQL, this application leverages the power of Inquirer for a friendly user interface and efficient database operations.

## Features
- View all departments, roles, and employees within the company.
- Add new departments, roles, and employees to the database.
- Update existing employee roles.
- Seamless navigation through a well-organized command-line menu.

## Table of Contents
- Prerequisites
- Installation
- Set up your PostgreSQL database
- Usage
- Database Schema
- Contributions
- License

## Prerequisites
Before you begin, ensure you have Node.js and PostgreSQL installed on your system. You will also need to set up environment variables to manage database connections securely.

## Installation
1. Clone the repository:
```
git clone https://github.com/larimae/david-wallace.git
```

2. Navigate to the project directory:
```
cd david-wallace
```

3. Install the required npm packages:
```
npm install
```

## Set up your PostgreSQL database:

- Ensure PostgreSQL is running on your machine.
- Create a new database and initialize it using the schema and seeds provided in the db folder.
- Create a .env file in the root directory and update it with your PostgreSQL user, password, database, and host information:

```
DB_USER='yourusername'
DB_PASSWORD='yourpassword'
DB_NAME='work_db'
DB_HOST='localhost'
DB_PORT=5432
```

## Usage
To run the application, execute the following command in the terminal:
```
npm i 
```
```
npm run start 
```
Navigate through the menu using the arrow keys and select options by pressing the Enter key. Perform various operations such as viewing, adding, or updating data as per your requirements.

## Database Schema
The application uses three main tables:

- **Department:** Includes department names.
-  **Role:** Contains job titles, salaries, and department associations.
- **Employee:** Stores employee details and their roles.
Refer to the schema.sql file for detailed table structures.

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License
Distributed under the MIT License. See LICENSE for more information.
