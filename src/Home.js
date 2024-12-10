import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Search from "./Search";
import OtherOptions from "./OtherOptions";

export default function Home({ username, setUsername, search, changeCurrent }) {
	useGSAP(() => {
		let t1 = gsap.timeline();

		t1.from(".title", {
			opacity: 0,
			stagger: 0.15,
			duration: 0.4,
			delay: 0.5,
			y: 50,
		});

		t1.from(".description p", {
			opacity: 0,
			stagger: 0.15,
			duration: 0.3,
			delay: 0.1,
			y: 50,
		});

		t1.from(".search", {
			opacity: 0,
			stagger: 0.15,
			duration: 0.3,
			delay: 0.1,
			y: 50,
		});

		t1.from(".button", {
			opacity: 0,
			stagger: 0.15,
			duration: 0.3,
			delay: 0.1,
			y: 50,
		});
	});

	return (
		<div className="flex">
			<div className="text-left p-5 md:ml-[4%] pt-[130px] text-wrap flex flex-col gap-7 h-full text-[#e6e6f3] w-full md:w-[700px]">
				<h1 className="text-5xl select-none text-wrap md:text-nowrap title relative">
					Welcome to DevTrackr
				</h1>
				<div className="flex flex-col gap-3 select-none description">
					<p>Platform for exploring GitHub Stats.</p>
					<p className="text-justify select-none text-wrap hidden sm:block">
						Whether you're looking for the most popular
						repositories, influential developers, trending gists, or
						organizations shaping the tech world, DevTrackr brings
						it all to your fingertips.
					</p>
				</div>
				<Search
					info={username}
					setInfo={setUsername}
					search={search}
					placeholder="Enter Username"
					button={true}
				/>
				<OtherOptions changeCurrent={changeCurrent} />
			</div>
			<div className="select-none">
				<img
					src="/programmer.png"
					alt="programmer"
					className="mt-32 h-[606px] hidden xl:block"
				/>
			</div>
		</div>
	);
}
