import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Galeria from './pages/Galeria'
import ComoPedir from './pages/ComoPedir'
import HacerPedido from './pages/HacerPedido'
import Contacto from './pages/Contacto'

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/como-pedir" element={<ComoPedir />} />
        <Route path="/hacer-pedido" element={<HacerPedido />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}
