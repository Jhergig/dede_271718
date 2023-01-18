import { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Producto } from '../shared/shareddtypes';
import ProductoCard from './ProductoCard';
import { getProductos } from '../api/api';

function Catalogo(): JSX.Element {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');

  const realizarBusqueda = async () => {
    if (busqueda) {
      let productosfiltrados : Producto[];
      productosfiltrados = (await getProductos()).filter((p)=> p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
      setProductos(productosfiltrados);
    } else {
      setProductos(await getProductos());
    }
  }

  const inicializarCatalogo = async () => {
    setProductos(await getProductos());
  }

  useEffect(() => {
    inicializarCatalogo();
  }, []);

  return (
    <main>
      <Box mt='2em' sx={{display:'flex', justifyContent:'center'}}>
        <TextField placeholder='Buscar producto' value={busqueda} onChange={(e) => setBusqueda(e.target.value)} type="text" />
        <Button className="search-btn"
        sx={{bgcolor: '#e28800',
        color: '#fff',
        height: '56px'}}
        onClick={realizarBusqueda}>
            Buscar
        </Button>
      </Box>
      {
        productos?.length > 0
          ? (
            <Box sx={{
              display: 'flex',
              margin: '3em',
              flexWrap: 'wrap',
              justifyContent: 'space-around'
            }}>
              {productos.map((p:Producto) => <ProductoCard producto={p}/>)}
            </Box>
          ) : (
            <p>No se encontraron productos</p>
          )
      }
    </main>
  );
}

export default Catalogo;