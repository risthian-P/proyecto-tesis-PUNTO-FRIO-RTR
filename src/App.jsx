import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import { Register } from './paginas/Register'
import { Forgot } from './paginas/Forgot'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Listar from './paginas/Listar'
import Crear from './paginas/Crear'
import Perfil from './paginas/Perfil'
import CajaDeVenta from './paginas/CajaDeVenta'
import Restablecer from './paginas/Restablecer'

import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/privateRoutes'
import RoleBasedRoute from './context/RoleBasedRoute'
import FormularioPerfil from './componets/Perfil/FormularioPerfil'
import React from 'react'
import { CardPerfil } from './componets/Perfil/CardPerfil'
import Password from './componets/Perfil/Password'

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        
        <Routes>
          
          <Route index element={<LandinPage/>}/> 

          <Route path='/' element={<Auth/>}>
            <Route path='login' element={<Login/>}/>          
            <Route path='forgot/:id' element={<Forgot/>}/>
            <Route path='reset-password/:token' element={<Restablecer/>}/>
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='dashboard/*' element = {
            <PrivateRoute>
              <Routes>
                <Route element={<Dashboard/>}>
                  <Route index element={<Listar/>}/>
                  <Route path='listar' element={<Listar/>}/>
                  <Route path='CajaDeVenta' element={<CajaDeVenta/>}/>
                  <Route path='crear' element={
                    <RoleBasedRoute>
                      <Crear/>
                    </RoleBasedRoute>
                    }/>
                  <Route path='register' element={
                    <RoleBasedRoute>
                      <Register/>
                    </RoleBasedRoute> 
                    }/>
                    <Route path='perfil' element={<CardPerfil/>}/>
                    <Route path='actualizar-perfil' element={<FormularioPerfil/>}/>
                    <Route path='actualizar-contrasena' element={<Password/>}/>
                    <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
            </PrivateRoute>
          }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
