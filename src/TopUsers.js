import Loading from "./Loading";
import { useState, useEffect } from "react";
import TopUserCard from "./TopUserCard";
import { useRef } from "react";

export default function TopUsers({ isOrg }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getUsers() {
			setError(null);
			try {
				setLoading(true);
				let res = await fetch(
					isOrg
						? "https://api.github.com/search/users?q=followers:>1000+type:organization&sort=followers&order=desc&per_page=100"
						: "https://api.github.com/search/users?q=followers:>1000+type:user&sort=followers&order=desc&per_page=100"
				);
				let data = await res.json();
				if (res.status === 403) {
					throw new Error(
						"Github API Rate Limit Exceeded, Try Again Later"
					);
				} else if (!res.ok) {
					throw new Error("An Error Occured");
				}
				setUser(data.items);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		getUsers();
	}, [isOrg]);

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

				{user !== null && (
					<>
						{user?.map((u, idx) => (
							<TopUserCard
								userInfo={u}
								key={u.id}
								num={idx + 1}
								scrollRef={scrollRef}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
}
