import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BookHeart, Quote, User } from "lucide-react";
import { getCharacter } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	if (!params.slug) throw new Response("Not Found", { status: 404 });
	const character = await getCharacter(params.slug);
	return json({ character });
};

const Quotes = () => {
	const { character } = useLoaderData<typeof loader>();
	console.log(character);

	const { name: characterName, quotes } = character;
	const house = character.house?.name ?? "No house affiliation";

	return (
		<main className="flex flex-col gap-6 items-start">
			<section className="stats shadow rounded-lg w-full">
				<div className="stat bg-base-200">
					<div className="stat-figure text-accent">
						<User size={30} />
					</div>
					<div className="stat-value">{characterName}</div>
					<div className="stat-desc">{house}</div>
				</div>
				<div className="stat bg-base-200">
					<div className="stat-figure text-accent">
						<BookHeart size={30} />
					</div>
					<div className="stat-title">Quotes</div>
					<div className="stat-value">{quotes.length}</div>
					<div className="stat-desc">
						Word Count: {quotes.join().split(" ").length}
					</div>
				</div>
			</section>
			<ul className="flex flex-start flex-col gap-6 w-full">
				{quotes.map((quote, index) => (
					<li className="stat shadow rounded-lg" key={index + characterName}>
						<blockquote className="stat-figure opacity-70">
							<Quote size={25} fill="white" strokeWidth={0} />
						</blockquote>
						<div className="stat-title whitespace-normal">{quote}</div>
						<div className="stat-desc text-accent">{characterName}</div>
					</li>
				))}
			</ul>
		</main>
	);
};

export default Quotes;
