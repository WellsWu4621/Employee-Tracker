const db = require('./db')
const { prompt } = require('inquirer')
require('console.table')

const {
  Department: {
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    salaryCheck
  },
  Employee: {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    viewManagers
  },
  Role: {
    getRoles,
    addRole,
    updateRole,
    deleteRole
  }
} = require('./models')

salaryCheck(1)