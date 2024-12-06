import Loading from "./Loading";
import { useState, useEffect } from "react";
import TopDevCard from "./TopDevCard";

export default function TopDevelopers({ viewportWidth }) {
	const [dev, setDev] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getDevs() {
			setError(null);
			try {
				setLoading(true);
				let res = await fetch(
					" https://api.github.com/search/users?q=followers:>1000&sort=followers&order=desc&per_page=100 "
				);
				let data = await res.json();
				if (res.status === 403) {
					throw new Error("API rate limit exceeded");
				} else if (!res.ok) {
					throw new Error("An Error Occured");
				}
				setDev(data.items);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		getDevs();
	}, []);

	return (
		<div className="pt-16 select-none">
			<div className="py-5 px-10 m-5 rounded-3xl bg-[#070F2B] h-[calc(100vh-100px)] text-white overflow-y-scroll custom-scrollbar">
				{loading && (
					<div className="flex items-center justify-center h-full">
						<Loading />
					</div>
				)}

				{error !== null && (
					<div className="flex items-center justify-center h-full text-3xl font-bold">
						<h1>{error.message}</h1>
					</div>
				)}

				{dev !== null && (
					<>
						{dev?.map((dev, idx) => (
							<TopDevCard
								viewportWidth={viewportWidth}
								devInfo={dev}
								key={dev.id}
								num={idx + 1}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
}
