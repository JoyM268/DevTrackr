import { motion } from "motion/react";

export default function Button({ children, changeCurrent, width = "auto" }) {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.96 }}
			className="bg-[#172a70] p-3 h-[50px] rounded-3xl border-[#c2b6ff] border border-solid md:h-[50px] text-sm md:text-base"
			onClick={(e) => changeCurrent(e.target.innerText)}
			style={{ width }}
		>
			{children}
		</motion.button>
	);
}
