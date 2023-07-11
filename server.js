//getting started on the command line app for my employee database.
// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 


//import the required modules needed
const mysql = require("mysql2");
const inquirer = require("inquirer");
//.env file 
require("dotenv").config();
// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employeetracker",
});

function startApp(){
  inquirer
 .prompt([
  {
    type: 'list',
    name: 'starting menu',
    message: 'What would you like to do?',
      choices: [
        'View all employees',
          'Add employee',
          'Update employee role',
          'Exit',
    
    ],
  },
 ]);
//making a function to add employee(s)
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      {
        type: 'input',
        name: 'role_id',
        message: "Enter the employee's role ID:",
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "Enter the employee's manager ID:",
      },
    ])
    .then((answers) => {
      connection.query(
        'INSERT INTO employees SET ?',
        answers,
        (err, result) => {
          if (err) throw err;
          console.log('Employee added successfully.');
          startApp();
        }
      );
});
};



//function thatbasically updates employee(s) role
function updateEmployeeRole() {
  connection.query('SELECT * FROM employees', (err, employees) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Select the employee's ID:",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the new role ID:',
        },
      ])
      .then((answers) => {
        connection.query(
          'UPDATE employees SET role_id = ? WHERE id = ?',
          [answers.newRoleId, answers.employeeId],
          (err, result) => {
            if (err) throw err;
            console.log('Employee role updated successfully.');
            startApp();
          }
        );
      });
  });
}
}