import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

export const getWebId = () => {
  return getDefaultSession().info.webId;
}

export const isLoggedIn = () => {
    return getDefaultSession().info.isLoggedIn
}