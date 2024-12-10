import { useEffect, useState } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";
import Section from "./Section";

export default function UserDetails({ username, back, viewportWidth }) {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getData() {
			try {
				setError(null);
				let res = await fetch(
					`https://api.github.com/users/${username}`
				);

				if (res.status === 403) {
					throw new Error(
						"Github API Rate Limit Exceeded, Try Again Later."
					);
				} else if (!res.ok) {
					throw new Error("An Error Occured");
				}

				let data = await res.json();
				setUserInfo(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		getData();
	}, [username]);

	return (
		<div className="h-full">
			{loading && (
				<div className="flex justify-center items-center h-full">
					<Loading />
				</div>
			)}

			{error && (
				<div className="flex justify-center items-center h-full flex-col gap-3 text-white select-none">
					<h1 className="text-4xl font-bold">{error}</h1>
					<button
						onClick={back}
						class="text-[#b5d5ff] underline underline-offset-2"
					>
						Go Back to Home
					</button>
				</div>
			)}

			{userInfo && (
				<>
					<div className="pt-16 select-none">
						<div className="p-10  m-5 rounded-3xl w-auto bg-[#070F2B] flex flex-col md:flex-row justify-between gap-3 items-start border border-[#b5d5ff] border-solid">
							<div className="flex-col md:flex-row flex items-start md:items-center gap-8">
								<img
									src={userInfo.avatar_url}
									alt={userInfo.login}
									className="h-32 rounded-full border-white border-2 border-solid select-none"
								/>
								<div className="text-xl text-white flex flex-col gap-3">
									<h1>
										<span className="font-bold break-all">
											Username:{"  "}
										</span>
										{userInfo.login}
									</h1>
									{userInfo?.name && (
										<h1>
											<span className="font-bold">
												Name:{"  "}
											</span>
											{userInfo.name}
										</h1>
									)}
									{userInfo?.bio && (
										<h1>
											<span className="font-bold">
												Bio:{"  "}
											</span>
											{userInfo.bio}
										</h1>
									)}
								</div>
							</div>

							<div className="flex flex-col gap-3 md:text-end">
								<h1>
									<span className="text-white text-xl flex items-center gap-3 justify-center">
										<FontAwesomeIcon icon={faUser} />
										<h1>
											{userInfo?.followers || 0}{" "}
											<span>{"Followers"}</span>
											{" . "}
											{userInfo?.following || 0}{" "}
											<span>{"Following"}</span>
										</h1>
									</span>
								</h1>
								<h1>
									<span className="text-white text-xl flex items-center md:justify-end gap-2">
										<FontAwesomeIcon icon={faGlobe} />
										<h1>{userInfo?.location || "Earth"}</h1>
									</span>
								</h1>
								<h1 className="text-white text-xl">
									<span className="font-bold">
										Created on:{"  "}
									</span>
									{userInfo.created_at.split("T")[0]}
								</h1>
								<a
									className="text-white text-xl underline underline-offset-2"
									href={userInfo.html_url}
								>
									Visit Profile
								</a>
							</div>
						</div>
					</div>
					<div className="select-none mb-4">
						<Section
							username={username}
							viewportWidth={viewportWidth}
						/>
					</div>
				</>
			)}
		</div>
	);
}
