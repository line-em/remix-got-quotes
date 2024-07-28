import { json, type MetaFunction } from "@remix-run/node";
import { getRandomQuote } from "../data";
import { useLoaderData } from "@remix-run/react";
import { Quote, User } from "lucide-react";

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
		<figure className="flex flex-col items-center justify-center h-full">
			<blockquote className="relative">
				<Quote />
				<p className="text-white-800 sm:text-xl text-2xl italic font-medium max-w-[70ch]">
					{sentence}
				</p>
			</blockquote>
			<figcaption className="flex items-center justify-center mt-6 gap-2">
				<User size={30} />
				<div className="flex flex-col items-center">
					<cite className="font-medium text-white-800">{characterName}</cite>
					<cite className="text-sm text-white-400">{houseName}</cite>
				</div>
			</figcaption>
		</figure>
	);
}
