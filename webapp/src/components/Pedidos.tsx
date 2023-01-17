import { useState, useEffect } from 'react';
import { Pedido } from '../shared/shareddtypes';
import { Box, Button } from '@mui/material';
import { getPedidos } from '../api/api';
import { Link } from 'react-router-dom';
import { getWebId, isLoggedIn } from '../api/solidSession';

function Pedidos(): JSX.Element {

  if (isLoggedIn()) {
    document.location.href = "/login";
  }

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const inicializarPedidos = async () => {
    setPedidos(await getPedidos(getWebId()));
  }

  useEffect(() => {
    inicializarPedidos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <main>
      <h2>Mis pedidos</h2>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {pedidos.map((p) => (
          <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <Box sx={{ padding: '0.5em'}}>
              <h3>{p.nombreProducto}</h3>
              <img src={'/productos/' + p.idProducto + '.png'} alt={p.nombreProducto} width='200px' />
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