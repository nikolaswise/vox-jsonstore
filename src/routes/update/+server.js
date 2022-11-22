import { error, redirect, json } from '@sveltejs/kit'
import { json2triples } from '$lib/triples.js'

export async function POST({ params, request }) {
  // Get JSON Data from POST request
  const data = await request.json()
  let jsonData = JSON.parse(data)

  // Convert JSON to atomized statements
  let triples = await json2triples(jsonData)
  // Use those atomized statements in a
  // SPARQL query to replace all data
  // with this data
  let update = `
DELETE {
  ?s ?p ?o
} INSERT {
  ${triples}
} WHERE {
    ?s ?p ?o
}
  `

  // Post that query to the triplestore
  await fetch('http://oxigraph-dev.voxops.net/update', {
    method: 'POST',
    headers:{
      'Accept' : 'application/n-triples',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'update': update
    })
  })

  // return respose to app
  return json({success: true})
}