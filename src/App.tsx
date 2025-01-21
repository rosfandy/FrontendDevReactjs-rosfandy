import { Route, Routes } from 'react-router-dom'
import { Detail, Main } from './pages'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/details/:id' element={<Detail />} />
    </Routes>
  )
}