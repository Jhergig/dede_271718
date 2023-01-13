import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Producto } from '../shared/shareddtypes';
import { getProducto } from '../api/api';

function DetalleProducto(): JSX.Element {

  const { id } = useParams<string>();

  const [producto, setProducto] = useState<Producto>({} as any);

  const getProduct = async (idProducto: string) => {
    setProducto(await getProducto(idProducto));
  };

  useEffect(() => {
    getProduct(id!);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <h2>{producto.nombre}</h2>
      <img src={"/productos/" + id + ".png"} alt='logo' width='500' />
      <h3>Precio: {producto.precio}€</h3>
      <h3>Peso: {producto.peso}g</h3>
      <p>{producto.descripcion}</p>
      <Button sx={{
        bgcolor: '#fff',
        color: '#e7a541'
      }}>Añadir a la cesta</Button>
      <Link to={'/comprar/' + producto.id}>
        <Button sx={{
          bgcolor: '#e7a541',
          color: '#fff',
          margin: '1em'
        }}>Comprar</Button></Link>
    </main>
  );
}

export default DetalleProducto;