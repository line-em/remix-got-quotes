import { json, type MetaFunction } from "@remix-run/node";
import { getRandomQuote } from "../data";
import { useLoaderData } from "@remix-run/react";
import { BookHeart, Quote, User } from "lucide-react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Game of Thrones Quotes" },
		{ name: "description", content: "Game of thrones quotes" }
	];
};

export const loader = async () => {
	const initialQuote = await getRandomQuote();
	return json(initialQuote);
};

export default function Index() {
	const initialQuote = useLoaderData<typeof loader>();
	const {
		sentence,
		character: {
			name: characterName,
			house: { name: houseName }
		}
	} = initialQuote;

	return (
		<section className="flex flex-col items-center justify-center h-full gap-y-12">
			<img src="/Game_of_Thrones_2011_logo.svg?url" alt="game of thrones logo" />
			<figure className="bg-base-200 p-6 rounded-lg min-w-[30ch] text-center">
				<blockquote className="flex flex-col items-center">
					<Quote size={30} fill="white" strokeWidth={0} />
					<p className="text-white-800 sm:text-xl text-2xl italic font-medium max-w-[70ch]">
						{sentence}
					</p>
				</blockquote>
				<figcaption className="flex items-center justify-center mt-6 gap-2">
					<User size={30} fill="white" strokeWidth={0} />
					<div className="flex flex-col items-center">
						<cite className="font-medium text-accent">{characterName}</cite>
						<cite className="text-sm text-white">{houseName}</cite>
					</div>
				</figcaption>
			</figure>
		</section>
	);
}
