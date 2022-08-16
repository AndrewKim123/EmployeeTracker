const questions = require("./questions");
const connection = require("../config/db");
const inquirer = require("inquirer");

function allEmployees() {
    connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON department.id = roles.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id;",
      (err, res) => {
        if (err) {
          console.log(err);
        }
        console.table(res);
      }
    );
    questions();
  }

  function addNewEmployee() {
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is their first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is their last name?",
        },
        {
          name: "role",
          type: "input",
          message: "What is their role id?",
        },
        {
          name: "manager",
          type: "input",
          message: "What is their manager id?",
        },
      ])
      .then((res) => {
        connection.query("INSERT INTO employee SET ?", {
          first_name: res.first_name,
          last_name: res.last_name,
          role_id: res.role,
          manager_id: res.manager,
        });
        allEmployees();
      });
  }

  function updateEmployees() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "employee_old_id",
          message: "What is the id number of the employee you'd like to update?",
        },
        {
          type: "input",
          name: "employee_new_role",
          message: "What is the id number of the new role for this employee?",
        },
      ])
      .then((res) => {
        connection.query(`SELECT id FROM employee WHERE id=${res.employee_old_id}`);
        connection.query(`UPDATE employee SET ? WHERE role_id=${res.employee_old_id}`, {
          role_id: res.employee_new_role,
        });
        connection.query("SELECT * FROM employee", (err, res) => {
          if (err) {
            console.log(err);
          }
          console.table(res);
        });
        questions();
      });
  }

module.exports = {allEmployees,addNewEmployee,updateEmployees}