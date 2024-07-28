import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BookHeart, User } from "lucide-react";
import { getCharacter } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	if (!params.slug) throw new Response("Not Found", { status: 404 });
	const character = await getCharacter(params.slug);
	return json({ character });
};

const Quotes = () => {
	const { character } = useLoaderData<typeof loader>();
	console.log(character);

	const { name: characterName, quotes } = character;
	const house = character.house?.name ?? "";

	return (
		<div className="flex flex-col gap-6 items-center">
			<div className="stats shadow rounded-lg">
				<div className="stat bg-base-200 w-fit">
					<div className="stat-figure text-accent">
						<User size={30} />
					</div>
					<div className="stat-value">{characterName}</div>
					<div className="stat-desc">{house}</div>
				</div>
				<div className="stat bg-base-200 w-fit">
					<div className="stat-figure text-accent">
						<BookHeart size={30} />
					</div>
					<div className="stat-title">Quotes</div>
					<div className="stat-value">{quotes.length}</div>
					<div className="stat-desc">
						Word Count: {quotes.join().split(" ").length}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Quotes;
