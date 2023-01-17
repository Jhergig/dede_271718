export async function getProductos(): Promise<any[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/productos');
  return response.json()
}

export async function getProducto(id: any): Promise<any> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/productos/' + id);
  return response.json()
}

export async function getPedidos(id: any): Promise<any[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/pedidos/' + id.toString().substring(8).split('.')[0] + id.toString().substring(8).split('.')[1]);
  return response.json()
}

export async function getAlmacenes(id: any): Promise<any[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/almacenes/' + id);
  return response.json()
}

export async function addPedido(pedido: any): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/pedidos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'webid': pedido.webid, 'idProducto': pedido.idProducto,
      'nombreProducto': pedido.nombreProducto, 'cantidad': pedido.cantidad, 'precio': pedido.precio,
      'almacen': pedido.almacen, 'envio': pedido.envio, 'estado': pedido.estado
    })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}
