import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const StudentProfileContext = createContext(null)

const initialProfile = {
  name: '',
  department: '',
  year: null,
  preferredBusStop: '',
  scholarshipProfile: {},
  savedEventIds: [],
}

export function StudentProfileProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('fiveways-profile', initialProfile)

  return (
    <StudentProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </StudentProfileContext.Provider>
  )
}

export function useStudentProfile() {
  const value = useContext(StudentProfileContext)
  if (!value) throw new Error('useStudentProfile must be used within StudentProfileProvider')
  return value
}
