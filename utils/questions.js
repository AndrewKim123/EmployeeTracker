const inquirer = require("inquirer");

function questions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "questions",
        message: "What would you like to view?",
        choices: [
          {
            name: "View all departments",
            value: "allDepartments",
          },
          {
            name: "View all roles",
            value: "allRoles",
          },
          {
            name: "View all employees",
            value: "allEmployees",
          },
          {
            name: "Add a department",
            value: "addNewDepartment",
          },
          {
            name: "Add a role",
            value: "addNewRole",
          },
          {
            name: "Add an employee",
            value: "addNewEmployee",
          },
          {
            name: "Update an employee role",
            value: "updateEmployees",
          },
        ],
      },
    ])
    .then((choice) => {
      switch (choice.questions) {
        case "allDepartments":
          allDepartments();
          break;
        case "allRoles":
          allRoles();
          break;
        case "allEmployees":
          allEmployees();
          break;
        case "addNewDepartment":
          addNewDepartment();
          break;
        case "addNewRole":
          addNewRole();
          break;
        case "addNewEmployee":
          addNewEmployee();
          break;
        case "updateEmployees":
          updateEmployees();
          break;
      }
    });
}
module.exports = questions;

const { allDepartments, addNewDepartment } = require("./departments");
const { allEmployees, addNewEmployee, updateEmployees } = require("./employees");
const { allRoles, addNewRole } = require("./roles");