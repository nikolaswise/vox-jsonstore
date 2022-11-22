import jsonld from 'jsonld'

const context = {
  "@base": "uri:",
  "@vocab": "",
  "id": "@id",
  "type": {"@type": "@id"},
  "partOf": {"@type": "@id"},
  "hasPart": { "@reverse": "partOf" }
}

// Use jsonld.js to convert JSON-LD to triple string
const triplify = async (data) => {
  return await jsonld.toRDF(data, {format: 'application/n-quads'})
}

const jsonify = async (triples) => {
  return await jsonld.fromRDF(triples, {format: 'application/n-quads'});
}

// Make object an array, or leave array as array
const arrayify = (obj) => {
  let array = Array.isArray(obj)
    ? obj
    : [obj]
  return array
}

const compactJSONLD = async (expanded) => {
  return await jsonld.compact(expanded, context);
}

// Make JSON object JSON-LD by adding Context and Graph
export const json2jsonld = (json) => {
  let jsonLD = {
    '@context': context,
    '@graph': arrayify(json)
  }
  return jsonLD
}


// Get the array in @graph
// or just delete the context and return the object
// as an array
export const jsonld2json = (jsonLD) => {
  if (jsonLD['@graph']) {
    return jsonLD['@graph']
  } else {
    delete jsonLD['@context']
    return arrayify(jsonLD)
  }
}

// Convert a JSON Object to string of RDF Triples
export const json2triples = async (json) => {
  let jsonLD = json2jsonld(json)
  let triples = await triplify(jsonLD)
  return triples
}

export const triples2json = async (triples) => {
  let expanded = await jsonify(triples)
  let compacted = await compactJSONLD(expanded)
  let json = jsonld2json(compacted)
  return json
}