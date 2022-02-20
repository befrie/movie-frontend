import Layout from '../../components/Layout';
import { STRAPI_URL } from '@config/index';
import { useState, useEffect } from 'react'

const filme = require('./filme.json');

let darsteller = []
let genre = []
let films = filme.nodes;


// film.darsteller.forEach( dst => darsteller.push (dst))
// film.genre.forEach( gen => genre.push(gen));

const storeIt = async function(actr) {
  const res =  await fetch(`${STRAPI_URL}/actors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{ "data": { ${(actr) } } }`,
  })
  if (!res.ok) {
    console.log(res)
  }
  else {
    setTimeout(() => { console.log("sleeping ...", actr)}, 300)
  }
}

export default function AddActorPage() {
  
  const [newActor, setNewActor ] = useState({})

    useEffect ( () => 
    {
        films.forEach(film => 
        {
        let darsteller = film.darsteller
        darsteller.forEach( actr =>
             {
              console.log("actr", actr)
              setNewActor(actr);
              storeIt(actr)                
            })
        })
    },    [] )

    return (
        <Layout title="Film erfassen">     
          <h1>Neue Schauspieler anlegen</h1>
        </Layout>
    )

    }