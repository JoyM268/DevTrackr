import { useEffect, useState } from "react";
import Loading from "./Loading";
import TopRepoCard from "./TopRepoCard";
import { useRef } from "react";

export default function TopRepositories() {
	const [repos, setRepos] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getRepo() {
			setError(null);
			try {
				setLoading(true);
				let res = await fetch(
					"https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc&per_page=100"
				);
				let data = await res.json();
				if (res.status === 403) {
					throw new Error(
						"Github API Rate Limit Exceeded, Try Again Later."
					);
				} else if (!res.ok) {
					throw new Error("An Error Occured");
				}
				setRepos(data?.items);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		getRepo();
	}, []);

	const scrollRef = useRef(null);

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

				{repos !== null && (
					<>
						{repos?.map((repo, idx) => (
							<TopRepoCard
								scrollRef={scrollRef}
								repoInfo={repo}
								key={repo.id}
								num={idx + 1}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
}
