import { motion } from "motion/react";

export default function SideMenu({ menu, current, changeCurrent }) {
	return (
		<motion.div
			initial={{ x: 320 }}
			animate={{ x: menu ? 0 : 320 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			className="h-[calc(100%-64px)] bg-[#070F2B] w-80 fixed right-0 border-l border-solid border-l-[#9290C3] select-none bottom-0 z-50"
		>
			<nav className="text-[#e6e6f3] text-left">
				<div>
					<h1
						className={`transition-all duration-200 cursor-pointer p-4 ${
							current === "Home"
								? "bg-[#2042bf] cursor-not-allowed"
								: "bg-[#070F2B] cursor-pointer hover:bg-[#535C91]"
						}`}
						onClick={() => {
							changeCurrent("Home");
						}}
					>
						Home
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer md:hidden p-4">
						Top Repositories
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer md:hidden p-4">
						Top Developers
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer p-4">
						Discover Repositories
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer p-4">
						Discover Organizations
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer p-4">
						Top Gists
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer p-4">
						Discover Gists
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer p-4">
						Compare Users
					</h1>
				</div>
				<hr />
				<div>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer p-4">
						Your GitHub Stats
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer p-4">
						License Generator
					</h1>
					<h1 className="hover:bg-[#535C91] transition-all duration-200 cursor-pointer p-4">
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
						The source code for the project is available on GitHub.
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
