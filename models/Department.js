const orm = require('./orm.js')

const Department = {
  async getDepartments () {
    const departments = await orm.find('department')
    return departments
  },
  async addDepartment (department) {
    const newDepartment = await orm.add('department', department)
    return newDepartment
  },
  async updateDepartment (id, updates) {
    const updated = await orm.findAndUpdate('department', id, updates)
    return updated
  },
  async deleteDepartment (id) {
    const deleted = await orm.delete('department', id)
    return deleted
  },
  async salaryCheck (id) {
    const salaries = await orm.departmentSalaryTable(id)
    let sum = 0
    for (let i = 0; i < salaries.length; i++) {
      sum += parseInt(salaries[i].salary)
    }
    console.log(sum)
  },
}

module.exports = Department