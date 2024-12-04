import SectionOptions from "./SectionOptions";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import RepositoryCard from "./RepositoryCard";
import FollowCard from "./FollowCard";
import GistCard from "./GistCard";
import EventCard from "./EventCard";

export default function Section({ username }) {
	const [section, setSection] = useState("Repositories");
	const [sectionInfo, setSectionInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

	function changeSection(e) {
		setSection(e.target.innerText);
		setSectionInfo(null);
	}

	useEffect(() => {
		function handleResize() {
			setViewportWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const map = {
			Repositories: "repos",
			Followers: "followers",
			Following: "following",
			Starred: "starred",
			Gists: "gists",
			Events: "events",
		};

		async function getData() {
			try {
				setError(null);
				setLoading(true);
				let res = await fetch(
					`https://api.github.com/users/${username.trim()}/${
						map[section]
					}`
				);

				if (!res.ok) {
					throw new Error("No Repositories Found");
				}

				let data = await res.json();
				setSectionInfo(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		getData();
	}, [section, username]);

	return (
		<div className="rounded-3xl bg-[#070F2B] m-5 text-white flex border border-[#b5d5ff] border-solid z-[100]">
			<nav className="flex justify-evenly flex-col border-r border-[#b5d5ff] border-solid">
				<SectionOptions
					changeSection={changeSection}
					section={section}
					tl={true}
				>
					Repositories
				</SectionOptions>
				<SectionOptions changeSection={changeSection} section={section}>
					Followers
				</SectionOptions>
				<SectionOptions changeSection={changeSection} section={section}>
					Following
				</SectionOptions>
				<SectionOptions changeSection={changeSection} section={section}>
					Starred
				</SectionOptions>
				<SectionOptions changeSection={changeSection} section={section}>
					Gists
				</SectionOptions>
				<SectionOptions
					changeSection={changeSection}
					section={section}
					bl={true}
				>
					Events
				</SectionOptions>
			</nav>
			<div className="w-full">
				{loading && (
					<div className="flex justify-center items-center h-full w-full text-white select-none">
						<Loading />
					</div>
				)}
				{error && (
					<div className="flex justify-center items-center h-full w-full text-white select-none">
						<h1 className="text-2xl font-bold text-center w-full">
							{error}
						</h1>
					</div>
				)}

				<SectionContent
					sectionInfo={sectionInfo}
					section={section}
					viewportWidth={viewportWidth}
				/>
			</div>
		</div>
	);
}

function SectionContent({ sectionInfo, section, viewportWidth }) {
	return (
		<div
			className={`flex p-2 sm:p-5 max-h-[384px] overflow-y-scroll sm:flex-wrap custom-scrollbar z-50 overflow-x-hidden flex-col sm:flex-row ${
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
					<FollowCard
						followInfo={followInfo}
						key={followInfo.id}
						viewportWidth={viewportWidth}
					/>
				))}
			{section === "Following" &&
				sectionInfo?.map((followInfo) => (
					<FollowCard
						followInfo={followInfo}
						key={followInfo.id}
						viewportWidth={viewportWidth}
					/>
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
