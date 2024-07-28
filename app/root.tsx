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
import { Crown } from "lucide-react";

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
				<main className="grid grid-rows-[auto_1fr] grid-cols-[minmax(150px,200px)_1fr] gap-y-2 w-full max-h-screen h-full">
					<header className="col-span-2 pt-2 pb-2 bg-base-300 flex gap-4 align-center justify-center">
						<Crown />
						Game of Thrones Quotes
					</header>
					<nav className="flex flex-col gap-4 align-center justify-center h-[90vh]">
						<div className="join join-vertical overflow-y-auto">
							{characters.map((character) => (
								<button className="btn join-item" key={character}>
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
