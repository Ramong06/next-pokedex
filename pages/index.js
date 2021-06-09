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
              <a>
                <img src={pokeOne.image} alt={pokeOne.name} />
                <span>{index + 1}.</span>
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