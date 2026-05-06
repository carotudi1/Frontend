import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductFormPage from './pages/ProductFormPage'
import SetsPage from './pages/SetsPage'
import { getCurrentUser } from './services/authServices'

function App() {
  const user = getCurrentUser()
  const showNavbar = user !== null

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
          <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/" />} />
          <Route path="/products/new" element={user ? <ProductFormPage /> : <Navigate to="/" />} />
          <Route path="/products/:id" element={user ? <ProductDetailPage /> : <Navigate to="/" />} />
          <Route path="/products/:id/edit" element={user ? <ProductFormPage /> : <Navigate to="/" />} />
          <Route path="/sets" element={user ? <SetsPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
      {showNavbar && <Footer />}
    </>
  )
}

export default App
