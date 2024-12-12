import { useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Home from "./Home";
import UserDetails from "./UserDetails";
import TopRepositories from "./TopRepositories";
import TopUsers from "./TopUsers";
import { AnimatePresence } from "motion/react";
import LicenseGenerator from "./LicenseGenerator";
import SearchRepositories from "./SearchRepositories";
import SearchUsers from "./SearchUsers";
import Search from "./Search";

export default function App() {
	const [menu, setMenu] = useState(false);
	const [username, setUsername] = useState("");
	const [current, setCurrent] = useState("Home");

	function viewUser(name) {
		setUsername(name);
		setMenu(false);
		setCurrent("UserDetails");
	}

	function changeCurrent(option) {
		if (current !== option) {
			setCurrent(option);
			setUsername("");
			setMenu(false);
		}
	}

	function menuOpen() {
		setMenu((menu) => !menu);
	}

	function home() {
		if (current !== "Home") {
			setCurrent("Home");
			setUsername("");
			setMenu(false);
		}
	}

	function search(e) {
		e.preventDefault();
		if (username !== "") setCurrent("UserDetails");
	}

	return (
		<>
			<Header
				menu={menu}
				menuOpen={menuOpen}
				home={home}
				changeCurrent={changeCurrent}
				current={current}
			/>

			<AnimatePresence>
				{menu && (
					<SideMenu
						menu={menu}
						current={current}
						changeCurrent={changeCurrent}
					/>
				)}
			</AnimatePresence>

			{current === "Home" && (
				<Home
					username={username}
					setUsername={setUsername}
					search={search}
					changeCurrent={changeCurrent}
				/>
			)}

			{current === "UserDetails" && (
				<UserDetails username={username} back={home} />
			)}

			{current === "Top Repositories" && (
				<TopRepositories isFork={false} />
			)}

			{current === "Top Developers" && <TopUsers isOrg={false} />}

			{current === "License Generator" && <LicenseGenerator />}

			{current === "Search Repositories" && <SearchRepositories />}

			{current === "Search Users" && (
				<SearchUsers viewUser={viewUser} isOrg={false} />
			)}

			{current === "Search Organizations" && (
				<SearchUsers viewUser={viewUser} isOrg={true} />
			)}

			{current === "Top Organizations" && <TopUsers isOrg={true} />}

			{current === "Top Forks" && <TopRepositories isFork={true} />}

			{current === "Your Stats" && <Stats />}
		</>
	);
}

function Stats() {
	const [username, setUsername] = useState(
		localStorage.getItem("username") ? localStorage.getItem("username") : ""
	);

	return (
		<>
			{!username ? (
				<SearchUsername setUsername={setUsername} />
			) : (
				<UserDetails username={username} />
			)}
		</>
	);
}

function SearchUsername({ setUsername }) {
	const [user, setUser] = useState("");

	function search() {
		localStorage.setItem("username", user);
		setUsername(user);
	}

	return (
		<div className="h-full w-full flex justify-center items-start flex-col gap-1 text-[#eeeeee] p-20 md:items-center md:text-center">
			<span className="text-7xl font-bold mt-[-100px]">
				Find Your GitHub Stats
			</span>
			<p className="mb-5 max-w-[700px]">
				Enter your GitHub username to view your personalized stats. Your
				username will be saved for quicker access next time.
			</p>
			<Search
				placeholder={"Enter Your Username"}
				Button={true}
				info={user}
				setInfo={setUser}
				search={search}
			/>
		</div>
	);
}
