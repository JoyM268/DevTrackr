export default function Button({ children }) {
	return (
		<button className="bg-[#172a70] p-3 rounded-3xl border-[#c2b6ff] border border-solid hover:scale-105 transition-all duration-200">
			{children}
		</button>
	);
}
