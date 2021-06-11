
import Link from 'next/Link';

export default function Card({ pokemon, index }) {
	return (
		<li key={index}>
			<Link href={`/pokemon?id=${index + 1}`}>
				<a className="border p-4 border-gray my-2 capitalize flex items-center text-leg bg-gray-200 rounded-md">
					<img className="w-20 h-20 mr-3" src={pokemon.image} alt={pokemon.name} />
					<span className="mr-2 font-bold">{index + 1}.</span>
					{pokemon.name}
				</a>
			</Link>
		</li>
	)
};