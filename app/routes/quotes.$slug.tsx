import { BookHeart } from "lucide-react";

const Quotes = () => {
	return (
		<div>
			{" "}
			<div className="stat">
				<BookHeart />
				<div className="stat-title">Characters</div>
				<div className="stat-value">1,200</div>
				<div className="stat-desc">↘︎ 90 (14%)</div>
			</div>
		</div>
	);
};

export default Quotes;
