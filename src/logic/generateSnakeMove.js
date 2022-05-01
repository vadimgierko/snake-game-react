export default function generateSnakeMove(prevSnake, dir, foodCoords) {
	//console.log("prevsnake", prevSnake);
	// calculate move in given direction:
	let move = {};
	if (dir === "ArrowRight") {
		move = {
			x: 1,
			y: 0,
		};
	} else if (dir === "ArrowLeft") {
		move = {
			x: -1,
			y: 0,
		};
	} else if (dir === "ArrowDown") {
		move = {
			x: 0,
			y: 1,
		};
	} else {
		move = {
			x: 0,
			y: -1,
		};
	}
	// add move to the snake
	let updatedSnake = {};
	if (foodCoords) {
		updatedSnake = {
			// move head:
			head: {
				x: prevSnake.head.x + move.x,
				y: prevSnake.head.y + move.y,
			},
			// delete first body cell && push prevHead to body array:
			body: [...prevSnake.body, foodCoords],
		};
	} else {
		const [, ...remain] = prevSnake.body;
		updatedSnake = {
			// move head:
			head: {
				x: prevSnake.head.x + move.x,
				y: prevSnake.head.y + move.y,
			},
			// delete first body cell && push prevHead to body array:
			body: [...remain, prevSnake.head],
		};
	}
	return updatedSnake;
}
