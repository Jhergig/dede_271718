import { useState, useEffect } from 'react';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import { Direccion } from '../shared/shareddtypes';
import { obtenerDirecciones, addDireccion, deleteDireccion } from '../api/direcciones';

function Direcciones(props: { webId: string }): JSX.Element {

  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [direccionNueva, setDireccionNueva] = useState(false);
  const [calle, setCalle] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [region, setRegion] = useState('')
  const [cp, setCp] = useState('')

  const inicializarDirecciones = async () => {
    setDirecciones(await obtenerDirecciones(props.webId));
  }

  const mostrarFormulario = () => {
    setDireccionNueva(true);
  }

  const submitDireccion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let nuevaDireccion: Direccion = { calle, ciudad, region, cp }
    await addDireccion(props.webId, nuevaDireccion)
    inicializarDirecciones();
    setDireccionNueva(false)
  }

  const eliminarDireccion = async (index: number) => {
    await deleteDireccion(props.webId, index)
    inicializarDirecciones();
  }

  useEffect(() => {
    inicializarDirecciones();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { })
  return (
    <main>
      <h2>Mis direcciones</h2>
      {direcciones?.length > 0 ? (<></>) : (<p>No se encontraron direcciones en tu pod. ¡Añade una desde nuestra aplicación!</p>)}
      <Box sx={{
        display: 'flex',
        margin: '3em',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      }}>
        {
          direcciones?.length > 0
            ? (
              direcciones.map((p: Direccion, i:number, _a:Direccion[]) =>
                <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'column' }}>
                  <InputLabel>Calle</InputLabel>
                  <TextField disabled value={p.calle} />
                  <InputLabel>Ciudad</InputLabel>
                  <TextField disabled value={p.ciudad} />
                  <InputLabel>Región</InputLabel>
                  <TextField disabled value={p.region} />
                  <InputLabel>CP</InputLabel>
                  <TextField disabled value={p.cp} />
                  <Box sx={{ display: 'flex', flexDirection: 'row-reverse', margin: '1em' }}>
                    <Button sx={{
                      bgcolor: '#e28800',
                      color: '#fff',
                      textDecoration: 'none'
                    }} onClick={() => eliminarDireccion(i)} >Eliminar</Button>
                  </Box>
                </Box>)
            ) : (
              <></>
            )
        }
        {
          direccionNueva ?
            (
              <form name='nuevaDireccion' onSubmit={submitDireccion}>

                <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'column' }}>
                  <InputLabel>Calle</InputLabel>
                  <TextField required onChange={e => setCalle(e.target.value)} />
                  <InputLabel>Ciudad</InputLabel>
                  <TextField required onChange={e => setCiudad(e.target.value)} />
                  <InputLabel>Región</InputLabel>
                  <TextField required onChange={e => setRegion(e.target.value)} />
                  <InputLabel>CP</InputLabel>
                  <TextField type='number' required onChange={e => setCp(e.target.value)} />
                  <Box sx={{ display: 'flex', flexDirection: 'row-reverse', margin: '1em' }}>
                    <Button sx={{
                      bgcolor: '#e28800',
                      color: '#fff',
                      textDecoration: 'none'
                    }} type='submit'>Guardar</Button>
                  </Box>
                </Box>
              </form>

            ) : (

              <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'column', minHeight:'20em', justifyContent:'center' }}>
                <Button sx={{
                  bgcolor: '#e28800',
                  color: '#fff',
                  textDecoration: 'none'
                }} onClick={mostrarFormulario}>Añadir nueva dirección</Button>
              </Box>
            )
        }
      </Box>
    </main >
  );
}


export default Direcciones;