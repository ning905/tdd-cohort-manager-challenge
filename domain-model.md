class Student
properties:
    firstName(@String)
    lastName(@String)
    githubUserName(@String)
    email(@String)


class Cohort
properties: 
    this.name = name(@String)
    this.capacity = 24(@Number)
    this.students = []@Object

Method: addStudent(student)
Input: student(@Object)
Scenario: the student is already in a cohort
Output: false
Scenario: Else
Output: true(@Boolean)

Method: removeStudent(student)
Input: cohort(@Object), student(@Object)
Scenario: student not found
Output: false(@Boolean)
Scenario: Else
Output: true(@Boolean)

Method: getStudentInCohortByID(studentID)
Input: studentID(@Number)
Scenario: can not find a student with the given ID
Output: false(@Boolean)
Scenario: Else
Output: student(@Object)

Method: getStudentInCohortByName(firstName, lastName)
Input: firstName(@String), lastName(@String)
Scenario: no matching results
Output: false(@Boolean)
Scenario: else
Output: students([]@Object)


class CohortManager extends Cohort
properties:
    this.cohorts: []@Object
    this.studentID: 0(@Number)

Method: createCohort(name)
Input: name(@String)
Scenario: The given name is empty
Output: 'Cohort must have a name'
Scenario: Else 
Scenario: A cohort with the given name has been created
Output: 'This name has been used.'
Scenario: Else
    new Cohort(name)
    Update this.cohorts
Output: cohort(@Object, properties: name(@String), capacity(@Number, 24), students([]Object) )

Method: getCohortByName(name)
Input: name(@String)
Scenario: cohort not found
Output: false
Scenario: Else
Output: cohort(@Object, properties: name(@String), capacity(@Number, 24), students([]Object) )

Method: removeCohortByName(name)
Input: name(@String)
Scenario: cohort not found
Output: 'Cohort not found'
Scenario: Else
    Update this.cohorts
Output: 'Cohort removed'

Method: addStudentToCohort(student, cohort)
Input: cohort(@Object), student(@Object)
Scenario: cohort name not found
Output: 'Cohort not found'
Scenario: Else
Scenario: cohort reached capacity
Output: 'The cohort is full'
    student.id = this.studentID ++
    use Cohort method addStudent(student)

Method: removeStudentFromCohort(student, cohort)
Input: cohort(@Object), student(@Object)
Scenario: cohort name not found
Output: 'Cohort not found'
Scenario: Else
    use Cohort method removeStudent(student)


Method: getStudentByID(studentID)
Input: studentID(@Number)
    for every cohort in cohorts[]
    use Cohort method getStudentInCohortByID(studentID)


Method: getStudentByName(firstName, lastName)
Input: firstName(@String), lastName(@String)
    for every cohort in cohorts[]
    use Cohort method getStudentInCohortByName(firstName, lastName)



