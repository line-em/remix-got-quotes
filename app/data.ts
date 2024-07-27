////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type CharacterQuotes = {
	name: string;
	slug: string;
	house: {
		slug: string;
		name: string;
	};
	quotes: string[];
};

export async function getCharacters(): Promise<string[]> {
	const url = "https://api.gameofthronesquotes.xyz/v1/characters";
	const response = await fetch(url);
	const data: CharacterQuotes[] = await response.json();
	if (!data) {
		throw new Response("Not Found", { status: 404 });
	}
	console.log(data);
	return data.map((character) => character.name).sort(sortBy("name"));
}
