import Button from "./Button";

export default function OtherOptions() {
	return (
		<div className="grid grid-flow-row gap-4 w-[350px] md:w-[600px] grid-cols-2 md:grid-cols-3 button select-none">
			<Button>Check out your stats</Button>
			<Button>Compare Users</Button>
			<Button>Search Repositories</Button>
			<Button>Search Organizations</Button>
			<Button>License Generator</Button>
		</div>
	);
}
