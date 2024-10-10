import inquirer from "inquirer";
import pg from 'pg';


const mainMenu = () => {
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
    pool?.query(query, (err, res) => {
        if (err) throw err;
      console.table(res.rows); // Display results in table format
      mainMenu(); // Return to the main menu after displaying
    });
};

const viewEmployee = () => {
    const query = "SELECT employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;";
    pool?.query(query, (err, res) => {
    if (err) throw err;
      console.table(res.rows); // Display results in table format
      mainMenu(); // Return to the main menu after displaying
    });
};


mainMenu(); 
