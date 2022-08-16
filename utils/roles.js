const questions = require("./questions");
const connection = require("../config/db");
const inquirer = require("inquirer");

function allRoles() {
  var query = "SELECT * FROM roles";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  questions();
}

function addNewRole() {
  inquirer
    .prompt([
      {
        name: "roleName",
        type: "input",
        message: "What is the name of the new role?",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the salary of the new role?",
      },
      {
        name: "department",
        type: "input",
        message: "Which department does the role belong to?",
      },
    ])
    .then((res) => {
      connection.query("INSERT INTO roles SET ?", {
        title: res.roleName,
        salary: res.roleSalary,
        department_id: res.department,
      });
      var query = "SELECT * FROM roles";
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
      });
      questions();
    });
}

module.exports = { addNewRole, allRoles };
