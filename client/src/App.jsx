import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserData } from './context/UserContext'
import AccountPage from './pages/AccountPage'
import NavigationBar from './components/NavigationBar'
import NotFound from './components/NotFound'
import ReelsPage from './pages/ReelsPage'
import { Loading } from './components/Loading'
import UserAccountPage from './pages/UserAccountPage'
import SearchPage from './pages/SearchPage'
import ChatPage from './pages/ChatPage'

const App = () => {

  const { loading, isAuth, user } = UserData()

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path='/' element={isAuth ? <HomePage/> : <LoginPage/>}/>
            <Route path='/reels' element={isAuth ? <ReelsPage/> : <LoginPage/>}/>
            <Route path='/account' element={isAuth ? <AccountPage user={user}/> : <LoginPage/>}/>
            <Route path='/user/:id' element={isAuth ? <UserAccountPage user={user}/> : <LoginPage/>}/>
            <Route path='/login' element={!isAuth ? <LoginPage/> : <HomePage/>}/>
            <Route path='/register' element={!isAuth ? <RegisterPage/> : <HomePage/>}/>
            <Route path='/search' element={isAuth ? <SearchPage/> : <LoginPage/>}/>
            <Rtoue path='/chat' element={isAuth ? <ChatPage/> : <LoginPage/>}/>
            <Route path='/*' element={<NotFound/>}/>
          </Routes>
        </Suspense>
        {isAuth && <NavigationBar/>}
      </BrowserRouter>
    </>
  )
}

export default App