class Cohort {
  constructor(name, students = []) {
    this.name = name
    this.capacity = 24
    this.students = students
  }

  addStudent(newStudent) {
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

module.exports = {
  Cohort
}
