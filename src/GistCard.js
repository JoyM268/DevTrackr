export default function GistCard({ gistInfo }) {
	return (
		<div className="bg-[#1b1a55] p-5 rounded-lg border border-[#b5d5ff] border-solid gap-1 flex flex-col m-2">
			<span className="text-xl font-bold">{gistInfo.description}</span>
			<div className="flex flex-col gap-1">
				<span>💬 {gistInfo.comments} Comments</span>
				<span>Created on: {gistInfo.created_at.split("T")[0]}</span>
				<a
					href={gistInfo.html_url}
					className="underline underline-offset-2 text-[#b5d5ff]"
				>
					View Gist
				</a>
			</div>
		</div>
	);
}
