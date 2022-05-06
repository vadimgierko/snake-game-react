import generateInitSnake from "./generateInitSnake";
import generateFood from "./generateFood";
import generateInitBoard from "./generateInitBoard";

export default function generateInitState() {
	const initSnake = generateInitSnake();
	const initFood = generateFood(initSnake, 10);
	const initBoard = generateInitBoard(initSnake, initFood, 10);
	const initState = {
		board: initBoard,
		snake: initSnake,
		food: initFood,
		eatenFood: null,
		dir: "ArrowRight",
		prevDir: null,
		start: false,
		pause: false,
		end: false,
	};
	return initState;
}
