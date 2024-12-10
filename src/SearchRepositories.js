import Search from "./Search";
import Loading from "./Loading";
import SearchRepoCard from "./SearchRepoCard";
import { useEffect, useRef, useState } from "react";

export default function SearchRepositories() {
	const [repo, setRepo] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const scrollRef = useRef();

	async function getRepos(query) {
		try {
			setLoading(true);
			setResult(null);
			setError(null);

			const repoQuery = query.trim();
			const url = repoQuery
				? `https://api.github.com/search/repositories?q=${repoQuery}&per_page=100`
				: "https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc&per_page=100";

			let res = await fetch(url);
			if (!res.ok) {
				if (res.status === 403) {
					throw new Error(
						"GitHub API Rate Limit Exceeded. Try again later or sign in."
					);
				} else {
					throw new Error(`Error: ${res.status} ${res.statusText}`);
				}
			}

			const data = await res.json();
			if (!data.items || data.items.length === 0) {
				throw new Error("No repositories found.");
			}

			setResult(data);
		} catch (err) {
			setError(err.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getRepos("");
	}, []);

	function searchRepo(e) {
		e.preventDefault();
		getRepos(repo);
	}

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
						info={repo}
						setInfo={setRepo}
						placeholder="Enter Repository Name"
						button={true}
						search={searchRepo}
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
						result?.items?.map((repo, idx) => (
							<SearchRepoCard
								repoInfo={repo}
								key={repo.id}
								scrollRef={scrollRef}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
