import { useState, useEffect } from 'react';
import { Box, Button, InputLabel, Select, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { Direccion } from '../shared/shareddtypes';
import ProductoCard from './ProductoCard';
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getUrlAll,
  Thing,
} from "@inrupt/solid-client";
import { VCARD } from "@inrupt/vocab-common-rdf";

function Direcciones(): JSX.Element {

  const [direcciones, setDirecciones] = useState<Direccion[]>([]);

  const obtenerDirecciones = async () => {
    let webId = getDefaultSession().info.webId!;
    let profileDocumentURI = webId.split("#")[0];
    let myDataset = await getSolidDataset(profileDocumentURI);
    let direccionespod = getUrlAll(getThing(myDataset, webId) as Thing, VCARD.hasAddress);
    let aux = [];
    console.log(direccionespod)
    for (var i in direccionespod) {
      console.log(myDataset)
      let calle = getStringNoLocale(getThing(myDataset, direccionespod[i]) as Thing, VCARD.street_address) as string;
      let ciudad = getStringNoLocale(getThing(myDataset, direccionespod[i]) as Thing, VCARD.locality) as string;
      let region = getStringNoLocale(getThing(myDataset, direccionespod[i]) as Thing, VCARD.region) as string;
      let cp = getStringNoLocale(getThing(myDataset, direccionespod[i]) as Thing, VCARD.postal_code) as string;
      let direccion: Direccion = { calle, ciudad, region, cp };
      aux.push(direccion)
      console.log(calle)
    }
    console.log(aux)
    setDirecciones(aux)
  }

  useEffect(() => {
    obtenerDirecciones();
  }, []);

  return (
    <main>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '1em' }}>
        {
          direcciones?.length > 0
            ? (
              <div className='grid'>
                {direcciones.map((p: Direccion) =>
                  <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'column' }}>
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
                        bgcolor: '#e7a541',
                        color: '#fff',
                        textDecoration: 'none'
                      }}>Eliminar</Button>
                      <Button sx={{
                        bgcolor: '#fff',
                        color: '#e7a541'
                      }}>Editar</Button>
                    </Box>
                  </Box>)}
                <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em', minHeight: '20em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button sx={{
                    bgcolor: '#e7a541',
                    color: '#fff',
                    textDecoration: 'none'
                  }}>Añadir nueva dirección</Button>
                </Box>
              </div>
            ) : (
              <p>No se encontraron direcciones en tu pod. ¡Añade una desde nuestra aplicación!</p>
            )
        }


      </Box>

    </main>
  );
}

export default Direcciones;