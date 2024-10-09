INSERT INTO department (name)
VALUES 
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 'Sales'),
    ('Salesperson', 80000, 'Sales'),
    ('Lead Engineer', 150000, 'Engineering'),
    ('Software Engineer', 120000, 'Engineering'),
    ('Account Manager', 160000, 'Finance'),
    ('Accountant', 125000, 'Finance'),
    ('Legal Team Lead', 250000, 'Legal'), 
    ('Lawyer', 190000, 'Legal');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    (),
    (),
    (),
    (),
    (),
    (),
    (), 
    ();