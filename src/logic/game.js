import generateRandomInt from "./generateRandomInt";

export default function game(board) {
	if (!board || (board && !board.length)) return;
	let updatedBoard = [...board];
	// init snake & food
	let snake, food;
	// fulfill snake coords && find the food
	updatedBoard.forEach((row, r) =>
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
			let body = [];
			if (cell.body) {
				body = [...body, { x: c, y: r }];
				snake = {
					...snake,
					body: body,
				};
			}
			// search for food
			if (cell.food) {
				food = { x: c, y: r };
			}
		})
	);
	// update the board with a snake:
	if (!snake) {
		// if no snake, init snake:
		snake = {
			head: { x: 2, y: 0 },
			body: [
				{ x: 0, y: 0 },
				{ x: 1, y: 0 },
			],
		};
		// draw a snake into the board:
		const head = snake.head;
		updatedBoard[head.y][head.x] = {
			...updatedBoard[head.y][head.x],
			head: true,
		};
		const body = snake.body;
		body.forEach((bodyCell) => {
			updatedBoard[bodyCell.y][bodyCell.x] = {
				...updatedBoard[bodyCell.y][bodyCell.x],
				body: true,
			};
		});
	} else {
		//
	}
	// update a board with a food:
	if (!food) {
		// if no food, init food at random coords:
		const x = generateRandomInt();
		const y = generateRandomInt();
		if (x && y) {
			updatedBoard[y][x].food = true;
		}
	}
	//===================================
	return updatedBoard;
}
