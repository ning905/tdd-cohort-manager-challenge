const { CohortManager, Cohort, Student } = require('../cohort.js')

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

  const studentCoffeeBean = coffeeBean
  studentCoffeeBean.studentID = 1

  const studentCopyCoffeeBean = copyCoffeeBean
  studentCopyCoffeeBean.studentID = 3

  const studentCopyCoffeeBean2 = copyCoffeeBean2
  studentCopyCoffeeBean2.sudentID = 4

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
    const expected = new Cohort('cat')
    // execute
    const result = codingSchool.createCohort('cat')
    // verify
    expect(expected).toEqual(result)
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
    const expected = new Cohort('cat')
    codingSchool.createCohort('cat')
    codingSchool.createCohort('rabbit')
    codingSchool.createCohort('bird')
    // execute
    const result = codingSchool.getCohortByName('cat')
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
    const result = codingSchool.removeCohortByName('dog')
    // verify
    expect(expected).toEqual(result)
  })

  it('can remove a cohort by cohort name', () => {
    // set up
    const expected = [new Cohort('rabbit'), new Cohort('bird')]
    codingSchool.createCohort('cat')
    codingSchool.createCohort('rabbit')
    codingSchool.createCohort('bird')
    codingSchool.removeCohortByName('cat')
    // execute
    const result = codingSchool.cohorts
    // verify
    expect(expected).toEqual(result)
  })

  it('can add a student to a cohort', () => {
    // set up
    codingSchool.createCohort('cat')
    const expected = new Cohort('cat', [studentCoffeeBean])
    // execute
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    const result = codingSchool.getCohortByName('cat')
    // verify
    expect(expected).toEqual(result)
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
    const expected = new Cohort('cat', [studentCoffeeBean])
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(bangBang, 'cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    // execute
    const result = codingSchool.removeStudentFromCohort(bangBang, 'cat')
    // verify
    expect(expected).toEqual(result)
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
    const expected = studentCoffeeBean
    codingSchool.createCohort('cat')
    codingSchool.addStudentToCohort(coffeeBean, 'cat')
    codingSchool.addStudentToCohort(bangBang, 'cat')
    // execute
    const result = codingSchool.getStudentByID(1)
    // verify
    expect(expected).toEqual(result)
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
      studentCoffeeBean,
      studentCopyCoffeeBean2,
      studentCopyCoffeeBean
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
    expect(expected).toEqual(result)
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
