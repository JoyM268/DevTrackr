export default function SectionOptions({
	changeSection,
	section,
	tl,
	bl,
	tr,
	br,
	children,
}) {
	return (
		<h1
			className={`h-16 cursor-pointer py-5 px-2 text-center sm:py-5 sm:px-7 ${
				tl === true ? "rounded-tl-3xl" : ""
			} ${
				bl === true ? "rounded-bl-3xl" : ""
			} border-b border-[#b5d5ff] border-solid
	${
		section === children
			? "cursor-not-allowed bg-[#2042bf]"
			: "cursor-pointer hover:bg-[#535C91]"
	}`}
			onClick={changeSection}
		>
			{children}
		</h1>
	);
}

SectionOptions.defaultProps = {
	bl: false,
	tl: false,
	tr: false,
	br: false,
};
