import {
	Form,
	json,
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useNavigation
} from "@remix-run/react";
import "./tailwind.css";
import { findSlugByName, getCharacters } from "./data";
import { ChangeEvent, useEffect, useState } from "react";
import { sortBy } from "sort-by-typescript";
import { LoaderIcon } from "lucide-react";

export const loader = async () => {
	const characters = await getCharacters();
	const characterNames = characters
		.map((character) => character.name)
		.sort(sortBy("name"));
	return json({ characters, characterNames });
};

export function Layout({ children }: { children: React.ReactNode }) {
	const { characters, characterNames } = useLoaderData<typeof loader>();
	const [filteredNames, setFilteredNames] = useState<string[]>(characterNames);
	const navigation = useNavigation();

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		setFilteredNames(
			characterNames.filter((char) => char.toLowerCase().includes(value))
		);
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
			<body className="p-6 relative">
				<main className="grid sm:grid-cols-[minmax(150px,200px)_1fr] gap-12 sm:gap-6 w-full max-h-screen grid-cols-1 bg-base-300 rounded-box p-6 overflow-y-scroll sm:h-[calc(100vh-5rem)]">
					<nav className="flex flex-col justify-start self-start gap-2 sticky top-0">
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
							{filteredNames.length ? (
								filteredNames.map((name) => (
									<li className="" key={name}>
										<NavLink
											className={({ isActive, isPending }) =>
												isActive
													? "active"
													: isPending
													? "pending"
													: ""
											}
											to={`quotes/${findSlugByName(
												characters,
												name
											)}`}
										>
											{name}
										</NavLink>
									</li>
								))
							) : (
								<li className="pb-2 pl-4">No characters found!</li>
							)}
						</ul>
					</nav>
					{navigation.state === "loading" ? (
						<div className="flex justify-center items-center">
							<LoaderIcon className="animate-spin" size={30} />
						</div>
					) : (
						children
					)}
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
