type FetchProps = (
  method: string,
  url: string,
  data?: any
) => Promise<Response>

export const UseFetch: FetchProps = ( method, url, data = {} ) => {
  // const baseUrl = 'http://jasonthompson-badbank-dev.us-east-1.elasticbeanstalk.com'
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