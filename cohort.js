class Student {
  constructor(firstName, lastName, githubUserName, email) {
    this.firstName = firstName
    this.lastName = lastName
    this.githubUserName = githubUserName
    this.email = email
  }
}

class Cohort {
  constructor(name, students = []) {
    this.name = name
    this.capacity = 24
    this.students = students
  }

  addStudent(newStudent) {
    if (this.students.find((student) => student === newStudent)) {
    }
    this.students.push(newStudent)
  }

  removeStudent(studentToRemove) {
    if (this.students.find((student) => student === studentToRemove)) {
      const index = this.students.indexOf(studentToRemove)
      this.students.splice(index, 1)
    }
  }

  getStudentInCohortByID(ID) {
    const findStudent = this.students.find(
      (student) => student.studentID === ID
    )
    if (findStudent) {
      return findStudent
    }
    return false
  }

  getStudentInCohortByName(firstName, lastName) {
    const studentsFound = []
    for (let i = 0; i < this.students.length; i++) {
      if (
        this.students[i].firstName === firstName &&
        this.students[i].lastName === lastName
      ) {
        studentsFound.push(this.students[i])
      }
    }
    return studentsFound
  }
}

class CohortManager extends Cohort {
  constructor() {
    super()
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
    if (this.getCohortByName(name)) {
      const index = this.cohorts.indexOf(this.getCohortByName(name))
      this.cohorts.splice(index, 1)
      return this.cohorts
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
  Student,
  Cohort,
  CohortManager
}
