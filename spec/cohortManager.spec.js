const { CohortManager } = require('../src/cohortManager.js')
const { Student } = require('../src/student.js')

describe('CohortManager', () => {
  let codingSchool
  const coffeeBean = new Student(
    'Coffee',
    'Bean',
    'coffeebeangithub',
    'coffeebean@catoogle.com'
  )
  const copyCoffeeBean = new Student(
    'Coffee',
    'Bean',
    'copycoffeebeangithub',
    'copycoffeebean@catoogle.com'
  )

  const copyCoffeeBean2 = new Student(
    'Coffee',
    'Bean',
    'copycoffeebean2github',
    'copycoffeebean2@catoogle.com'
  )

  const bangBang = new Student(
    'Bang',
    'Bang',
    'bangbanggithub',
    'bangbang@catoogle.com'
  )

  beforeEach(() => {
    codingSchool = new CohortManager()
  })

  it('cannot create a cohort without a valid name', () => {
    // set up
    const expected = 'Cohort must have a name'
    // execute
    const result = codingSchool.createCohort('')
    // verify
    expect(expected).toEqual(result)
  })

  it('can create a cohort with a valid name ', () => {
    // set up
    const expected = {
      name: 'cat',
      capacity: 24,
      students: []
    }
    // execute
    const result = codingSchool.createCohort('cat')
    // verify
    expect(expected.name).toEqual(result.name)
    expect(expected.capacity).toEqual(result.capacity)
    expect(expected.students).toEqual(result.students)
  })

  it('cannot create a cohort with the same name', () => {
    // set up
    const expected = 'This name has been used'
    codingSchool.createCohort('cat')
    // execute
    const result = codingSchool.createCohort('cat')
    // verify
    expect(expected).toEqual(result)
  })

  it('can return error when the cohort with the given name does not exist', () => {
    // set up
    const expected = false
    codingSchool.createCohort('cat')
    codingSchool.createCohort('rabbit')
    codingSchool.createCohort('bird')
    // execute
    const result = codingSchool.getCohortByName('dog')
    // verify
    expect(expected).toEqual(result)
  })

  it('can search for a cohort by cohort name', () => {
    // set up
    const expected = {
      name: 'cat',
      capacity: 24,
      students: []
    }
    codingSchool.createCohort('cat')
    codingSchool.createCohort('rabbit')
    codingSchool.createCohort('bird')
    // execute
    const result = codingSchool.getCohortByName('cat')
    // verify
    expect(expected.name).toEqual(result.name)
    expect(expected.capacity).toEqual(result.capacity)
    expect(expected.students).toEqual(result.students)
  })

  it('can return error when the cohort with the given name does not exist', () => {
    // set up
    const expected = false
    codingSchool.createCohort('cat')
    codingSchool.createCohort('rabbit')
    codingSchool.createCohort('bird')
    // execute
    const result = codingSchool.removeCohortByName('dog')
    // verify
    expect(expected).toEqual(result)
  })

  it('can remove a cohort by cohort name', () => {
    // set up
    const expected = [
      {
        name: 'rabbit',
        capacity: 24,
        students: []
      },
      {
        name: 'bird',
        capacity: 24,
        students: []
      }
    ]
    codingSchool.createCohort('cat')
    codingSchool.createCohort('rabbit')
    codingSchool.createCohort('bird')
    codingSchool.removeCohortByName('cat')
    // execute
    const result = codingSchool.cohorts
    // verify
    expect(expected.name).toEqual(result.name)
    expect(expected.capacity).toEqual(result.capacity)
    expect(expected.students).toEqual(result.students)
  })

  it('can add a student to a cohort', () => {
    // set up
    codingSchool.createCohort('cat')
    const expected = {
      name: 'cat',
      capacity: 24,
      students: [
        {
          firstName: 'Coffee',
          lastName: 'Bean',
          githubUserName: 'coffeebeangithub',
          email: 'coffeebean@catoogle.com',
          studentID: 1
        }
      ]
    }
    // execute
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    const result = codingSchool.getCohortByName('cat')
    // verify
    expect(expected.name).toEqual(result.name)
    expect(expected.capacity).toEqual(result.capacity)
    expect(expected.students.firstName).toEqual(result.students.firstName)
    expect(expected.students.lastName).toEqual(result.students.lastName)
    expect(expected.students.githubUserName).toEqual(
      result.students.githubUserName
    )
    expect(expected.students.email).toEqual(result.students.email)
  })

  it('cannot add a student when the cohort does not exist', () => {
    // set up
    const expected = 'Cohort not found'
    codingSchool.createCohort('cat')
    // execute
    const result = codingSchool.addStudentToCohort(coffeeBean, 'dog')
    // verify
    expect(expected).toEqual(result)
  })

  it('cannot add an existing student to a cohort', () => {
    // set up
    const expected = 'Student already in a cohort'
    codingSchool.createCohort('cat')
    codingSchool.createCohort('rabbit')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    // execute
    const result = codingSchool.addStudentToCohort(coffeeBean, 'rabbit')
    // verify
    expect(expected).toEqual(result)
  })

  it('cannot add a student when the cohort reaches its capacity', () => {
    // set up
    const expected = 'The cohort is full'
    const catCohort = codingSchool.createCohort('cat')
    catCohort.capacity = 1
    codingSchool.addStudentToCohort(bangBang, 'cat')
    // execute
    const result = codingSchool.addStudentToCohort(coffeeBean, 'cat')
    // verify
    expect(expected).toEqual(result)
  })

  it('can remove a student from a cohort', () => {
    // set up
    const expected = {
      name: 'cat',
      capacity: 24,
      students: [
        {
          firstName: 'Coffee',
          lastName: 'Bean',
          githubUserName: 'coffeebeangithub',
          email: 'coffeebean@catoogle.com',
          studentID: 1
        }
      ]
    }
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(bangBang, 'cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    // execute
    const result = codingSchool.removeStudentFromCohort(bangBang, 'cat')
    // verify
    expect(expected.name).toEqual(result.name)
    expect(expected.capacity).toEqual(result.capacity)
    expect(expected.students.firstName).toEqual(result.students.firstName)
    expect(expected.students.lastName).toEqual(result.students.lastName)
    expect(expected.students.githubUserName).toEqual(
      result.students.githubUserName
    )
    expect(expected.students.email).toEqual(result.students.email)
  })

  it('cannot remove a student when the cohort is not found', () => {
    // set up
    const expected = 'Cohort not found'
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    // execute
    const result = codingSchool.removeStudentFromCohort(coffeeBean, 'dog')
    // verify
    expect(expected).toEqual(result)
  })

  it('cannot remove a student when student is not found', () => {
    // set up
    const expected = 'Student not found'
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    // execute
    const result = codingSchool.removeStudentFromCohort(bangBang, 'cat')
    // verify
    expect(expected).toEqual(result)
  })

  it('can search for a student by their student ID', () => {
    // set up
    const expected = {
      firstName: 'Coffee',
      lastName: 'Bean',
      githubUserName: 'coffeebeangithub',
      email: 'coffeebean@catoogle.com',
      studentID: 1
    }
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    codingSchool.addStudentToCohort(bangBang, 'cat')
    // execute
    const result = codingSchool.getStudentByID(1)
    // verify
    expect(expected.firstName).toEqual(result.firstName)
    expect(expected.lastName).toEqual(result.lastName)
    expect(expected.githubUserName).toEqual(result.githubUserName)
    expect(expected.email).toEqual(result.email)
    expect(expected.studentID).toEqual(result.studentID)
  })

  it('can return an error message if student ID is not found', () => {
    // set up
    const expected = 'Student not found'
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(bangBang, 'cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    // execute
    const result = codingSchool.getStudentByID(3)
    // verify
    expect(expected).toEqual(result)
  })

  it('can search for students by their first and last names', () => {
    // set up
    const expected = [
      {
        firstName: 'Coffee',
        lastName: 'Bean',
        githubUserName: 'coffeebeangithub',
        email: 'coffeebean@catoogle.com',
        studentID: 1
      },
      {
        firstName: 'Coffee',
        lastName: 'Bean',
        githubUserName: 'copycoffeebean2github',
        email: 'copycoffeebean2@catoogle.com',
        studentID: 4
      },
      {
        firstName: 'Coffee',
        lastName: 'Bean',
        githubUserName: 'copycoffeebeangithub',
        email: 'copycoffeebean@catoogle.com',
        studentID: 3
      }
    ]
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    codingSchool.addStudentToCohort(bangBang, 'cat')
    codingSchool.createCohort('rabbit')
    codingSchool.addStudentToCohort(copyCoffeeBean, 'rabbit')
    codingSchool.addStudentToCohort(copyCoffeeBean2, 'cat')
    // execute
    const result = codingSchool.getStudentByName('Coffee', 'Bean')
    // verify
    expect(expected.firstName).toEqual(result.firstName)
    expect(expected.lastName).toEqual(result.lastName)
    expect(expected.githubUserName).toEqual(result.githubUserName)
    expect(expected.email).toEqual(result.email)
    expect(expected.studentID).toEqual(result.studentID)
  })

  it('can return error if student of given name does not exist', () => {
    // set up
    const expected = 'Student not found'
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    codingSchool.createCohort('rabbit')
    codingSchool.addStudentToCohort(copyCoffeeBean, 'rabbit')
    codingSchool.addStudentToCohort(copyCoffeeBean2, 'cat')
    // execute
    const result = codingSchool.getStudentByName('Bang', 'Bang')
    // verify
    expect(expected).toEqual(result)
  })
})
