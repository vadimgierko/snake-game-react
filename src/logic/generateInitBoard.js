import generateFood from "./generateFood";
import generateInitSnake from "./generateInitSnake";

export default function generateInitBoard(size = 10) {
	// check if size of the board is ok:
	if (size < 10) {
		alert(
			"The board of size: " +
				size +
				" will be to small... Pass bigger board size!"
		);
		return;
	}
	// create empty board:
	let board = [];
	for (let r = 0; r < size; r++) {
		board[r] = [];
		for (let c = 0; c < size; c++) {
			board[r][c] = {
				body: false,
				food: false,
				head: false,
			};
		}
	}
	// create init snake:
	const snake = generateInitSnake();
	// draw a snake into the board:
	const head = snake.head;
	board[head.y][head.x] = {
		...board[head.y][head.x],
		head: true,
	};
	const body = snake.body;
	body.forEach((bodyCell) => {
		board[bodyCell.y][bodyCell.x] = {
			...board[bodyCell.y][bodyCell.x],
			body: true,
		};
	});
	// draw a random piece of food into the board:
	const food = generateFood(snake, size);
	board[food.y][food.x].food = true;
	// return init board
	// with a snake in init position & random positioned piece of food:
	return {
		board: board,
		snake: snake,
		food: food,
	};
}
