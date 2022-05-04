import generateEmptyBoard from "./generateEmptyBoard";

export default function generateInitBoard(snake, food, size = 10) {
	// create empty board:
	let board = generateEmptyBoard(size);
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
	board[food.y][food.x].food = true;
	return board;
}
