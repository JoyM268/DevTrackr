export default function Button({ children }) {
	return (
		<button className="bg-[#172a70] p-3 h-[50px] rounded-3xl border-[#c2b6ff] border border-solid hover:scale-105 transition-all duration-200 md:h-[50px] text-sm md:text-base">
			{children}
		</button>
	);
}
