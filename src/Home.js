import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Search from "./Search";
import Button from "./Button";
import Image from "./programmer.png";

export default function Home({ username, setUsername, search }) {
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
			<div className="text-left p-5 md:ml-[4%] pt-[130px] text-wrap flex flex-col gap-7 h-full text-[#e6e6f3] w-400px md:w-[700px]">
				<h1 className="text-5xl select-none text-nowrap title relative">
					Welcome to DevTrackr
				</h1>
				<div className="flex flex-col gap-3 select-none description">
					<p>A platform for exploring the GitHub Stats.</p>
					<p className="text-justify select-none text-wrap">
						Whether you're looking for the most popular
						repositories, influential developers, trending gists, or
						organizations shaping the tech world, DevTrackr brings
						it all to your fingertips.
					</p>
				</div>
				<Search
					username={username}
					setUsername={setUsername}
					search={search}
				/>
				<OtherOptions />
			</div>
			<div className="select-none">
				<img
					src={Image}
					alt="programmer"
					className="mt-32 h-[606px] hidden xl:block"
				/>
			</div>
		</div>
	);
}

function OtherOptions() {
	return (
		<div className="grid grid-flow-row gap-4 w-[400px] md:w-[600px] grid-cols-2 md:grid-cols-3 button select-none">
			<Button>Check out your stats</Button>
			<Button>Compare Users</Button>
			<Button>Search Repositories</Button>
			<Button>Search Organizations</Button>
			<Button>License Generator</Button>
		</div>
	);
}
