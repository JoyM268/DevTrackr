import { motion } from "motion/react";

export default function Loading() {
	return (
		<motion.div
			initial={{ rotate: 0 }}
			animate={{ rotate: 360 }}
			transition={{
				repeat: Infinity,
				duration: 2,
				ease: "linear",
			}}
			className="bg-transparent w-14 h-14 border-[10px] border-[#ffffff] border-solid rounded-full select-none border-t-[10px] border-t-[#3d6aff] z-50"
		></motion.div>
	);
}
