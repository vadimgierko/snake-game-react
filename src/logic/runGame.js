import generateEmptyBoard from "./generateEmptyBoard";
import generateSnakeMove from "./generateSnakeMove";

export default function runGame(board, dir) {
	// find prevSnake & food
	let snake = {
		head: {},
		body: [],
	};
	let food = {};
	board.forEach((row, r) =>
		row.forEach((cell, c) => {
			// search for head
			if (cell.head) {
				snake = {
					...snake,
					head: {
						x: c,
						y: r,
					},
				};
			}
			// search for body
			if (cell.body) {
				snake = {
					...snake,
					body: [...snake.body, { x: c, y: r }],
				};
			}
			//search for food
			if (cell.food) {
				food = {
					x: c,
					y: r,
				};
			}
		})
	);
	// calculate snake position after move:
	const updatedSnake = generateSnakeMove(snake, dir);
	// check if snake will collide with the walls
	if (
		updatedSnake.head.x >= 10 ||
		updatedSnake.head.x < 0 ||
		updatedSnake.head.y >= 10 ||
		updatedSnake.head.y < 0
	) {
		console.log("You lose...");
		return board;
	}
	// clear the board
	const updatedBoard = generateEmptyBoard();
	// update a board with the updated snake
	// draw head
	const head = { ...updatedSnake.head };
	updatedBoard[head.y][head.x].head = true;
	// draw body
	const body = [...updatedSnake.body];
	body.forEach(
		(bodyCell) => (updatedBoard[bodyCell.y][bodyCell.x].body = true)
	);
	// update board with the food
	updatedBoard[food.y][food.x].food = true;
	//=====================================
	return updatedBoard;
	//===================== TO DO:
	// // TODO: check if there is no collision with the snake itself
	// // TODO: if above true (no collisions):
	// // TODO: check if a food will be eaten
	// // TODO: if true: add one more cell to the snake, generate new food & THEN update a board with the updated snake
	// // if false: update a board with the updated snake
}
