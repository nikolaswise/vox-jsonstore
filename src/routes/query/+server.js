import { error, redirect, json } from '@sveltejs/kit';
import { triples2json } from '$lib/triples.js'

export async function GET({ url }) {
  let q = url.searchParams.get('query')
  let results = await fetch(`http://oxigraph-dev.voxops.net/query?query=${q}`)
  let triples = await results.text()
  let data = await triples2json(triples)
  return json(data)
}