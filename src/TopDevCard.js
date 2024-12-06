export default function TopDevCard({ devInfo, num, viewportWidth }) {
	return (
		<div className="border-solid my-5 p-5 rounded-xl text-wrap break-words bg-[#1b1a55] border-[#b5d5ff] border">
			<div>
				<div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left">
					<img
						src={devInfo.avatar_url}
						alt={devInfo.login}
						className="h-24 rounded-full border border-solid border-[#b5d5ff]"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-2xl font-bold">
							{devInfo.login.length > 14 && viewportWidth < 375
								? devInfo.login.slice(0, 14) +
								  " " +
								  devInfo.login.slice(14)
								: devInfo.login}
						</span>
						<a
							href={devInfo.html_url}
							className="text-[#b5d5ff] underline underline-offset-2 px-1"
						>
							Visit Profile
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
