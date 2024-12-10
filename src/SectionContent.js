import RepositoryCard from "./RepositoryCard";
import FollowCard from "./FollowCard";
import GistCard from "./GistCard";
import EventCard from "./EventCard";

export default function SectionContent({ sectionInfo, section }) {
	return (
		<div
			className={`flex p-2 sm:p-5 max-h-[384px] items-center overflow-y-scroll sm:flex-wrap custom-scrollbar z-50 overflow-x-hidden flex-col sm:flex-row ${
				sectionInfo === null || sectionInfo.length === 0
					? "justify-center mt-40"
					: ""
			}`}
		>
			{section === "Repositories" &&
				sectionInfo?.map((repoInfo) => (
					<RepositoryCard repoInfo={repoInfo} key={repoInfo.id} />
				))}

			{section === "Repositories" &&
				(sectionInfo === null || sectionInfo.length === 0) && (
					<h1 className="text-center text-2xl font-bold text-wrap">
						User Has No Public Repositories.
					</h1>
				)}

			{section === "Followers" &&
				sectionInfo?.map((followInfo) => (
					<FollowCard followInfo={followInfo} key={followInfo.id} />
				))}
			{section === "Following" &&
				sectionInfo?.map((followInfo) => (
					<FollowCard followInfo={followInfo} key={followInfo.id} />
				))}

			{section === "Followers" &&
				(sectionInfo === null || sectionInfo.length === 0) && (
					<h1 className="text-center text-2xl font-bold text-wrap">
						User Has No Followers.
					</h1>
				)}

			{section === "Following" &&
				(sectionInfo === null || sectionInfo.length === 0) && (
					<h1 className="text-center text-2xl font-bold text-wrap">
						User Is Not Following Anyone.
					</h1>
				)}

			{section === "Starred" &&
				sectionInfo?.map((repoInfo) => (
					<RepositoryCard repoInfo={repoInfo} key={repoInfo.id} />
				))}

			{section === "Starred" &&
				(sectionInfo === null || sectionInfo.length === 0) && (
					<h1 className="text-center text-2xl font-bold text-wrap">
						User Has No Starred Repositories.
					</h1>
				)}

			{section === "Gists" &&
				(sectionInfo === null || sectionInfo.length === 0) && (
					<h1 className="text-center text-2xl font-bold text-wrap">
						User Has No Gists.
					</h1>
				)}

			{section === "Gists" &&
				sectionInfo?.map((gistInfo) => (
					<GistCard gistInfo={gistInfo} key={gistInfo.id} />
				))}

			{section === "Events" &&
				(sectionInfo === null || sectionInfo.length === 0) && (
					<h1 className="text-center text-2xl font-bold text-wrap">
						User Has No Events.
					</h1>
				)}

			{section === "Events" &&
				sectionInfo?.map((eventInfo) => (
					<EventCard eventInfo={eventInfo} key={eventInfo.id} />
				))}
		</div>
	);
}
