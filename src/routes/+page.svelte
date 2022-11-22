<script type="text/javascript">
  import { update } from '$lib/query.js'
  import RenderQuery from '$lib/RenderQuery.svelte'

  let json = [
    {
      id: "zaibatsu-corp",
      type: "Company",
      companyName: "Ziabatsu Corp",
      location: "Global"
    },{
      id: "heftymart",
      type: "Company",
      companyName: "HeftyMart™",
      location: "The County",
      partOf: "zaibatsu-corp"
    },{
      id: "lucky-dragon",
      type: "Company",
      companyName: "Lucky Dragon LLC",
      location: "The City",
      partOf: "zaibatsu-corp"
    },{
      id: "snax",
      type: "Thing",
      thingName: "Tasty Snax",
      partOf: "lucky-dragon"
    },{
      id: "widget",
      type: "Thing",
      thingName: "Widget",
      partOf: "heftymart"
    },{
      id: "fidget",
      type: "Thing",
      thingName: "Fidget",
      partOf: "heftymart"
  }]

  let jsonString = JSON.stringify(json, null, 2)


  let getAllThings = `
    PREFIX uri: <uri:>
    CONSTRUCT {
      ?s ?p ?o
    } WHERE {
      ?s uri:type uri:Thing .
      ?s ?p ?o
    }
  `

  let getAllCompanies = `
    PREFIX uri: <uri:>
    CONSTRUCT {
      ?s ?p ?o
    } WHERE {
      ?s uri:type uri:Company .
      ?s ?p ?o
    }
  `

  let getAllHeftyMart = `
    PREFIX uri: <uri:>

    CONSTRUCT {?thing ?key ?val} WHERE {
      ?company uri:companyName "HeftyMart™" .
      ?thing uri:partOf ?company .
      ?thing ?key ?val
    }
  `

  let getAllLuckyDragon = `
    PREFIX uri: <uri:>

    CONSTRUCT {?thing ?key ?val} WHERE {
      ?company uri:companyName "Lucky Dragon LLC" .
      ?thing uri:partOf ?company .
      ?thing ?key ?val
    }
  `

  let getAllLuckyZaibatsu = `
    PREFIX uri: <uri:>

    CONSTRUCT {?thing ?key ?val} WHERE {
      ?parent uri:companyName "Ziabatsu Corp" .
      ?company uri:partOf ?parent .
      ?thing uri:partOf ?company .
      ?thing ?key ?val
    }
  `

  $: {
    update(jsonString)
  }

</script>

<h1>Welcome to JSONStore.</h1>
<p>Lets store and query some JSON, it's cool.</p>

<h2>Update Data</h2>

<textarea bind:value={jsonString}></textarea>

<p>relationships:</p>
<p><code>partOf</code> {`<=>`} <code>hasPart</code></p>

<h2>Query Data</h2>

<h3>Get All Things</h3>
<RenderQuery q={getAllThings} />

<h3>Get All Companies</h3>
<RenderQuery q={getAllCompanies} />

<h3>Get All Things Made By HeftyMart™</h3>
<RenderQuery q={getAllHeftyMart} />

<h3>Get All Things Made By Lucky Dragon LLC</h3>
<RenderQuery q={getAllLuckyDragon} />

<h3>Get All Things Made by Zaibatsu Corp</h3>
<RenderQuery q={getAllLuckyZaibatsu} />


<style type="text/css">
  textarea {
    min-width: 24rem;
    min-height: 12rem;
  }
</style>