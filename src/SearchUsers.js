import Search from "./Search";
import Loading from "./Loading";
import SearchDevCard from "./SearchDevCard";
import { useEffect, useRef, useState } from "react";

export default function SearchUsers({ viewUser }) {
	const [devs, setDevs] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const scrollRef = useRef();

	useEffect(() => {
		setError(null);
		const controller = new AbortController();
		const signal = controller.signal;
		async function getDevs() {
			try {
				setLoading(true);
				setResult(null);
				let res = await fetch(
					`https://api.github.com/search/users?q=${devs}+type:user`,
					{ signal }
				);

				let data = await res.json();
				if (res.status === 403) {
					throw new Error(
						"Github API Rate Limit Exceeded, Try Agian Later"
					);
				} else if (!res.ok) {
					throw new Error("An Error Occured");
				}
				setResult(data);
			} catch (err) {
				if (err.name !== "AbortError") {
					setError(err.message);
				}
			} finally {
				setLoading(false);
			}
		}
		if (devs === "") {
			setResult("");
		} else {
			getDevs();
		}

		return () => {
			controller.abort();
		};
	}, [devs]);

	return (
		<div className="pt-16 h-full w-full">
			<div className="py-5 px-10 m-5 rounded-3xl bg-[#070F2B] h-[calc(100vh-100px)] text-white overflow-y-scroll custom-scrollbar pb-8">
				<div
					className={`flex justify-center mt-3 ${
						loading || error || result?.total_count === 0
							? "mb-[-30px]"
							: "mb-3"
					}`}
				>
					<Search
						info={devs}
						setInfo={setDevs}
						placeholder="Enter Username"
					/>
				</div>
				<div
					className={`w-full h-full ${
						loading || error || result?.total_count === 0
							? "flex justify-center items-center"
							: ""
					}`}
				>
					{loading && <Loading />}
					{error && <h1 className="text-3xl font-bold">{error}</h1>}
					{!loading && !error && result?.total_count === 0 && (
						<h1 className="text-3xl font-bold">No Results Found</h1>
					)}
					{!loading &&
						!error &&
						result?.total_count !== 0 &&
						result?.items?.map((dev) => (
							<SearchDevCard
								devInfo={dev}
								key={dev.id}
								scrollRef={scrollRef}
								viewUser={viewUser}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
