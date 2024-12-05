import { useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Home from "./Home";
import UserDetails from "./UserDetails";

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
				<UserDetails username={username} back={home} />
			)}

			{current === "Top Repositories" && <TopRepositories />}
		</>
	);
}

function TopRepositories() {
	<div className="pt-16 select-none">
		<div className="p-10 m-5 rounded-3xl h-full w-auto bg-[#070F2B]">
			<span>Repos</span>
		</div>
	</div>;
}
