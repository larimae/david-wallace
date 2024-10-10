import inquirer from "inquirer";
import pg from 'pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();  // This will load the variables from the .env file


const pool = new Pool({
    user: process.env.DB_USER,      // Replace with your database username
    host: process.env.DB_HOST,      // Replace with your database host
    database: process.env.DB_NAME,  // Replace with your database name
    password: process.env.DB_PASSWORD, // Replace with your database password
    port: Number(process.env.DB_PORT), // Replace with your port number (default is 5432)
});

const mainMenu(): void => {
    inquirer
    .prompt([
    {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Exit",
        ],
    },
    ])
    
.then((answer) => {
    switch (answer.action) {
    case "View all departments":
        viewDepartments();
        break;
    case "View all roles":
        viewRoles();
        break;
    case "View all employees":
        viewEmployees();
        break;
    case "Add a department":
        addDepartment();
        break;
    case "Add a role":
        addRole();
        break;
    case "Add an employee":
        addEmployee();
        break;
    case "Update employee role":
        updateEmployeeRole();
        break;
    case "Exit":
        pool.end(() => {
            console.log("Database connection closed.");
            process.exit(0); // Exit the program
        });
    }
    });
};

const viewDepartments = () => {
  const query = "SELECT * FROM department;";
    pool.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows); // Display results in table format
    mainMenu(); // Return to the main menu after displaying
});
};

const viewRoles = () => {
    const query = "SELECT role.title , department.name, role.salary FROM role JOIN department ON role.department_id = department.id;";
    pool.query(query, (err, res) => {
        if (err) {
            console.error('Error fetching roles', err.stack);
        } else {
            console.table(res.rows);
        }
      mainMenu(); // Return to the main menu after displaying
    });
};

const viewEmployee = () => {
    const query = "SELECT employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;";
    pool.query(query, (err, res) => {
        if (err) {
            console.error('Error fetching employees', err.stack);
        } else {
            console.table(res.rows);
        }
      mainMenu(); // Return to the main menu after displaying
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
        }
    ]).then(answer => {
        const query = 'INSERT INTO department (name) VALUES ($1);';
        pool.query(query, [answer.name], (err, res) => {
            if (err) {
                console.error('Error adding department', err.stack);
            } else {
                console.log('Department added successfully');
            }
            mainMenu();
        });
    });
};


mainMenu(); 
