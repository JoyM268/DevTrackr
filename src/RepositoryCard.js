import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";

export default function RepositoryCard({ repoInfo }) {
	return (
		<div className="p-5 bg-[#1b1a55] rounded-lg flex gap-1 flex-col border border-[#b5d5ff] border-solid m-2">
			<a
				href={repoInfo.html_url}
				className="hover:underline underline-offset-2 font-bold text-2xl text-wrap break-all"
			>
				{repoInfo.name}
			</a>
			<div className="flex gap-8 justify-between">
				<div className="flex flex-col text-left">
					<a href={repoInfo.stargazers_url}>
						⭐ {repoInfo.stargazers_count}{" "}
						<span className="hover:underline underline-offset-2">
							Stars
						</span>
					</a>
					<span>👁️ {repoInfo.watchers_count} Watchers</span>
				</div>
				<div className="flex flex-col text-right">
					<a href={repoInfo.forks_url}>
						<FontAwesomeIcon icon={faCodeFork} />{" "}
						{repoInfo.forks_count}{" "}
						<span className="hover:underline underline-offset-2">
							Forks
						</span>
					</a>
					<a href={repoInfo.languages_url}>
						Language:{" "}
						<span className="hover:underline underline-offset-2">
							{repoInfo.language === null
								? "None"
								: repoInfo.language}
						</span>
					</a>
				</div>
			</div>
		</div>
	);
}
