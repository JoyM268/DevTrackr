import Button from "./Button";

export default function OtherOptions({ changeCurrent }) {
	return (
		<div className="grid grid-flow-row gap-4 w-[350px] md:w-[600px] grid-cols-2 md:grid-cols-3 button select-none">
			<Button changeCurrent={changeCurrent}>Search Repositories</Button>
			<Button changeCurrent={changeCurrent}>Search Organizations</Button>
			<Button changeCurrent={changeCurrent}>Compare Users</Button>
			<Button changeCurrent={changeCurrent}>Check out your stats</Button>
			<Button changeCurrent={changeCurrent}>License Generator</Button>
		</div>
	);
}
