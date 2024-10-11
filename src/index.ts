import inquirer from "inquirer";
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();  // This will load the variables from the .env file


const pool = new Pool({
    user: process.env.DB_USER,      // Replace with your database username
    host: process.env.DB_HOST,      // Replace with your database host
    database: process.env.DB_NAME,  // Replace with your database name
    password: process.env.DB_PASSWORD, // Replace with your database password
    port: Number(process.env.DB_PORT), // Replace with your port number (default is 5432)
});

pool.connect((err: any) => { 
    if (err) { 
        console.error('Database connection error:', err.stack); 
    } else 
    { console.log('Database connected'); } 
});

const mainMenu = (): void => {
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
        if (err) {
            console.error('Error fetching departments', err.stack);
        } else {
            console.table(res.rows);
        }
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

const viewEmployees = () => {
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

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the new role:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department id of the new role:',
        }
    ]).then(answer => {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);';
        pool.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
            if (err) {
                console.error('Error adding department', err.stack);
            } else {
                console.log('Role added successfully');
            }
            mainMenu();
        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the new employee:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the new employee:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the id number of the new employees role:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the id number of the new employees boss:',
        }
    ]).then(answer => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);';
        pool.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
            if (err) {
                console.error('Error adding new employee', err.stack);
            } else {
                console.log('New employee added successfully');
            }
            mainMenu();
        });
    });
};

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the employee ID:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID:',
        }
    ]).then(answer => {
        const query = 'UPDATE employee SET role_id = $1 WHERE id = $2);';
        pool.query(query, [answer.role_id, answer.employee_id], (err, employeeRes) => {
            if (err) {
                console.error('Error updating employees role', err.stack);
            } else {
                console.log('Employee role updated successfully');
            }
            mainMenu();
        });
    });
};

mainMenu(); 