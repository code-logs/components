import Menubar from '@code-logs/menubar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AppTitle from './components/AppTitle/AppTitle'
import { menus } from './constants'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import RepositorySetting from './pages/RepositorySetting/RepositorySetting'
import './styles/global.scss'
import './styles/layout.scss'

const App = () => {
  const navigate = useNavigate()

  return (
    <>
      <header>
        <nav>
          <AppTitle />
          <Menubar menus={menus} onRoute={(route) => navigate(route)} />
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/settings/repository" element={<RepositorySetting />} />
        </Routes>
      </main>
    </>
  )
}

export default App
