import { Direccion } from '../shared/shareddtypes';
import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getUrlAll,
  Thing,
  buildThing,
  createThing,
  setThing,
  saveSolidDatasetAt,
  removeThing,
  removeUrl,
} from "@inrupt/solid-client";
import { fetch } from '@inrupt/solid-client-authn-browser';
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

export const addDireccion = async (webId: string, direccion: Direccion) => {
  let profileDocumentURI = webId.split("#")[0];
  let myDataset = await getSolidDataset(profileDocumentURI);

  const addressThing = buildThing(createThing())
    .addStringNoLocale(VCARD.street_address, direccion.calle)
    .addStringNoLocale(VCARD.locality, direccion.ciudad)
    .addStringNoLocale(VCARD.region, direccion.region)
    .addStringNoLocale(VCARD.postal_code, direccion.cp)
    .addUrl(VCARD.Type, VCARD.street_address)
    .build();

  let hasAddressThing = getThing(myDataset, VCARD.hasAddress) as Thing;
  if (hasAddressThing === null)
    hasAddressThing = buildThing(getThing(myDataset, webId) as Thing)
      .addUrl(VCARD.hasAddress, addressThing.url)
      .build();
  else
    hasAddressThing = buildThing(hasAddressThing)
      .addUrl(VCARD.hasAddress, addressThing.url)
      .build();

  myDataset = setThing(myDataset, addressThing);
  myDataset = setThing(myDataset, hasAddressThing);

  await saveSolidDatasetAt(webId, myDataset, { fetch: fetch as any });
}

export const deleteDireccion = async (webId: string, index: number) => {
  let profileDocumentURI = webId.split("#")[0]; 
  let myDataset = await getSolidDataset(profileDocumentURI);

  let direccionespod = getUrlAll(getThing(myDataset, webId) as Thing, VCARD.hasAddress);
  let urlToRemove = direccionespod[index]

  let address = getThing(myDataset, urlToRemove) as Thing;
  let hasAddressThing = buildThing(getThing(myDataset, webId) as Thing)
    .removeUrl(VCARD.hasAddress, urlToRemove)
    .build();

  if (hasAddressThing === null || address === null) return Promise.reject();
  // We remove the address
  myDataset = removeThing(myDataset, address);
  // We remove the link to hasAddress
  hasAddressThing = removeUrl(hasAddressThing, VCARD.hasAddress, urlToRemove);
  myDataset = setThing(myDataset, hasAddressThing);

  await saveSolidDatasetAt(webId, myDataset, { fetch: fetch as any });
}