import { motion } from "motion/react";

export default function SearchUserCard({ userInfo, scrollRef, viewUser }) {
	return (
		<motion.div
			initial={{ opacity: 0, x: -100 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.8,
				type: "spring",
				stiffness: 60,
				damping: 15,
			}}
			viewport={{ once: true, root: scrollRef }}
			className="border-solid my-5 p-5 rounded-xl text-wrap break-words bg-[#1b1a55] border-[#b5d5ff] border"
		>
			<div>
				<div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left">
					<img
						src={userInfo.avatar_url}
						alt={userInfo.login}
						className="h-24 rounded-full border border-solid border-[#b5d5ff]"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-2xl font-bold break-all">
							{userInfo.login}
						</span>
						<span
							className="text-[#b5d5ff] underline underline-offset-2 px-1 cursor-pointer"
							onClick={() => {
								viewUser(userInfo.login);
							}}
						>
							View More
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
