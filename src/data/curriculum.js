// Competition dataset derived from IFET academic documents supplied for the prototype.
// Admin-owned in production: Regulation -> Department -> Semester -> Courses.
export const curriculum = {
  '2023': {
    CSE: {
      name: 'Computer Science & Engineering',
      semesters: {
        1: [
          { code: '23EN1101', title: 'Professional English', credits: 3 },
          { code: '23MA1201', title: 'Calculus and its Applications', credits: 4 },
          { code: '23CH1201', title: 'Chemistry for Information Science', credits: 3 },
          { code: '23CS1301', title: 'Problem Solving using C Programming', credits: 3 },
          { code: '23CH1L01', title: 'Chemistry Laboratory for Information Science', credits: 1.5 },
          { code: '23CS1L01', title: 'Problem Solving using C Programming Laboratory', credits: 1.5 },
          { code: '23PL1001', title: 'Product Development Lab I', credits: 1 },
          { code: '23GE1T01', title: 'Heritage of Tamils', credits: 1 },
          { code: '23MC1002', title: 'Gender Equity', credits: 0 },
        ],
        2: [
          { code: '23GE1102', title: 'Sensitisation to Universal Human Values', credits: 3 },
          { code: '23MA2201', title: 'Probability and Statistics for Data Analysis', credits: 4 },
          { code: '23PH1205', title: 'Physics for Information Science', credits: 3 },
          { code: '23CS2301', title: 'Python Programming', credits: 3 },
          { code: '23EC2302', title: 'Digital Principles and Computer Organization', credits: 3 },
          { code: '23PH1L05', title: 'Physics Laboratory for Information Science', credits: 1.5 },
          { code: '23CS2L01', title: 'Python Programming Laboratory', credits: 1.5 },
          { code: '23PL2002', title: 'Product Development Lab II', credits: 1 },
          { code: '23GE2101', title: 'Tamils and Technology', credits: 1 },
          { code: '23MC2002', title: 'Women Empowerment', credits: 0 },
        ],
        5: [
          { code: '23CS5401', title: 'Software Engineering', credits: 3 },
          { code: '23CS5402', title: 'Machine Learning', credits: 3 },
          { code: '23CS5403', title: 'Cryptography and Network Security Principles', credits: 3 },
          { code: '23CS5404', title: 'Theory of Computation', credits: 4 },
          { code: '23CS5405', title: 'Computer Graphics', credits: 3 },
          { code: '23CH5602', title: 'Environment and Agriculture', credits: 3 },
          { code: '23CS5L01', title: 'Software Engineering Laboratory', credits: 1.5 },
          { code: '23CS5L02', title: 'Machine Learning Laboratory', credits: 1.5 },
          { code: '23SD5X01', title: 'Career Skill Development I (Placement)', credits: 2 },
        ],
      },
    },
  },
}

export const regulations = Object.keys(curriculum)

export function getDepartments(regulation) {
  const departments = curriculum[regulation] ?? {}
  return Object.entries(departments).map(([code, value]) => ({ code, name: value.name }))
}

export function getSemesters(regulation, department) {
  const semesters = curriculum[regulation]?.[department]?.semesters ?? {}
  return Object.keys(semesters).map(Number).sort((a, b) => a - b)
}

export function getCourses(regulation, department, semester) {
  return curriculum[regulation]?.[department]?.semesters?.[semester] ?? []
}
