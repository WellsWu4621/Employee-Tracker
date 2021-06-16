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
    viewManagers,
    viewEmployeesByManagers
  },
  Role: {
    getRoles,
    addRole,
    updateRole,
    deleteRole
  }
} = require('./models')

// continue function
const contCheck = () => {
  prompt({
    type: 'confirm',
    name: 'choice',
    message: 'Would you like to continue?'
  })
    .then(({ choice }) => choice ? mainMenu() : process.exit())
    .catch(err => console.log(err))
}

// main menu 
const mainMenu = () => {
  
}

// make a new Department
const newDepartment = () => {
  prompt(
    {
      type: 'input',
      name: 'name',
      message: 'What is the department\'s name?'
    }
  )
    .then(department => {
      addDepartment(department)
        .then(department => {
          console.log(`Department: ${department.name} Added!`)
          contCheck()
        })
    })
    .catch(err => console.log(err))
}

// make a new Role
const newRole = () => {
  getDepartments()
    .then(departments => {
      prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is your role\'s title?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is your role\'s salary? (please enter a number)'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'What department does your role belong to?',
          choices: departments.map(department => ({
            name: department.name,
            value: department.id
          }))
        }
      ])
        .then(role => {
          addRole(role)
            .then(role => {
              console.log(`Role: ${role.title} Added!`)
              contCheck()
            })
        })
    })
    .catch(err => console.log(err))
}

// make a new Employee
const newEmployee = () => {
  getRoles()
    .then(roles => {
      viewManagers()
        .then(managers => {
          console.log(managers)
          prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'What is the employee\'s First Name?'
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'What is the employee\'s Last Name?'
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'What is the employee\'s Role?',
              choices: roles.map(role => ({
                name: role.title,
                value: role.id
              }))
            },
            {
              type: 'list',
              name: 'manager_id',
              message: 'Who is the employee\'s manager? (Choose none if the employee has no manager)',
              choices: managers.map(manager => ({
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
              }))
            }
          ])
            .then(employee => {
              addEmployee(employee)
                .then(employee => {
                  console.log(`Employee: ${employee.first_name} ${employee.last_name} Added!`)
                  contCheck()
                })
            })
        })
    })
}

