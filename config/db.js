const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee_tracker",
  password: "Aka45654.",
});

module.exports = connection