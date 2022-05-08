import { useEffect, useState } from "react";

export default function Clock({ speed, timerValue }) {
	// speed argument represents time interval, where 1000 = 1 second
	// timerValue argument represents current value of a timer
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);

	function setClock(speed, timerValue) {
		// 1000 should be dividable by speed, like 250, 500, 125
		const reminder = 1000 / speed;
		if (timerValue) {
			timerValue % reminder === 0 &&
				setSeconds((prevState) => (prevState < 59 ? prevState + 1 : 0));
			timerValue % (reminder * 60) === 0 &&
				setMinutes((prevState) => prevState + 1);
		}
	}

	useEffect(() => {
		setClock(speed, timerValue);
	}, [speed, timerValue]);

	return (
		<p className="clock">
			{minutes < 10 ? "0" + minutes : minutes} :{" "}
			{seconds < 10 ? "0" + seconds : seconds}
		</p>
	);
}
