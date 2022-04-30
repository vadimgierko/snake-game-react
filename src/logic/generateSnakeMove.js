export default function generateSnakeMove(prevSnake, dir) {
	console.log("prevsnake", prevSnake);
	// calculate move in given direction:
	let move = {};
	if (dir === "right") {
		move = {
			x: 1,
			y: 0,
		};
	} else if (dir === "left") {
		move = {
			x: -1,
			y: 0,
		};
	} else if (dir === "down") {
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
	const [, ...remain] = prevSnake.body;
	const updatedSnake = {
		// move head:
		head: {
			x: prevSnake.head.x + move.x,
			y: prevSnake.head.y + move.y,
		},
		// delete first body cell && push prevHead to body array:
		body: [...remain, prevSnake.head],
	};
	return updatedSnake;
}
