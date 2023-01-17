import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
    Thing,
} from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";

const getProfile = async (webId: string) => {
    let profileDocumentURI = webId.split("#")[0]; 
    let myDataset = await getSolidDataset(profileDocumentURI); 
    return getThing(myDataset, webId) as Thing; 
}

export const getName = async (webId: string) => {
    if (webId.trim() === '' || webId === undefined){
        return 'Guest'
    }
    return getStringNoLocale(await getProfile(webId), FOAF.name)
}

export const isLoggedIn = (webId: string) => {
    return !(webId.trim() === '' || webId === undefined)
}