import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/home'
import { Blogs } from './pages/Blogs'
import { WholeBlog } from './pages/SingleBlog'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/signup' element={<AuthPage type='signup' />}></Route>
      <Route path='/signin' element={<AuthPage type='signin' />}></Route>
      <Route path='/blogs' element={<Blogs />}></Route>
      <Route path='/blogs/:id' element={<WholeBlog />}></Route >
    </Routes>
  </BrowserRouter>
}

export default App
