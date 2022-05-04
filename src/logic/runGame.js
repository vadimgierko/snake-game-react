import generateEmptyBoard from "./generateEmptyBoard";
import generateSnakeMove from "./generateSnakeMove";
import generateFood from "./generateFood";

export default function runGame(snake, food, eatenFood, dir, setStart) {
	// calculate snake position after move:
	let updatedEatenFood = eatenFood;
	let updatedSnake = generateSnakeMove(snake, dir, eatenFood);
	// check if snake will collide with the walls
	if (
		updatedSnake.head.x >= 10 ||
		updatedSnake.head.x < 0 ||
		updatedSnake.head.y >= 10 ||
		updatedSnake.head.y < 0
	) {
		console.log(
			"You lose... Snake collided with the wall... Refresh the browser to play again!"
		);
		setStart(false);
		alert(
			"You lose... Snake collided with the wall... Refresh the browser to play again!"
		);
		return;
	}
	// check if snake would eat itself
	updatedSnake.body.forEach((bodyCell) => {
		if (
			updatedSnake.head.x === bodyCell.x &&
			updatedSnake.head.y === bodyCell.y
		) {
			console.log(
				"You lose... Snake ate itself... Refresh the browser to play again!"
			);
			setStart(false);
			alert(
				"You lose... Snake ate itself... Refresh the browser to play again!"
			);
			return;
		}
	});
	// check if a food will be eaten
	if (updatedSnake.head.x === food.x && updatedSnake.head.y === food.y) {
		updatedEatenFood = food;
		food = generateFood(updatedSnake);
	} else {
		updatedEatenFood = null;
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
		eatenFood: updatedEatenFood,
	};
}
