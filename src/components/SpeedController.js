export default function SpeedController({ speed, setSpeed }) {
	// speed arg: 1000 = 1 second
	const movesPerSecond = 1000 / speed;
	return (
		<div className="speed-controller" style={{ marginBottom: "1em" }}>
			<button
				style={{ backgroundColor: "rgb(35, 75, 137)", color: "white" }}
				onClick={() =>
					setSpeed((prevState) =>
						prevState < 1000 ? prevState * 2 : prevState
					)
				}
			>
				-
			</button>{" "}
			{movesPerSecond}{" "}
			<button
				style={{ backgroundColor: "rgb(35, 75, 137)", color: "white" }}
				onClick={() =>
					setSpeed((prevState) =>
						prevState >= 125 ? prevState / 2 : prevState
					)
				}
			>
				+
			</button>{" "}
			moves / second
		</div>
	);
}
