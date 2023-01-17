import { Direccion } from '../shared/shareddtypes';
import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getUrlAll,
  Thing,
} from "@inrupt/solid-client";
import { VCARD } from "@inrupt/vocab-common-rdf";

export const obtenerDirecciones = async (webId: string) => {
  let profileDocumentURI = webId.split("#")[0];
  let myDataset = await getSolidDataset(profileDocumentURI);
  let direccionespod = getUrlAll(getThing(myDataset, webId) as Thing, VCARD.hasAddress);
  let direcciones: Direccion[] = [];
  for (var i in direccionespod) {
    let calle = getStringNoLocale(getThing(myDataset, direccionespod[i]) as Thing, VCARD.street_address) as string;
    let ciudad = getStringNoLocale(getThing(myDataset, direccionespod[i]) as Thing, VCARD.locality) as string;
    let region = getStringNoLocale(getThing(myDataset, direccionespod[i]) as Thing, VCARD.region) as string;
    let cp = getStringNoLocale(getThing(myDataset, direccionespod[i]) as Thing, VCARD.postal_code) as string;
    let direccion: Direccion = { calle, ciudad, region, cp };
    direcciones.push(direccion);
  }
  return direcciones;
}