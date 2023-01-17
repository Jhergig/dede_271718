import { useState, useEffect } from 'react';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import { Direccion } from '../shared/shareddtypes';
import { obtenerDirecciones } from '../api/direcciones';

function Direcciones(props: {webId: string}): JSX.Element {

  const [direcciones, setDirecciones] = useState<Direccion[]>([]);

  const inicializarDirecciones = async () => {
    setDirecciones(await obtenerDirecciones(props.webId));
  }

  useEffect(() => {
    inicializarDirecciones();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <main>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '1em' }}>
        {
          direcciones?.length > 0
            ? (
              <div className='grid'>
                {direcciones.map((p: Direccion) =>
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
                      }}>Eliminar</Button>
                      <Button sx={{
                        bgcolor: '#fff',
                        color: '#e28800'
                      }}>Editar</Button>
                    </Box>
                  </Box>)}
                <Box sx={{ border: 'solid 2px #e28800', padding: '1em', margin: '1em', borderRadius: '1em', minHeight: '20em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button sx={{
                    bgcolor: '#e28800',
                    color: '#fff',
                    textDecoration: 'none'
                  }}>Añadir nueva dirección</Button>
                </Box>
              </div>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column" }}><p>No se encontraron direcciones en tu pod. ¡Añade una desde nuestra aplicación!</p>
                <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em', minHeight: '20em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button sx={{
                    bgcolor: '#e28800',
                    color: '#fff',
                    textDecoration: 'none'
                  }}>Añadir nueva dirección</Button>
                </Box>
              </Box>

            )
        }


      </Box>

    </main>
  );
}


export default Direcciones;