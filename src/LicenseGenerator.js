export default function LicenseGenerator() {
	const [loadingL, setLoadingL] = useState(false);
	const [loadingR, setLoadingR] = useState(false);
	const [errorL, setErrorL] = useState(null);
	const [errorR, setErrorR] = useState(null);
	const [licenseList, setLicenseList] = useState(null);
	const [selectedLicense, setSelectedLicense] = useState("none");
	const [name, setName] = useState("");
	const [year, setYear] = useState(new Date().getFullYear().toString());

	useEffect(() => {
		async function getLicense() {
			setErrorL(null);
			try {
				setLoadingL(true);
				let res = await fetch("https://api.github.com/licenses");
				let data = await res.json();

				if (res.status === 403) {
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

	return (
		<div className="pt-16 flex flex-col sm:flex-row">
			<div className="p-8 flex-grow flex-shrink min-w-[300px] max-w-[450px]">
				<div className="flex gap-1 flex-col">
					<label className="text-white text-sm">License</label>
					<select
						className="block w-full h-10 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none hover:border-gray-400"
						value={selectedLicense}
						onChange={(e) => setSelectedLicense(e.target.value)}
					>
						<option value="none">--Select a License--</option>
						{licenseList?.map((ele) => (
							<option value={ele.key}>{ele.name}</option>
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
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							className="rounded-lg h-10 px-4 py-2"
							placeholder="Year"
							value={year}
							onChange={(e) => setYear(e.target.value)}
						/>
					</div>
				)}

				{name !== "" &&
					year !== "" &&
					year.length === 4 &&
					/^\d+$/.test(year) &&
					parseInt(year) <= new Date().getFullYear() && (
						<button className="w-full mt-8 bg-[#070F2B] p-2 text-white rounded-xl border border-solid border-[#eeeeee] hover:outline-1 hover:outline transition-all duration-300 ease-in-out hover:opacity-80">
							Download
						</button>
					)}
			</div>
			<div className="py-5 px-10 m-5 rounded-3xl bg-[#070F2B] h-[calc(100vh-100px)] text-white overflow-y-scroll custom-scrollbar max-]"></div>
		</div>
	);
}
