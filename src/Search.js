import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search({ username, setUsername, search }) {
	return (
		<div className="relative w-[350px] md:w-[600px] search">
			<form className="block relative" onSubmit={search}>
				<input
					type="text"
					className="w-full h-12 rounded-3xl pl-5 pr-10 text-[#070F2B] outline-none border-2 border-solid border-[#51528f] text-m font-medium"
					placeholder="Enter Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button
					type="submit"
					className="absolute right-0 text-[#e6e6f3] cursor-pointer bg-[#142256] h-full w-16 rounded-3xl border-2 border-[#51528f] border-l-0 hover:opacity-95"
				>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
			</form>
		</div>
	);
}
