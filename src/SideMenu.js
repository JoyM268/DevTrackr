import { motion } from "motion/react";
import { useEffect } from "react";

export default function SideMenu({ menu, current, changeCurrent }) {
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
		<motion.div
			initial={{ x: 320 }}
			exit={{ x: 320 }}
			animate={{ x: 0 }}
			transition={{ type: "spring", stiffness: 230, damping: 30 }}
			className="h-[calc(100%-64px)] bg-[#070F2B] w-80 fixed right-0 border-l border-solid border-l-[#9290C3] select-none bottom-0 z-[500] overflow-y-scroll overflow-x-hidden custom-scrollbar"
		>
			<nav className="text-[#e6e6f3] text-left">
				<div>
					<h1
						className={`transition-all duration-200 options p-4 ${
							current === "Home"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Home
					</h1>
					<h1
						className={`transition-all duration-200 md:hidden p-4 options ${
							current === "Top Repositories"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Top Repositories
					</h1>
					<h1
						className={`transition-all duration-200 md:hidden p-4 options ${
							current === "Top Developers"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Top Developers
					</h1>
					<h1
						className={`transition-all duration-200 p-4 options ${
							current === "Discover Repositories"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Discover Repositories
					</h1>
					<h1
						className={`transition-all duration-200 p-4 options ${
							current === "Discover Organizations"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Search Organizations
					</h1>
					<h1
						className={`transition-all duration-200 p-4 options ${
							current === "Top Gists"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Top Gists
					</h1>
					<h1
						className={`transition-all duration-200 p-4 options ${
							current === "Discover Gists"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Discover Gists
					</h1>
					<h1
						className={`transition-all duration-200 p-4 options ${
							current === "Compare Users"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Compare Users
					</h1>
				</div>
				<hr />
				<div>
					<h1
						className={`transition-all duration-200 p-4 options ${
							current === "Your GitHub Stats"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						Your GitHub Stats
					</h1>
					<h1
						className={`transition-all duration-200 p-4 options ${
							current === "License Generator"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						License Generator
					</h1>
					<h1
						className={`transition-all duration-200 p-4 options ${
							current === "About"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
					>
						About
					</h1>
				</div>
				<hr />
				<div className="text-xs flex flex-col gap-4 p-3 mt-2">
					<p>
						This website was developed by{" "}
						<a
							className="text-[#7886cb] hover:underline"
							href="https://github.com/JoyM268"
						>
							Joy Mascarenhas
						</a>
						.
					</p>
					<p>
						The source code for the project is available on{" "}
						<a
							className="text-[#7886cb] hover:underline"
							href="https://github.com/JoyM268/DevTrackr"
						>
							GitHub
						</a>
						.
					</p>
					<p>
						The data displayed here is powered by the{" "}
						<a
							className="text-[#7886cb] hover:underline"
							href="https://api.github.com/"
						>
							GitHub API
						</a>
						, providing real-time information about repositories,
						users, and more.
					</p>
				</div>
			</nav>
		</motion.div>
	);
}
