import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";
import Section from "./Section";
import Button from "./Button";
import { LineChart, BarChart } from "@mui/x-charts";

export default function UserDetails({ username, back }) {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getData() {
			try {
				setError(null);
				let res = await fetch(
					`https://api.github.com/users/${username}`
				);

				if (res.status === 403) {
					throw new Error(
						"Github API Rate Limit Exceeded, Try Again Later."
					);
				} else if (!res.ok) {
					throw new Error("An Error Occured");
				}

				let data = await res.json();
				setUserInfo(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		getData();
	}, [username]);

	return (
		<div className="h-full overflow-x-hidden custom-scrollbar">
			{loading && (
				<div className="flex justify-center items-center h-full">
					<Loading />
				</div>
			)}

			{error && (
				<div className="flex justify-center items-center h-full flex-col gap-3 text-white select-none px-3 text-center">
					<h1 className="text-4xl font-bold">{error}</h1>
					{back && (
						<button
							onClick={back}
							class="text-[#b5d5ff] underline underline-offset-2"
						>
							Go Back to Home
						</button>
					)}
				</div>
			)}

			{userInfo && (
				<>
					<div className="pt-16 select-none">
						<div className="p-10  m-5 rounded-3xl w-auto bg-[#070F2B] flex flex-col md:flex-row justify-between gap-3 items-start border border-[#b5d5ff] border-solid">
							<div className="flex-col md:flex-row flex items-start md:items-center gap-8">
								<img
									src={userInfo.avatar_url}
									alt={userInfo.login}
									className="h-32 rounded-full border-white border-2 border-solid select-none"
								/>
								<div className="text-xl text-white flex flex-col gap-3">
									<h1>
										<span className="font-bold break-all">
											Username:{"  "}
										</span>
										{userInfo.login}
									</h1>
									{userInfo?.name && (
										<h1>
											<span className="font-bold">
												Name:{"  "}
											</span>
											{userInfo.name}
										</h1>
									)}
									{userInfo?.bio && (
										<h1>
											<span className="font-bold">
												Bio:{"  "}
											</span>
											{userInfo.bio}
										</h1>
									)}
								</div>
							</div>

							<div className="flex flex-col gap-3 md:text-end">
								<h1>
									<span className="text-white text-xl flex items-center gap-3 justify-center">
										<FontAwesomeIcon icon={faUser} />
										<h1>
											{userInfo?.followers || 0}{" "}
											<span>{"Followers"}</span>
											{" . "}
											{userInfo?.following || 0}{" "}
											<span>{"Following"}</span>
										</h1>
									</span>
								</h1>
								<h1>
									<span className="text-white text-xl flex items-center md:justify-end gap-2">
										<FontAwesomeIcon icon={faGlobe} />
										<h1>{userInfo?.location || "Earth"}</h1>
									</span>
								</h1>
								<h1 className="text-white text-xl">
									<span className="font-bold">
										Created on:{"  "}
									</span>
									{userInfo.created_at.split("T")[0]}
								</h1>
								<a
									className="text-white text-xl underline underline-offset-2"
									href={userInfo.html_url}
								>
									Visit Profile
								</a>
							</div>
						</div>
					</div>
					<div className="text-[#eeeeee] flex justify-around flex-wrap gap-5 p-10 m-5 rounded-3xl w-auto bg-[#070F2B] border border-[#b5d5ff] border-solid items-center">
						<Button width={"200px"}>Unfollowed Followers</Button>
						<Button width={"200px"}>Non-Mutual Followings</Button>
						<Button width={"200px"}>Organizations</Button>
						<Button width={"200px"}>Languages</Button>
					</div>
					<div className="select-none mb-4">
						<Section username={username} />
					</div>

					<CommitGraph username={username} />
				</>
			)}
		</div>
	);
}

function CommitGraph({ username }) {
	const [type, setType] = useState("Line");
	const [duration, setDuration] = useState(30);
	const [xAxis, setXAxis] = useState([]);
	const [yAxis, setYAxis] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	function changeType(e) {
		setType(e.target.innerText);
	}

	// 	useEffect(() => {
	// 		async function getData() {
	// 			try {
	// 				setError(null);
	// 				setLoading(true);

	// 				const startDate =
	// 					duration !== 365
	// 						? new Date(
	// 								new Date().setDate(
	// 									new Date().getDate() - duration
	// 								)
	// 						  )
	// 						: new Date(
	// 								new Date().setFullYear(
	// 									new Date().getFullYear() - 1
	// 								)
	// 						  );
	// 				const endDate = new Date();

	// 				const map = new Map();
	// 				let page = 1;
	// 				let hasMoreData = true;

	// 				while (hasMoreData) {
	// 					const res = await fetch(
	// 						`https://api.github.com/users/${username}/events?per_page=100&page=${page}`
	// 					);
	// 					const data = await res.json();

	// 					if (!Array.isArray(data) || data.length === 0) {
	// 						hasMoreData = false;
	// 					} else {
	// 						data.forEach((event) => {
	// 							if (event.type === "PushEvent") {
	// 								const date = event.created_at.split("T")[0];
	// 								map.set(date, (map.get(date) || 0) + 1);
	// 							}
	// 						});
	// 						page++;
	// 					}
	// 				}

	// 				const xAxisData = [];
	// 				const yAxisData = [];

	// 				for (
	// 					let d = new Date(startDate);
	// 					d <= new Date(endDate);
	// 					d.setDate(d.getDate() + 1)
	// 				) {
	// 					const dateString = d.toISOString().split("T")[0];
	// 					xAxisData.push(dateString);
	// 					yAxisData.push(map.get(dateString) || 0);
	// 				}

	// 				setXAxis(xAxisData);
	// 				setYAxis(yAxisData);
	// 			} catch (err) {
	// 				setError(err.message);
	// 			} finally {
	// 				setLoading(false);
	// 			}
	// 		}
	// 	}, [username, duration, type]);

	return (
		<div className="p-10 m-5 rounded-3xl w-auto bg-[#070F2B] flex flex-col md:flex-row justify-between gap-3 items-start border border-[#b5d5ff] border-solid relative select-none">
			<div className="border border-[#b5d5ff] border-solid flex absolute top-3 left-3 rounded-xl text-[#eeeeee]">
				<div
					className={`py-3 px-5 ${
						type === "Line"
							? "cursor-not-allowed bg-[#2042bf] rounded-tl-xl rounded-bl-xl"
							: "cursor-pointer hover:bg-[#535C91] rounded-tl-xl rounded-bl-xl"
					}`}
					onClick={changeType}
				>
					Line
				</div>
				<div
					className={`py-3 px-5 ${
						type === "Bar"
							? "cursor-not-allowed bg-[#2042bf] rounded-br-xl rounded-tr-xl"
							: "cursor-pointer hover:bg-[#535C91] rounded-br-xl rounded-tr-xl"
					}`}
					onClick={changeType}
				>
					Bar
				</div>
			</div>
			<div className="absolute right-3 top-3">
				<select
					className="py-3 px-5 rounded-xl"
					onChange={(e) => setDuration(parseInt(e.target.value))}
					value={duration}
				>
					<option value={30}>Last 30 Days</option>
					<option value={90}>Last 3 Months</option>
					<option value={180}>Last 6 Months</option>
					<option value={365}>Last 1 Year</option>
				</select>
			</div>
			<div className="flex justify-center w-full">
				{type === "Line" ? (
					<LineChart
						xAxis={[
							{
								data: [1, 2, 3, 5, 8, 10],
							},
						]}
						yAxis={[
							{
								data: [1, 2, 3, 5, 8, 10],
							},
						]}
						series={[
							{
								data: [2, 5.5, 2, 8.5, 1.5, 5],
							},
						]}
						width={900}
						height={500}
						sx={{
							"& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
								fill: "#eeeeee",
							},
							"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":
								{
									fill: "#eeeeee",
								},
							"& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
								stroke: "#eeeeee",
							},
							"& .MuiChartsAxis-left .MuiChartsAxis-line": {
								stroke: "#eeeeee",
							},
							"& .MuiChartsAxis-left .MuiChartsAxis-tick": {
								stroke: "#eeeeee",
							},
							"& .MuiChartsAxis-bottom .MuiChartsAxis-tick": {
								stroke: "#eeeeee",
							},
							"& .MuiChartsAxisHighlight-root": {
								stroke: "#eeeeee",
							},
						}}
					/>
				) : (
					<BarChart
						xAxis={[
							{
								scaleType: "band",
								data: ["group A", "group B", "group C"],
							},
						]}
						series={[
							{ data: [4, 3, 5] },
							{ data: [1, 6, 3] },
							{ data: [2, 5, 6] },
						]}
						width={900}
						height={500}
						sx={{
							"& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
								fill: "#eeeeee",
							},
							"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":
								{
									fill: "#eeeeee",
								},
							"& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
								stroke: "#eeeeee",
							},
							"& .MuiChartsAxis-left .MuiChartsAxis-line": {
								stroke: "#eeeeee",
							},
							"& .MuiChartsAxis-left .MuiChartsAxis-tick": {
								stroke: "#eeeeee",
							},
							"& .MuiChartsAxis-bottom .MuiChartsAxis-tick": {
								stroke: "#eeeeee",
							},
						}}
					/>
				)}
			</div>
		</div>
	);
}
