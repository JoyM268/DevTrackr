import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

export default function SearchRepoCard({ repoInfo, scrollRef }) {
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
			className="bg-[#1b1a55] border border-[#b5d5ff] border-solid w-full my-5 p-5 rounded-xl items-end flex justify-between text-wrap gap-1 break-words"
		>
			<div className="flex flex-col gap-3">
				<div className="text-3xl font-bold mb-8 sm:mb-1">
					<span className="break-w break-all">{repoInfo.name}</span>
				</div>
				<div className="flex flex-col gap-1">
					<span>⭐ {repoInfo.stargazers_count} Stars</span>
					<span>👁️ {repoInfo.watchers_count} Watchers</span>
				</div>
			</div>
			<div className="flex flex-col gap-1 text-right">
				<span>
					<FontAwesomeIcon icon={faCodeFork} /> {repoInfo.forks_count}{" "}
					Forks
				</span>
				<a
					href={repoInfo.html_url}
					className="text-lg text-[#b5d5ff] underline underline-offset-2"
				>
					View Repository
				</a>
			</div>
		</motion.div>
	);
}
