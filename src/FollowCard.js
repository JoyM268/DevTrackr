export default function FollowCard({ followInfo, viewportWidth }) {
	return (
		<div className="flex w-52 sm:w-auto gap-5 m-3 bg-[#1b1a55] p-2 sm:px-5 sm:py-4 items-center rounded-xl border border-solid border-[#b5d5ff] flex-col">
			<div>
				<img
					src={followInfo?.avatar_url}
					alt={followInfo.id}
					className="h-20 rounded-full border border-solid border-[#b5d5ff]"
				/>
			</div>
			<div className="flex flex-col gap-1 text-center">
				<span className="text-2xl break-words">
					{followInfo.login.length > 15 && viewportWidth < 640
						? followInfo.login.slice(0, 10) +
						  " " +
						  followInfo.login.slice(10)
						: followInfo.login}
				</span>
				<a
					href={followInfo.html_url}
					className="text-[#c1dcff] text-wrap break-words hover:underline underline-offset-2"
				>
					Visit Profile
				</a>
			</div>
		</div>
	);
}
