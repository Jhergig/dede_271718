import { useState, useEffect } from 'react';
import { Pedido } from '../shared/shareddtypes';
import { Box, Button } from '@mui/material';
import { getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPedidos } from '../api/api';
import { width } from '@mui/system';
import { Link } from 'react-router-dom';

function Pedidos(): JSX.Element {

  if (!getDefaultSession().info.isLoggedIn) {
    document.location.href = "/login";
  }

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const inicializarPedidos = async () => {
    setPedidos(await getPedidos(getDefaultSession().info.webId));
    console.log(pedidos)
  }

  useEffect(() => {
    inicializarPedidos();
  }, []);
  return (
    <main>
      <h2>Mis pedidos</h2>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {pedidos.map((p) => (
          <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <Box sx={{ padding: '0.5em'}}>
              <h3>{p.nombreProducto}</h3>
              <img src={'/productos/' + p.idProducto + '.png'} width='200px' />
            </Box>
            <Box sx={{ padding: '0.5em', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <h4>{p.estado}</h4>
              <p>Número de pedido: {p._id}</p>
              <Link to={'/producto/' + p.idProducto}><Button sx={{
                bgcolor: '#fff',
                color: '#e28800'
              }}>Ver tu artículo</Button></Link>
              <Link to={'/comprar/' + p.idProducto}>
                <Button sx={{
                  bgcolor: '#e28800',
                  color: '#fff',
                  textDecoration: 'none'
                }}>Comprar de nuevo</Button></Link>
            </Box>
            <Box sx={{ padding: '0.5em', display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <p>Enviado desde: {p.almacen}</p>
              <p>Cantidad: {p.cantidad}</p>
              <p>Total: {p.precio + p.envio}€</p></Box>
          </Box>
        ))}
      </Box>
    </main>
  );
}

export default Pedidos;