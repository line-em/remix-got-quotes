import {
	json,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData
} from "@remix-run/react";
import "./tailwind.css";
import { getCharacters } from "./data";

export const loader = async () => {
	const characters = await getCharacters();
	return json(characters);
};

export function Layout({ children }: { children: React.ReactNode }) {
	const characters = useLoaderData<typeof loader>();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<main className="grid grid-rows-[auto_1fr] grid-cols-[minmax(150px,200px)_1fr] gap-4 w-full h-[100vh]">
					<header className="col-span-2 p-2">Game of Thrones Quotes</header>
					<nav className="flex flex-col gap-4 align-center justify-start">
						<div className="join join-vertical">
							{characters.map((character) => (
								<button
									className="btn join-item"
									key={character}
								>
									{character}
								</button>
							))}
						</div>
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
