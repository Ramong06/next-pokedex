
import Link from 'next/Link';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { useState } from 'react';

export default function Home({ pokemon }) {

  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Layout title="Pokedex">
      <h1 className="text-4xl mb-8 text-center ">Next Pokedex </h1>
      <form>
        <input
          className="h-10 rounded focus:outline-none focus:shadow-outline text-center"
          placeHolder='Search for Pokemon'
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
      <ul>
        {pokemon
          .filter(pokeOne => pokeOne.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((pokeOne, index) => (
            <Card index={index} pokemon={pokeOne} />
          ))}
      </ul>
    </Layout>
  )
};

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=251');
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...result, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}