import { sortBy } from "sort-by-typescript";

type CharacterQuotes = {
	name: string;
	slug: string;
	house: {
		slug: string;
		name: string;
	};
	quotes: string[];
};

type RandomQuote = {
	sentence: string;
	character: {
		name: string;
		slug: string;
		house: {
			name: string;
			slug: string;
		};
	};
};

const BASE_URL = "https://api.gameofthronesquotes.xyz/v1";

export const getCharacters = async (): Promise<string[]> => {
	const url = `${BASE_URL}/characters`;
	const response = await fetch(url);
	const data: CharacterQuotes[] = await response.json();
	if (!data) {
		throw new Response("Not Found", { status: 404 });
	}
	return data.map((character) => character.name).sort(sortBy("name"));
};

export const getRandomQuote = async (): Promise<RandomQuote> => {
	const url = `${BASE_URL}/random`;
	const response = await fetch(url);
	return response.json();
};
