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

  const [webId, setWebId] = useState('');

  return (
    <>
      <Header webId={webId} />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path='/login' element={<Login setWebId={setWebId} />} />
        <Route path='/logout' element={<Logout setWebId={setWebId} />} />
        <Route path='/direcciones' element={<Direcciones webId={webId} />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/comprar/:id" element={<Compra webId={webId} />} />
        <Route path='/cesta' element={<Cesta />} />
        <Route path='/pedidos' element={<Pedidos webId={webId} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
