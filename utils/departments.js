const questions = require("./questions");
const connection = require("../config/db")
const inquirer = require("inquirer");

function allDepartments() {
  console.log(questions);
  var query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
 questions();
}

function addNewDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the name of the new department?",
      },
    ])
    .then((res) => {
      console.log(res,connection.authorized);
      connection.execute(
        "INSERT INTO department(name) VALUES(?)",
        [res.departmentName],
        function (err, results, fields) {
          console.log("hitting");
          console.log(err, results, fields);
        }
      );
      questions();
    });
}

module.exports = { addNewDepartment, allDepartments };
