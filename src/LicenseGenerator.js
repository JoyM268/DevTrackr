import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import { motion } from "motion/react";

export default function LicenseGenerator() {
	const [loadingL, setLoadingL] = useState(false);
	const [loadingR, setLoadingR] = useState(false);
	const [errorL, setErrorL] = useState(null);
	const [errorR, setErrorR] = useState(null);
	const [licenseList, setLicenseList] = useState(null);
	const [selectedLicense, setSelectedLicense] = useState("none");
	const [name, setName] = useState("");
	const [license, setLicense] = useState("");
	const orgLicense = useRef("");
	const errorStatus = useRef(null);
	const [year, setYear] = useState(new Date().getFullYear().toString());

	useEffect(() => {
		async function getLicense() {
			setErrorL(null);
			errorStatus.current = null;
			try {
				setLoadingL(true);
				let res = await fetch("https://api.github.com/licenses");
				let data = await res.json();

				if (res.status === 403) {
					errorStatus.current = 403;
					throw new Error("API rate limit exceeded");
				} else if (!res.ok) {
					throw new Error("An Error Occured");
				}
				setLicenseList(data);
			} catch (err) {
				setErrorL(err.message);
			} finally {
				setLoadingL(false);
			}
		}

		getLicense();
	}, []);

	useEffect(() => {
		setErrorR(null);
		setName("");
		setYear(new Date().getFullYear().toString());
		async function getContent() {
			try {
				setLoadingR(true);
				let res = await fetch(selectedLicense);
				let data = await res.json();
				if (res.status === 403) {
					errorStatus.current = 403;
					throw new Error("API rate limit exceeded");
				} else if (!res.ok) {
					throw new Error("Unable to Fetch License");
				}
				orgLicense.current = data.body;
				setLicense(
					formatLicenseText(
						data.body.replace(
							/\[year\]/g,
							new Date().getFullYear().toString()
						)
					)
				);
			} catch (err) {
				setErrorR(err.message);
			} finally {
				setLoadingR(false);
			}
		}
		if (selectedLicense !== "none") {
			getContent();
		} else {
			setLicense("Select a License");
		}
	}, [selectedLicense]);

	useEffect(() => {
		if (selectedLicense !== "none") {
			let formattedLicense = orgLicense.current;
			if (name !== "") {
				formattedLicense = formattedLicense.replace(
					/\[fullname\]|\[name\]/g,
					name
				);
			}
			if (
				year !== "" &&
				year.length === 4 &&
				parseInt(year) <= new Date().getFullYear() &&
				/^\d+$/.test(year)
			) {
				formattedLicense = formattedLicense.replace(/\[year\]/g, year);
			}
			setLicense(formatLicenseText(formattedLicense));
		}
	}, [name, year, selectedLicense]);

	function formatLicenseText(text) {
		return text.split("\n").map((line, index) => (
			<span key={index}>
				{line}
				<br />
			</span>
		));
	}

	function handleDownload() {
		const blob = new Blob(
			[
				orgLicense.current
					.replace(/\[year\]/g, year)
					.replace(/\[fullname\]|\[name\]/g, name),
			],
			{ type: "application/octet-stream" }
		);
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "LICENSE";
		link.click();

		setName("");
		setYear(new Date().getFullYear().toString());
		setSelectedLicense("none");
		setLicense("Select a License");
	}

	return (
		<div
			className={`flex flex-col md:flex-row md:min-w-[300px] max-w-[450px] md:max-w-full ${
				errorL || (errorR && errorStatus.current === 403)
					? "h-full pt-0"
					: "pt-16"
			}`}
		>
			{(errorL || errorR) && errorStatus.current === 403 ? (
				<h1 className="flex h-full items-center justify-center text-[#eeeeee] font-bold text-2xl w-full select-none">
					Github API Rate Limit Exceeded, Try Again Later.
				</h1>
			) : errorL ? (
				<h1 className="flex h-full items-center justify-center text-[#eeeeee] font-bold text-2xl w-full select-none">
					Error Occured While Fetching Licenses.
				</h1>
			) : (
				<>
					<div className="p-8 flex-grow flex-shrink min-w-[300px] max-w-[450px]">
						{loadingL && (
							<div className="flex items-center justify-center h-full">
								<Loading />
							</div>
						)}
						{!loadingL && !errorL && (
							<>
								<div className="flex gap-1 flex-col">
									<label className="text-white text-sm select-none">
										License
									</label>
									<select
										className="block w-full h-10 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none hover:border-gray-400 select-none"
										value={selectedLicense}
										onChange={(e) =>
											setSelectedLicense(e.target.value)
										}
									>
										<option value="none">
											--Select a License--
										</option>
										{licenseList?.map((ele) => (
											<option
												value={ele.url}
												key={ele.key}
											>
												{ele.name}
											</option>
										))}
									</select>
								</div>
								{selectedLicense !== "none" && (
									<div className="mt-8 flex flex-col gap-3">
										<input
											type="text"
											className="rounded-lg h-10 px-4 py-2"
											placeholder="Name"
											value={name}
											onChange={(e) =>
												setName(e.target.value)
											}
										/>
										<input
											type="text"
											className="rounded-lg h-10 px-4 py-2"
											placeholder="Year"
											value={year}
											onChange={(e) =>
												setYear(e.target.value)
											}
										/>
									</div>
								)}

								{name !== "" &&
									year !== "" &&
									year.length === 4 &&
									/^\d+$/.test(year) &&
									parseInt(year) <=
										new Date().getFullYear() && (
										<motion.button
											whileHover={{
												scale: 1.02,
												opacity: 0.9,
											}}
											whileTap={{
												scale: 0.98,
												opacity: 1,
											}}
											className="w-full mt-8 bg-[#070F2B] p-2 text-white rounded-xl border border-solid border-[#eeeeee] select-none"
											onClick={handleDownload}
										>
											Download
										</motion.button>
									)}
							</>
						)}
					</div>

					<div
						className={`rounded-3xl bg-[#070F2B] h-[calc(100vh-100px)] md:flex-1 mt-1 md:mt-8 mx-4 md:mx-10 min-w-[350px] mb-9 md:mb-1 text-[#eeeeee] px-8 py-5 overflow-y-scroll custom-scrollbar text-center ${
							selectedLicense === "none" || loadingR || errorR
								? "items-center justify-center text-2xl font-bold flex pt-0"
								: ""
						}`}
					>
						{loadingR && <Loading />}
						{errorR && (
							<h1 className="select-none">
								Unable To Fetch License
							</h1>
						)}
						{!loadingR && !errorR && license}
					</div>
				</>
			)}
		</div>
	);
}
