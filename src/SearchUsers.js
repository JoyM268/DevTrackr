import Search from "./Search";
import Loading from "./Loading";
import SearchUserCard from "./SearchUserCard";
import { useEffect, useRef, useState } from "react";

export default function SearchUsers({ viewUser, isOrg }) {
	const [users, setUsers] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const scrollRef = useRef();

	async function getUser(query) {
		try {
			setError(null);
			setLoading(true);
			setResult(null);
			const url = query
				? `https://api.github.com/search/users?q=${query}+type:user&per_page=100`
				: "https://api.github.com/search/users?q=followers:>1000+type:user&sort=followers&order=desc&per_page=100";
			let res = await fetch(url);
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
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	async function getOrgs(query) {
		try {
			setError(null);
			setLoading(true);
			setResult(null);
			const url = query
				? `https://api.github.com/search/users?q=${query}+type:organization&per_page=100`
				: "https://api.github.com/search/users?q=followers:>1000+type:organization&sort=followers&order=desc&per_page=100";
			let res = await fetch(url);
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
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (isOrg) {
			getOrgs("");
		} else {
			getUser("");
		}
	}, [isOrg]);

	function searchUser(e) {
		e.preventDefault();
		if (!isOrg) {
			getUser(users);
		} else {
			getOrgs(users);
		}
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
						info={users}
						setInfo={setUsers}
						placeholder={
							isOrg ? "Enter Organization Name" : "Enter Username"
						}
						search={searchUser}
						button={true}
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
						result?.items?.map((user) => (
							<SearchUserCard
								userInfo={user}
								key={user.id}
								scrollRef={scrollRef}
								viewUser={viewUser}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
