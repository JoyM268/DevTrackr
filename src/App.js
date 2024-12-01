import { useEffect, useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Home from "./Home";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";

export default function App() {
	const [menu, setMenu] = useState(false);
	const [username, setUsername] = useState("");
	const [current, setCurrent] = useState("Home");

	function changeCurrent(option) {
		if (current !== option) {
			setCurrent(option);
			setUsername("");
		}
	}

	function menuOpen() {
		setMenu((menu) => !menu);
	}

	function home() {
		if (current !== "Home") {
			setCurrent("Home");
			setUsername("");
		}
	}

	function search(e) {
		e.preventDefault();
		if (username !== "") setCurrent("UserDetails");
	}

	return (
		<>
			<Header menu={menu} menuOpen={menuOpen} home={home} />
			<SideMenu
				menu={menu}
				current={current}
				changeCurrent={changeCurrent}
			/>
			{current === "Home" && (
				<Home
					username={username}
					setUsername={setUsername}
					search={search}
				/>
			)}

			{current === "UserDetails" && (
				<UserDetails username={username} back={home} />
			)}
		</>
	);
}

function UserDetails({ username, back }) {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [section, setSection] = useState("Repositories");
	const [sectionInfo, setSectionInfo] = useState(null);
	const [loading1, setLoading1] = useState(false);
	const [error1, setError1] = useState(null);

	function changeSection(e) {
		setSection(e.target.innerText);
		setSectionInfo(null);
	}

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
	}, [username]);

	useEffect(() => {
		async function getData() {
			try {
				setError1(null);
				setLoading1(true);
				let res = await fetch(
					`https://api.github.com/users/${username.trim()}/${
						section === "Repositories" && "repos"
					}${section === "Followers" && "followers"}${
						section === "Following" && "following"
					}${section === "Starred" && "starred"}${
						section === "Gists" && "gists"
					}${section === "Events" && "events"}`
				);

				if (!res.ok) {
					throw new Error("No Repositories Found");
				}

				let data = await res.json();
				setSectionInfo(data);
			} catch (err) {
				setError1(err.message);
			} finally {
				setLoading1(false);
			}
		}

		getData();
	}, [section, username]);

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
						<div className="rounded-3xl bg-[#070F2B] m-5  text-white flex border border-[#b5d5ff] border-solid">
							<nav className="flex justify-evenly flex-col border-r border-[#b5d5ff] border-solid">
								<h1
									className={`h-16 cursor-pointer py-5 px-7 rounded-tl-3xl border-b border-[#b5d5ff] border-solid
									${
										section === "Repositories"
											? "cursor-not-allowed bg-[#2042bf]"
											: "cursor-pointer hover:bg-[#535C91]"
									}`}
									onClick={changeSection}
								>
									Repositories
								</h1>
								<h1
									className={`h-16 cursor-pointer py-5 px-7 border-b border-[#b5d5ff] border-solid ${
										section === "Followers"
											? "cursor-not-allowed bg-[#2042bf]"
											: "cursor-pointer hover:bg-[#535C91]"
									}`}
									onClick={changeSection}
								>
									Followers
								</h1>
								<h1
									className={`h-16 cursor-pointer py-5 px-7 border-b border-[#b5d5ff] border-solid ${
										section === "Following"
											? "cursor-not-allowed bg-[#2042bf]"
											: "cursor-pointer hover:bg-[#535C91]"
									}`}
									onClick={changeSection}
								>
									Following
								</h1>
								<h1
									className={`h-16 cursor-pointer py-5 px-7 border-b border-[#b5d5ff] border-solid ${
										section === "Starred"
											? "cursor-not-allowed bg-[#2042bf]"
											: "cursor-pointer hover:bg-[#535C91]"
									}`}
									onClick={changeSection}
								>
									Starred
								</h1>
								<h1
									className={`h-16 cursor-pointer py-5 px-7 border-b border-[#b5d5ff] border-solid,${
										section === "Gists"
											? "cursor-not-allowed bg-[#2042bf]"
											: "cursor-pointer hover:bg-[#535C91]"
									}`}
									onClick={changeSection}
								>
									Gists
								</h1>
								<h1
									className={`h-16 cursor-pointer py-5 px-7 rounded-bl-3xl ${
										section === "Events"
											? "cursor-not-allowed bg-[#2042bf]"
											: "cursor-pointer hover:bg-[#535C91]"
									}`}
									onClick={changeSection}
								>
									Events
								</h1>
							</nav>
							<div className="w-full">
								{loading1 && (
									<div className="flex justify-center items-center h-full w-full text-white select-none">
										<Loading />
									</div>
								)}

								{error1 && (
									<div className="flex justify-center items-center h-full w-full text-white select-none">
										<h1 className="text-2xl font-bold text-center w-full">
											{error1}
										</h1>
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
