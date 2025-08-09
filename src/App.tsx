import { Routes, Route } from 'react-router'
import Home from './views/Home'
import Navbar from './components/Navbar/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}
