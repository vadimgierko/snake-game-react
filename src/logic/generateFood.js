import generateRandomInt from "./generateRandomInt";

export default function generateFood(snake, boardSize = 10) {
	const eliminatedCoords = [snake.head, ...snake.body];
	// generate random coords for food piece:
	let coords = {
		x: generateRandomInt(boardSize),
		y: generateRandomInt(boardSize),
	};
	// check if coords don't collide with the eliminatedCoords:
	if (eliminatedCoords && eliminatedCoords.length) {
		eliminatedCoords.forEach((element) => {
			if (element.x === coords.x && element.y === coords.y) {
				console.log(
					"random x or y for food collide with eliminatedCoords... generate new one!"
				);
				// if random x or y for food collide with eliminatedCoords,
				// run a function again
				coords = generateFood(snake, boardSize);
			}
		});
	}
	return coords;
}
