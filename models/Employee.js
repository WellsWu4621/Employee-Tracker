const orm = require('./orm.js')

const Employee = {
  async getEmployees() {
    const employees = await orm.find('employee')
    return employees
  },
  async addEmployee(employee) {
    const newEmployee = await orm.add('employee', employee)
    return newEmployee
  },
  async updateEmployee(id, updates) {
    const updated = await orm.findAndUpdate('employee', id, updates)
    return updated
  },
  async deleteEmployee(id) {
    const deleted = await orm.delete('employee', id)
    return deleted
  },
  async viewManagers() {
    const managers = await orm.findWhere('employee', 'manager_id IS NOT NULL')
    return managers
  } 
}

module.exports = Employee