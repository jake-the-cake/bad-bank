export const UseFetch = ( method, url, data ) => {
  const baseUrl = 'http://localhost:4200'
  return fetch( baseUrl + url, {
    method,
    mode: data.mode ?? 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...data.headers
    },
    body: JSON.stringify( data.body )
  })
}