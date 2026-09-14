import { RouterProvider } from 'react-router-dom'
import { appRouter } from './router'
import { StudentProfileProvider } from '../state/StudentProfileContext'

export default function App() {
  return (
    <StudentProfileProvider>
      <RouterProvider router={appRouter} />
    </StudentProfileProvider>
  )
}
