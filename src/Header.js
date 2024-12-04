import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";

export default function Header({ menu, menuOpen, home }) {
	return (
		<div className="select-none flex justify-between bg-[#070F2B] text-[#e6e6f3] h-16 items-center border-b border-b-[#9290C3] border-solid fixed w-full z-[200]">
			<div className="py-3 px-5 cursor-pointer font-bold">
				<h1 className="text-xl" onClick={home}>
					DevTrackr
				</h1>
			</div>
			<div className="flex gap-5 h-full items-center">
				<nav className="flex h-full items-center">
					{!isMobile && (
						<>
							<h1 className="hover:bg-[#535C91] p-5 cursor-pointer font-medium  text-nowrap hidden md:block transition-all duration-300 ease-in-out">
								Top Repositories
							</h1>
							<h1 className="hover:bg-[#535C91] p-5 cursor-pointer font-medium  text-nowrap hidden md:block transition-all ease-in-out">
								Top Developers
							</h1>
							<h1 className="hover:bg-[#535C91] p-5 cursor-pointer font-medium  text-nowrap hidden md:block transition-all ease-in-out">
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
