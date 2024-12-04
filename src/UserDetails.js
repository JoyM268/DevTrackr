import { useEffect, useState } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";
import Section from "./Section";

export default function UserDetails({ username, back }) {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getData() {
			try {
				setError(null);
				setLoading(true);
				let res = await fetch(
					`https://api.github.com/users/${username.trim()}`
				);

				if (!res.ok) {
					throw new Error("User not Found");
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
		// setUserInfo({
		// 	login: "JoyM268",
		// 	id: 125041935,
		// 	node_id: "U_kgDOB3P9Dw",
		// 	avatar_url: "https://avatars.githubusercontent.com/u/125041935?v=4",
		// 	gravatar_id: "",
		// 	url: "https://api.github.com/users/JoyM268",
		// 	html_url: "https://github.com/JoyM268",
		// 	followers_url: "https://api.github.com/users/JoyM268/followers",
		// 	following_url:
		// 		"https://api.github.com/users/JoyM268/following{/other_user}",
		// 	gists_url: "https://api.github.com/users/JoyM268/gists{/gist_id}",
		// 	starred_url:
		// 		"https://api.github.com/users/JoyM268/starred{/owner}{/repo}",
		// 	subscriptions_url:
		// 		"https://api.github.com/users/JoyM268/subscriptions",
		// 	organizations_url: "https://api.github.com/users/JoyM268/orgs",
		// 	repos_url: "https://api.github.com/users/JoyM268/repos",
		// 	events_url: "https://api.github.com/users/JoyM268/events{/privacy}",
		// 	received_events_url:
		// 		"https://api.github.com/users/JoyM268/received_events",
		// 	type: "User",
		// 	user_view_type: "public",
		// 	site_admin: false,
		// 	name: "Joy Mascarenhas",
		// 	company: null,
		// 	blog: "",
		// 	location: "Karnataka",
		// 	email: null,
		// 	hireable: null,
		// 	bio: "3rd year CSE student at SDMCET.",
		// 	twitter_username: null,
		// 	public_repos: 18,
		// 	public_gists: 0,
		// 	followers: 33,
		// 	following: 27,
		// 	created_at: "2023-02-10T14:02:19Z",
		// 	updated_at: "2024-10-23T02:17:37Z",
		// });
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
										<span className="font-bold">
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
											<span className="hover:underline underline-offset-2 cursor-pointer transition-all duration-200">
												{"Followers"}
											</span>
											{" . "}
											{userInfo?.following || 0}{" "}
											<span className="hover:underline underline-offset-2 cursor-pointer">
												{"Following"}
											</span>
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
						<Section username={username} />
					</div>
				</>
			)}
		</div>
	);
}
