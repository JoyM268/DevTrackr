export default function EventCard({ eventInfo }) {
	return (
		<div className="p-5 m-2 flex flex-col bg-[#1b1a55] rounded-lg border border-[#b5d5ff] border-solid gap-1">
			<div className="flex flex-col">
				<span className="text-xs">{eventInfo?.type}</span>
				<span className="text-lg font-bold">
					{eventInfo?.repo.name}
				</span>
			</div>
			<div className="flex flex-col">
				<span>🗓️ {eventInfo.created_at.split("T")[0]}</span>
				<a
					href={`https://github.com/${eventInfo.repo.name}/commit/${eventInfo.payload.head}`}
					className="text-[#b5d5ff] underline underline-offset-2"
				>
					View Commit
				</a>
			</div>
		</div>
	);
}
