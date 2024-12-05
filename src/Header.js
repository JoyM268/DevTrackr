import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";

export default function Header({
	menu,
	menuOpen,
	home,
	changeCurrent,
	current,
}) {
	useEffect(() => {
		let options = document.getElementsByClassName("options");
		for (let element of options)
			element.addEventListener("click", (e) => {
				changeCurrent(e.target.innerText);
			});

		return () => {
			for (let element of options)
				element.removeEventListener("click", (e) => {
					changeCurrent(e.target.innerText);
				});
		};
	}, [changeCurrent]);

	return (
		<div className="select-none flex justify-between bg-[#070F2B] text-[#e6e6f3] h-16 items-center border-b border-b-[#9290C3] border-solid fixed w-full z-[600]">
			<div className="py-3 px-5 cursor-pointer font-bold">
				<h1 className="text-xl" onClick={home}>
					DevTrackr
				</h1>
			</div>
			<div className="flex gap-5 h-full items-center">
				<nav className="flex h-full items-center">
					{!isMobile && (
						<>
							<h1
								className={`p-5 font-medium text-nowrap hidden md:block transition-all duration-300 ease-in-out options  border-b border-b-[#9290C3] border-solid ${
									current === "Top Repositories"
										? "bg-[#2042bf] cursor-not-allowed"
										: "hover:bg-[#535C91]  cursor-pointer"
								}`}
							>
								Top Repositories
							</h1>
							<h1
								className={` p-5 font-medium  text-nowrap hidden md:block transition-all ease-in-out options border-b border-b-[#9290C3] border-solid ${
									current === "Top Developers"
										? "bg-[#2042bf] cursor-not-allowed"
										: "hover:bg-[#535C91] cursor-pointer"
								}`}
							>
								Top Developers
							</h1>
							<h1
								className={`p-5 font-medium text-nowrap hidden md:block transition-all ease-in-out options border-b border-b-[#9290C3] border-solid ${
									current === "Your Stats"
										? "bg-[#2042bf] cursor-not-allowed"
										: "hover:bg-[#535C91] cursor-pointer"
								}`}
							>
								Your Stats
							</h1>
						</>
					)}
					<MenuIcon menu={menu} menuOpen={menuOpen} />
				</nav>
			</div>
		</div>
	);
}

function MenuIcon({ menu, menuOpen }) {
	return (
		<div
			className={`mx-2 p-2 h-10 w-10 cursor-pointer rounded-full hover:bg-[#535C91] flex justify-center items-center transition-transform duration-500 ease-in-out ${
				menu ? "rotate-180" : "rotate-0"
			}`}
			onClick={menuOpen}
		>
			{!menu ? (
				<FontAwesomeIcon icon={faBars} />
			) : (
				<FontAwesomeIcon icon={faX} />
			)}
		</div>
	);
}
