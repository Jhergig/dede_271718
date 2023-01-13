import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Catalogo from './components/Catalogo';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import Direcciones from './components/Direcciones';
import Cesta from './components/Cesta';
import Pedidos from './components/Pedidos';
import './App.css';
import DetalleProducto from './components/DetalleProducto';
import Compra from './components/Compra';

function App(): JSX.Element {

  const [nombre, setNombre] = useState('');

  return (
    <>
      <Header nombre={nombre}/>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path='/login' element={<Login nombre={setNombre}/>} />
        <Route path='/logout' element={<Logout nombre={setNombre} />} />
        <Route path='/direcciones' element={<Direcciones />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/comprar/:id" element={<Compra/>} />
        <Route path='/cesta' element={<Cesta />} />
        <Route path='/pedidos' element={<Pedidos />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
