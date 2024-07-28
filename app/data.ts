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

export const getCharacters = async (): Promise<CharacterQuotes[]> => {
	const url = `${BASE_URL}/characters`;
	const response = await fetch(url);
	const data: CharacterQuotes[] = await response.json();
	if (!data) {
		throw new Response("Characters not found", { status: 404 });
	}
	return data;
};

export const getCharacterQuote = async (character: string): Promise<CharacterQuotes> => {
	const url = `${BASE_URL}/character/${character}`;
	const response = await fetch(url);
	const data: CharacterQuotes = await response.json();
	if (!data) {
		throw new Response("Character not Found", { status: 404 });
	}
	return data;
};

export const getRandomQuote = async (): Promise<RandomQuote> => {
	const url = `${BASE_URL}/random`;
	const response = await fetch(url);
	return response.json();
};
