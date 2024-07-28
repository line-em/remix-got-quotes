import {
	Form,
	json,
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData
} from "@remix-run/react";
import "./tailwind.css";
import { getCharacters } from "./data";
import { ChangeEvent, useEffect, useState } from "react";
import { sortBy } from "sort-by-typescript";

export const loader = async () => {
	const characters = await getCharacters();
	const characterNames = characters
		.map((character) => character.name)
		.sort(sortBy("name"));
	return json({ characters, characterNames });
};

export function Layout({ children }: { children: React.ReactNode }) {
	const { characters, characterNames } = useLoaderData<typeof loader>();
	const [filteredChars, setFilteredChars] = useState<string[]>(characterNames);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		setFilteredChars(
			characterNames.filter((char) => char.toLowerCase().includes(value))
		);
	};

	const findSlugByName = (name: string): string => {
		const character = characters.find((char) => char.name === name);
		return character ? `quotes/${character.slug}` : "";
	};

	useEffect(() => {
		const searchField = document.getElementById("query");
		if (searchField instanceof HTMLInputElement) {
			searchField.value = "";
		}
	}, []);

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="p-6">
				<main className="grid sm:grid-cols-[minmax(150px,200px)_1fr] gap-12 sm:gap-6 w-full max-h-screen grid-cols-1 bg-base-300 rounded-box p-6">
					<nav className="flex flex-col justify-start gap-2 sm:h-[calc(100vh-6rem)]">
						<Form id="search" role="search">
							<input
								type="search"
								placeholder="Search Character"
								className="input input-sm w-full"
								id="query"
								name="query"
								onChange={(e) => handleSearch(e)}
							/>
						</Form>
						<ul className="menu menu-m bg-base-200 rounded-box overflow-y-scroll max-h-[40vh] sm:max-h-[80vh] flex-nowrap">
							<li className="menu-title">Characters</li>
							{filteredChars.length ? (
								filteredChars.map((character) => (
									<li className="" key={character}>
										<NavLink
											className={({ isActive, isPending }) =>
												isActive
													? "active"
													: isPending
													? "pending"
													: ""
											}
											to={findSlugByName(character)}
										>
											{character}
										</NavLink>
									</li>
								))
							) : (
								<li className="pb-2 pl-4">No characters found!</li>
							)}
						</ul>
					</nav>
					{children}
				</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
