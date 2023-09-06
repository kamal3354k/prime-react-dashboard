import { Typography } from '@mui/material'
import './styles/App.css'
import routes from './router/route'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        {routes.map((item,i)=>{
          return <Route key={i} {...item} />
        })}
      </Routes>
    </>
  )
}

export default App
