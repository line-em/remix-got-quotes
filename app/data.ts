import sortBy from "sort-by";

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