SELECT * FROM departments;

/* Output: all departments 
+------------+
| department |
+------------+
*/

SELECT role.title , department.name, role.salary 
FROM role
JOIN department
ON role.department_id = department.id;

/* Output: all roles 
+--------------+-------------------------------+
| title       | department        | salary     |
+--------------+-------------------------------+
*/

SELECT 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
JOIN role ON employee.role_id = role.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;



/* Output: all employees 
+--------------+----------------------------------------+
| first | last | title  | department | salary | manager |
|+--------------+---------------------------------------+

