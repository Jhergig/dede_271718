import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Producto, Almacen, Direccion } from '../shared/shareddtypes';
import { Box, Button, InputLabel, Select, MenuItem, SelectChangeEvent, TextField, Checkbox } from '@mui/material';
import { getProducto, getAlmacenes, addPedido } from '../api/api';
import { obtenerDirecciones } from '../api/direcciones';
import { getName, isLoggedIn } from '../api/solidSession';

function Compra(props: { webId: string }): JSX.Element {

  if (!isLoggedIn(props.webId)) {
    document.location.href = "/login";
  }

  const { id } = useParams<string>();

  const [producto, setProducto] = useState<Producto>({} as any);
  const [almacenes, setAlmacenes] = useState<Almacen[]>([]);
  const [almacen, setAlmacen] = useState("");
  const [cantidadEnAlmacen, setCantidadEnAlmacen] = useState(0);
  const [zona, setZona] = useState("");
  const [coste, setCoste] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [gastosEnvio, setGastosEnvio] = useState(0.0);
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [direccion, setDireccion] = useState(0);
  const [horarioEnvio, setHorarioEnvio] = useState(false);
  const [inicioHorario, setInicioHorario] = useState("");
  const [finalHorario, setFinalHorario] = useState("");

        // Rangos de peso  1   2   3
  const MapaDePrecios = [[ 0,  2,  5],     // Misma zona
                         [ 5,  8, 15],     // Distintas zonas peninsulares
                         [20, 25, 30]];    // Envio desde/a canarias y baleares

  const ZonaNordeste = ['48', '20', '31', '22', '25', '08', '17', '01', '26', '50', '43', '42']
  const ZonaNoroeste = ['15', '27', '33', '39', '36', '32', '24', '34', '09', '49', '47']
  const ZonaCentro = ['37', '05', '28', '19', '44', '12', '10', '45', '16', '46', '06', '13', '02', '03']
  const ZonaSur = ['21', '41', '14', '23', '30', '11', '29', '18', '04']

  const compraDisabled = () => {
    if (horarioEnvio) {
      if (Number(inicioHorario.split(':')[0]) >= Number(finalHorario.split(':')[0])) {
        return true;
      }
      if (Number(finalHorario.split(':')[0]) - Number(inicioHorario.split(':')[0]) === 1 && Number(inicioHorario.split(':')[1]) > Number(finalHorario.split(':')[1])) {
        return true;
      }
    }
    return almacen === '' || cantidad < 1 || direcciones?.length < 1 || cantidad > cantidadEnAlmacen
  }

  const cambiarInicioHorario = (e: any) => {
    let hours = Number(e.target.value.split(':')[0]);
    if (hours < 11) {
      setInicioHorario("11:00");
      e.target.value = "11:00";
    } else if (hours > 20) {
      setInicioHorario("21:00");
      e.target.value = "21:00";
    } else {
      setInicioHorario(e.target.value);
    }
  }

  const cambiarFinalHorario = (e: any) => {
    let hours = Number(e.target.value.split(':')[0]);
    if (hours < 12) {
      setFinalHorario("12:00");
      e.target.value = "12:00";
    } else if (hours > 21) {
      setFinalHorario("22:00");
      e.target.value = "22:00";
    } else {
      setFinalHorario(e.target.value);
    }
  }

  const seleccionarAlmacen = (e: SelectChangeEvent) => {
    let value = e.target.value as string;
    setAlmacen(value.split('-')[0]);
    setZona(value.split('-')[1]);
    setCantidadEnAlmacen(Number(value.split('-')[2]));
  };

  const calcularEnvio = () => {
    let zonaUsuario = '';
    if (direcciones.length > 0) {
      let cpUsuario = direcciones[direccion].cp.substring(0, 2);
      if (ZonaNordeste.includes(cpUsuario)) {
        zonaUsuario = 'nordeste';
      } else if (ZonaNoroeste.includes(cpUsuario)) {
        zonaUsuario = 'noroeste';
      } else if (ZonaCentro.includes(cpUsuario)) {
        zonaUsuario = 'centro';
      } else if (ZonaSur.includes(cpUsuario)) {
        zonaUsuario = 'sur';
      } else if (cpUsuario === '38' || cpUsuario === '35') {
        zonaUsuario = 'canarias';
      } else if (cpUsuario === '07') {
        zonaUsuario = 'baleares';
      }
    }
    let adicionalPorHorario = horarioEnvio ? 2 : 0;
    setGastosEnvio(((MapaDePrecios[categoriaDistancia(zonaUsuario)][categoriaPeso()] * (0.9 + cantidad * 0.1)) + adicionalPorHorario).toFixed(2) as unknown as number);
  }

  const seleccionarDireccion = (e: any) => {
    let value = e.target.value;
    setDireccion(Number(value));
  };

  const seleccionarHorarioEntrega = (e: any) => {
    setHorarioEnvio(e.target.checked);
  };

  const categoriaDistancia = (zonaUsuario: string) => {
    if (zona === zonaUsuario) {
      return 0;
    } else if (zona === "canarias" || zona === "baleares" || zonaUsuario === "canarias" || zonaUsuario === "baleares") {
      return 2;
    } else {
      return 1;
    }
  }

  const categoriaPeso = () => {
    return producto.peso < 5 ? 0 : producto.peso < 20 ? 1 : 2;
  }

  const cambiarCantidad = (e: any) => {
    setCantidad(e.target.value as unknown as number);
    setCoste((e.target.value as unknown as number * producto.precio).toFixed(2) as unknown as number);
  }

  const getProduct = async (idProducto: string) => {
    setProducto(await getProducto(idProducto));
  }
  const inicializarAlmacenes = async (idProducto: string) => {
    setAlmacenes(await getAlmacenes(idProducto));
  }

  const inicializarDirecciones = async () => {
    setDirecciones(await obtenerDirecciones(props.webId));
  }

  let navigate = useNavigate();
  const realizarCompra = async () => {
    await addPedido({ webid: props.webId, idProducto: producto.id, nombreProducto: producto.nombre, cantidad: cantidad, precio: coste, almacen: almacen, envio: gastosEnvio, estado: 'En reparto' })

    console.log("Datos para transportista - Nombre: " + await getName(props.webId) + " - Dirección: " + direcciones[direccion].ciudad + ", " + direcciones[direccion].cp + ", " + direcciones[direccion].calle + " - Horario: " + (horarioEnvio ? "de " + inicioHorario + " a " + finalHorario : "flexible"));
    console.log("Datos para la pasarela de pago - Nombre: " + await getName(props.webId) + " - Total: " + (Number(coste) + Number(gastosEnvio)))
    navigate("/pedidos");
  }

  useEffect(() => {
    inicializarAlmacenes(id!);
    inicializarDirecciones();
    getProduct(id!);
    calcularEnvio();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    calcularEnvio();
  });

  return (
    <main>
      <h2>Comprando {producto.nombre}</h2>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '1em' }}>
        {
          direcciones?.length > 0
            ? (
              <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em' }}>
                <h3>Dirección de envío</h3>
                <InputLabel>Seleccionar:</InputLabel>
                <Select
                  value={direccion.toString()}
                  onChange={seleccionarDireccion}
                  sx={{ width: "100%" }}
                >
                  {
                    direcciones.map((x, i, a) => (<MenuItem value={i}>Dirección {i + 1} </MenuItem>))
                  }
                </Select>
                <InputLabel>Calle</InputLabel>
                <TextField disabled value={direcciones[direccion].calle} />
                <InputLabel>Ciudad</InputLabel>
                <TextField disabled value={direcciones[direccion].ciudad} />
                <InputLabel>Región</InputLabel>
                <TextField disabled value={direcciones[direccion].region} />
                <InputLabel>CP</InputLabel>
                <TextField disabled value={direcciones[direccion].cp} />
                <InputLabel>Añadir horario entrega</InputLabel>
                <Checkbox onChange={seleccionarHorarioEntrega}></Checkbox>+2€ (Margen min: 1 hora)

                {
                  horarioEnvio
                    ? (
                      <>
                        <InputLabel >Desde</InputLabel>
                        <TextField
                          inputProps={{ type: 'time', min: "11:00", max: "21:00" }}
                          onChange={cambiarInicioHorario}
                          sx={{ width: "100%" }} />
                        <InputLabel>Hasta</InputLabel>
                        <TextField
                          inputProps={{ type: 'time', min: "12:00", max: "22:00" }}
                          onChange={cambiarFinalHorario}
                          sx={{ width: "100%" }} />
                      </>
                    ) : (
                      <></>
                    )
                }
              </Box>
            ) : (
              <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em' }}>
                <h3>Dirección de envío</h3>
                <p>No hemos encontrado direcciones en tu pod</p>
                <Link to="/direcciones"><Button sx={{
                  bgcolor: '#e7a541',
                  color: '#fff',
                  marginTop: 'auto'
                }}>Añadir una dirección</Button></Link>
              </Box>)
        }

        <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'column' }}>
          <h3>{producto.nombre}</h3>
          <img src={"/productos/" + producto.id + ".png"} alt='Imagen del producto' width='235px'></img>
          <h4>Precio por unidad: {producto.precio}€</h4>
          <h4>Peso: {producto.peso}kg</h4>
          <InputLabel sx={{
            marginTop: 'auto'
          }}>Enviado desde</InputLabel>
          <Select
            value={almacen !== '' ? (almacen + '-' + zona + '-' + cantidadEnAlmacen) : ('')}
            onChange={seleccionarAlmacen}
            sx={{ width: '15em' }}
          >
            {
              almacenes.length > 0 ? (almacenes.map((a: Almacen) => <MenuItem value={a.almacen + '-' + a.zona + '-' + a.cantidad}>
                {a.almacen + ' - ' + a.cantidad + ' disponibles'}
              </MenuItem>)
              ) : (
                <MenuItem value={''}>Sin stock
                </MenuItem>)
            }
          </Select>
          <Box>
            <InputLabel>Unidades</InputLabel>
            <TextField
              type='number'
              inputProps={{ min: 1, max: cantidadEnAlmacen }}
              onChange={cambiarCantidad}
              sx={{ width: '15em' }}
              defaultValue='0'
            />

          </Box>
        </Box>

        <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'column' }}>
          <h3>Resumen de costes</h3>
          <InputLabel>Coste</InputLabel>
          <TextField disabled value={coste + ' €'} />
          <InputLabel>Gastos de envío</InputLabel>
          <TextField disabled value={gastosEnvio + ' €'} />
          <InputLabel sx={{
            marginTop: 'auto'
          }}>Total</InputLabel>
          <TextField disabled value={(Number(coste) + Number(gastosEnvio)).toFixed(2) + ' €'} sx={{ fontWeight: 'bold' }} />
          <Button sx={{
            bgcolor: '#e7a541',
            color: '#fff',
            marginTop: '2em',
            fontSize: 'large'
          }}
            onClick={realizarCompra}
            disabled={compraDisabled()}>Comprar</Button>
        </Box>
      </Box>
    </main>
  );
}

export default Compra;