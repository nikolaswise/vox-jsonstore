export const update = async (json) =>  {
  let string

  try {
    string = JSON.stringify(json)
  } catch (e) {
    return e
  }

  let response = await fetch('http://localhost:5173/update', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: string
  }).then(r => r.json())

  return response
}


export const query = async (string) => {
  let response = await fetch(`http://localhost:5173/query?query=${string}`)
  let json = await response.json()
  return json
}