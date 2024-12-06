import { useEffect, useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Home from "./Home";
import UserDetails from "./UserDetails";
import TopRepositories from "./TopRepositories";
import TopDevelopers from "./TopDevelopers";

export default function App() {
	const [menu, setMenu] = useState(false);
	const [username, setUsername] = useState("");
	const [current, setCurrent] = useState("Home");
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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

	useEffect(() => {
		function handleResize() {
			setViewportWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<Header
				menu={menu}
				menuOpen={menuOpen}
				home={home}
				changeCurrent={changeCurrent}
				current={current}
			/>
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
				<UserDetails
					username={username}
					back={home}
					viewportWidth={viewportWidth}
				/>
			)}

			{current === "Top Repositories" && (
				<TopRepositories viewportWidth={viewportWidth} />
			)}

			{current === "Top Developers" && (
				<TopDevelopers viewportWidth={viewportWidth} />
			)}
		</>
	);
}
