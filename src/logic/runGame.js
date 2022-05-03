import generateEmptyBoard from "./generateEmptyBoard";
import generateSnakeMove from "./generateSnakeMove";
import generateFood from "./generateFood";

export default function runGame(board, snake, food, dir, setStart) {
	// calculate snake position after move:
	let updatedSnake = generateSnakeMove(snake, dir);
	// check if snake will collide with the walls
	if (
		updatedSnake.head.x >= 10 ||
		updatedSnake.head.x < 0 ||
		updatedSnake.head.y >= 10 ||
		updatedSnake.head.y < 0
	) {
		console.log("You lose... Snake collided with the wall...");
		setStart(false);
		return {
			board: board,
			snake: snake,
			food: food,
		};
	}
	// check if snake would eat itself
	updatedSnake.body.forEach((bodyCell) => {
		if (
			updatedSnake.head.x === bodyCell.x &&
			updatedSnake.head.y === bodyCell.y
		) {
			console.log("You lose... Snake ate itself...");
			setStart(false);
			return {
				board: board,
				snake: snake,
				food: food,
			};
		}
	});
	// check if a food will be eaten
	if (updatedSnake.head.x === food.x && updatedSnake.head.y === food.y) {
		//updatedSnake.body.push(food);
		updatedSnake = generateSnakeMove(updatedSnake, dir, food);
		food = generateFood(updatedSnake);
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
	return {
		board: updatedBoard,
		snake: updatedSnake,
		food: food,
	};
}
