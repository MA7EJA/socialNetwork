import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserData } from './context/UserContext'

const App = () => {

  const { loading, isAuth, user } = UserData()

  return (
    <>
      {loading ? "" : <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuth ? <HomePage/> : <LoginPage/>}/>
          <Route path='/login' element={!isAuth ? <LoginPage/> : <HomePage/>}/>
          <Route path='/register' element={!isAuth ? <RegisterPage/> : <HomePage/>}/>
        </Routes>
      </BrowserRouter>}
    </>
  )
}

export default App