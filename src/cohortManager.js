const { Cohort } = require('../src/cohort.js')

class CohortManager {
  constructor() {
    this.cohorts = []
    this.studentID = 1
  }

  createCohort(name) {
    if (!name) {
      return 'Cohort must have a name'
    }
    if (this.getCohortByName(name)) {
      return 'This name has been used'
    }
    const cohort = new Cohort(name)
    this.cohorts.push(cohort)
    return cohort
  }

  getCohortByName(name) {
    const findCohort = this.cohorts.find((cohort) => cohort.name === name)
    if (findCohort) {
      return findCohort
    }
    return false
  }

  removeCohortByName(name) {
    const findCohort = this.getCohortByName(name)
    if (findCohort && findCohort.students.length === 0) {
      const index = this.cohorts.indexOf(this.getCohortByName(name))
      this.cohorts.splice(index, 1)
      return this.cohorts
    }
    return false
  }

  clearCohortByName(name) {
    const findCohort = this.getCohortByName(name)
    if (findCohort) {
      findCohort.students = []
      this.removeCohortByName(name)
      return 'Cohort and students removed'
    }
    return false
  }

  addStudentToCohort(student, cohortName) {
    const findCohort = this.getCohortByName(cohortName)
    if (!findCohort) {
      return 'Cohort not found'
    }
    if (findCohort.students.length === findCohort.capacity) {
      return 'The cohort is full'
    }
    for (let i = 0; i < this.cohorts.length; i++) {
      if (this.cohorts[i].students.includes(student)) {
        return 'Student already in a cohort'
      }
    }
    student.studentID = this.studentID++
    findCohort.addStudent(student)
    return findCohort
  }

  removeStudentFromCohort(student, cohortName) {
    const findCohort = this.getCohortByName(cohortName)
    if (!findCohort) {
      return 'Cohort not found'
    }
    if (!findCohort.students.includes(student)) {
      return 'Student not found'
    }
    findCohort.removeStudent(student)
    return findCohort
  }

  getStudentByID(ID) {
    for (let i = 0; i < this.cohorts.length; i++) {
      const foundStudent = this.cohorts[i].getStudentInCohortByID(ID)
      if (foundStudent) {
        return foundStudent
      }
    }
    return 'Student not found'
  }

  modifyStudentInfo(ID, newGithub, newEmail) {
    const findStudent = this.getStudentByID(ID)
    findStudent.githubUserName = newGithub
    findStudent.email = newEmail
    return findStudent
  }

  getStudentByName(firstName, lastName) {
    let found = []
    for (let i = 0; i < this.cohorts.length; i++) {
      const foundStudent = this.cohorts[i].getStudentInCohortByName(
        firstName,
        lastName
      )
      found = [...found, ...foundStudent]
    }
    if (found.length > 0) {
      return found
    }
    return 'Student not found'
  }
}

module.exports = {
  CohortManager
}
