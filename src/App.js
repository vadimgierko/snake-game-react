import "./App.css";
import { useEffect, useState } from "react";
import Screen from "./components/Screen";
import generateInitBoard from "./logic/generateInitBoard";
import runGame from "./logic/runGame";

export default function App() {
	const [board, setBoard] = useState();
	const [snake, setSnake] = useState();
	const [food, setFood] = useState();
	const [dir, setDir] = useState("right"); // direction of the move ("left", "up", "down")
	const [start, setStart] = useState(false); // is game running (bool)

	useEffect(() => {
		if (!board || (board && !board.length)) {
			const initState = generateInitBoard(10);
			//console.log("generated init board:", initBoard);
			setBoard(initState.board);
			setSnake(initState.snake);
			setFood(initState.food);
		} else {
			// const timer = setTimeout(() => {
			// 	const updates = runGame(board, snake, food, dir);
			// 	setBoard(updates.board);
			// 	setSnake(updates.snake);
			// 	setFood(updates.food);
			// }, 1000);
			// return () => clearTimeout(timer);
		}
		//console.log("is game started? =>", start);
	}, [board, snake, food, dir]);

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		const updates = runGame(board, snake, food, dir);
	// 		setBoard(updates.board);
	// 		setSnake(updates.snake);
	// 		setFood(updates.food);
	// 	}, 1000);
	// 	return () => clearTimeout(timer);
	// }, []);

	return (
		<div className="App">
			<header>
				<h1>Snake Game</h1>
				<p>the app is in developing process... Don't use it for a moment ;-)</p>
				<hr />
			</header>
			<main>
				<Screen board={board} />
			</main>
		</div>
	);
}
