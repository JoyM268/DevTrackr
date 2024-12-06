import SectionOptions from "./SectionOptions";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import SectionContent from "./SectionContent";

export default function Section({ username, viewportWidth }) {
	const [section, setSection] = useState("Repositories");
	const [sectionInfo, setSectionInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	function changeSection(e) {
		setSection(e.target.innerText);
		setSectionInfo(null);
	}

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

				if (res.status === 403) {
					throw new Error("API rate limit exceeded");
				} else if (!res.ok) {
					throw new Error("An Error Occured");
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
