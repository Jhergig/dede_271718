import { Producto } from '../shared/shareddtypes';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type ProductoProps = {
  producto: Producto;
}

function ProductoCard(props: ProductoProps): JSX.Element {

  return (
    <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', display:'flex', flexDirection:'column'}}>
      <Link to={"/producto/" + props.producto.id}>
        <img src={"/productos/"+ props.producto.id+".png"} alt='Imagen del producto' width='235px'></img></Link>
      <Typography mt='auto'><Link to={"/producto/" + props.producto.id}>{props.producto.nombre}</Link></Typography>
      <p>{props.producto.precio}€</p>
      <Box>
      <Button sx={{
        bgcolor: '#fff',
        color: '#e28800'
      }}>Añadir a la cesta</Button>
      <Link to={'/comprar/' + props.producto.id}>
      <Button  sx={{
        bgcolor: '#e28800',
        color: '#fff',
        textDecoration: 'none'
      }}>Comprar</Button></Link></Box>
    </Box>
  );
}

export default ProductoCard;