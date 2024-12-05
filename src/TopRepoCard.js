import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";

export default function TopRepoCard({ repoInfo, num, viewportWidth }) {
	return (
		<div className="bg-[#1b1a55] border border-[#b5d5ff] border-solid w-full my-5 p-5 rounded-xl items-end flex justify-between text-wrap gap-1 break-words">
			<div className="flex flex-col gap-3">
				<div className="text-3xl font-bold mb-8 sm:mb-1">
					<span>{num}.</span>
					<span>
						{repoInfo.name.length > 10 && viewportWidth < 500
							? repoInfo.name.slice(0, 8) +
							  " " +
							  repoInfo.name.slice(8)
							: repoInfo.name}
					</span>
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
					View
				</a>
			</div>
		</div>
	);
}
