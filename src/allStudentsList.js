const { Student } = require('./student.js')
const { CohortManager } = require('./cohortManager.js')

const allStudentNames = [
  'Edgar Merritt',
  'Jayden Fusco',
  'Isela Kerr',
  'Caroline Horowitz',
  'Hector Noe',
  'Issac Kozlowski',
  'Lacie Chisholm',
  'Moshe Haugen',
  'Kyle Corona',
  'Kylee Fish',
  'Kiarra Pryor',
  'Jayde Wilder',
  'Lyle Lemay',
  'Darren Jacques',
  'Aman Vogel',
  'Tianna Stacey',
  'Isiah Hearn',
  'Macayla Merritt',
  'Kahlil Kearney',
  'Jermaine Covey',
  'Abel Ayala',
  'Haden Gallant',
  'London Lam',
  'Shauna McFadden',
  'Immanuel Whitson',
  'Denise Easter',
  'Marco Mitchell',
  'Marion Gillespie',
  'Amelia Santoro',
  'Janine Reno',
  'Quinton McIntyre',
  'Dillan Sutter',
  'Johnathan Crockett',
  'Citlalli Desantis',
  'Bradley Heller',
  'Nikita Crane',
  'Konnor Massie',
  'Alisha Comer',
  'Heidi Sage',
  'Tahj Vigil',
  'Rory Loera',
  'Julieta Llamas',
  'Layla Loyd',
  'Jaquelyn Nagy',
  'Sheldon Jacob',
  'Blaze Ladd',
  'Macie Poore',
  'Philip Peoples',
  'Kali Cook',
  'Quintin McFarland',
  'Claudia Stahl',
  'Lydia Nielsen',
  'Isaak Buckner',
  'Jordy Quarles',
  'Shannon Nesbitt',
  'Benton Erb',
  'Allyssa Hager',
  'Jaela Hicks',
  'Shay Ricker',
  'Stormy Foote',
  'Oliver Shipp',
  'Marvin Amaya',
  'Saige Poole',
  'Clayton Page',
  'Gretchen Hampton',
  'Cristian Hanson',
  'Aurora Connor',
  'Brant Spencer',
  'Jasmyne Pham',
  'Kianna Pritchett',
  'Eliana Fay',
  'Marcel McNamara'
]

const createProfile = (name) => {
  const fullName = name.split(' ')
  const firstName = fullName[0]
  const lastName = fullName[1]
  const githubUserName = firstName + lastName + 'github'
  const email = firstName + lastName + '@gmail.com'
  return new Student(firstName, lastName, githubUserName, email)
}

const createStudents = (nameList) => {
  const studentList = []
  for (let i = 0; i < nameList.length; i++) {
    studentList.push(createProfile(nameList[i]))
  }
  return studentList
}

const studentsApplied = createStudents(allStudentNames)

const manager = new CohortManager()
const cohort1 = manager.createCohort('cohort1')
const cohort2 = manager.createCohort('cohort2')
const cohort3 = manager.createCohort('cohort3')

const addAllStudentsToCohorts = (studentList, cohorts) => {
  for (let j = 0; j < cohorts.length; j++) {
    for (let i = 0; i < studentList.length; i++) {
      manager.addStudentToCohort(studentList[i], cohorts[j].name)
    }
  }
  return cohorts
}

addAllStudentsToCohorts(studentsApplied, manager.cohorts)

// console.log('addAllStudentsToCohorts', cohort1)
// console.log('addAllStudentsToCohorts', cohort2)
// console.log('addAllStudentsToCohorts', cohort3)
/*
const allStudents = [
  ...cohort1.students,
  ...cohort2.students,
  ...cohort3.students
]

console.log('allStudents', allStudents)

allStudents.sort((a, b) => {
  if (a.lastName < b.lastName) {
    return -1
  }
  return 1
})

console.log('allStudents', allStudents)
*/

console.log('removeCohortByName', manager.removeCohortByName('cohort1'))
manager.clearCohortByName('cohort1')
console.log('clearCohortByName', manager.clearCohortByName('cohort2'))
console.log('all cohorts', manager.cohorts)
console.log('original information', manager.getStudentByID(70))
console.log(
  'modifyStudentInfo',
  manager.modifyStudentInfo(70, 'ningmagithub', 'ning@gmail.com')
)
