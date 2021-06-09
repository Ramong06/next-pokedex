import Head from 'next/Head'
import Layout from "../components/Layout";


export default function Home() {
  return (
    <Layout title="Next Pokedex">
      <h1 className="text-4xl mb-8 text-center ">Next Pokedex </h1>
    </Layout>
  )
}


export async function getStaticProps(context) {
  return {
    props: {}
  }
}