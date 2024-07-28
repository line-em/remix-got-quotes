import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Game of Thrones Quotes" },
		{ name: "description", content: "Game of thrones quotes" }
	];
};

export default function Index() {
	return (
		<section>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsum quibusdam
			temporibus, nulla sapiente dolorem saepe praesentium deleniti dolorum veniam
			modi nam numquam similique eligendi inventore illum facilis libero ducimus?
		</section>
	);
}
