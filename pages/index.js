import Head from 'next/Head';
import Link from 'next/Link';
import Layout from "../components/Layout";


export default function Home({pokemon}) {
  return (
    <Layout title="Next Pokedex">
      <h1 className="text-4xl mb-8 text-center ">Next Pokedex </h1>
      <ul>
        {pokemon.map((pokeOne, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 capitalize flex items-center text-leg bg-gray-200 rounded-md">
                <img className="w-20 h-20 mr-3" src={pokeOne.image} alt={pokeOne.name} />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeOne.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
};


export async function getStaticProps(context) {
  try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300');
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