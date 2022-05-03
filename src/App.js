import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Screen from "./components/Screen";
import generateInitBoard from "./logic/generateInitBoard";
import runGame from "./logic/runGame";
import generateFood from "./logic/generateFood";
import generateInitSnake from "./logic/generateInitSnake";

const KEYS = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];

export default function App() {
	const [board, setBoard] = useState();
	const [snake, setSnake] = useState();
	const [food, setFood] = useState();
	const [dir, setDir] = useState("ArrowRight");
	const [start, setStart] = useState(false);

	const makeMove = useCallback(() => {
		// generate next snake move
		const updatedState = runGame(board, snake, food, dir, setStart);
		const updatedBoard = updatedState.board;
		const updatedSnake = updatedState.snake;
		const updatedFood = updatedState.food;
		// update the board with the new move
		setBoard(updatedBoard);
		setSnake(updatedSnake);
		setFood(updatedFood);
	}, [board, snake, food, dir]);

	const handleKeyDown = useCallback(
		(e) => {
			const key = e.code;
			if (key === "Space") {
				start ? setStart(false) : setStart(true);
			} else {
				if (KEYS.includes(key)) {
					if (
						(key === "ArrowRight" && dir === "ArrowLeft") ||
						(key === "ArrowLeft" && dir === "ArrowRight") ||
						(key === "ArrowDown" && dir === "ArrowUp") ||
						(key === "ArrowUp" && dir === "ArrowDown")
					) {
						// do nothing => do not change dir && prevDir
					} else {
						setDir(key);
					}
				}
			}
		},
		[setDir, start, dir]
	);

	useEffect(() => {
		if (!board || (board && !board.length)) {
			const initBoard = generateInitBoard(10);
			const initSnake = generateInitSnake();
			const initFood = generateFood(initSnake, 10);
			setSnake(initSnake);
			setFood(initFood);
			setBoard(initBoard);
		}
	}, [board]);

	useEffect(() => {
		let timer;
		if (start) {
			// we set timer to update a board every 1/2 second
			timer = setTimeout(makeMove, 500);
			return () => clearTimeout(timer);
		} else {
			return () => clearTimeout(timer);
		}
	}, [makeMove, start]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		//cleanup this component
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div className="App">
			<header>
				<h1>Snake Game</h1>
				<p>the app is in developing process... Don't use it for a moment ;-)</p>
				<hr />
			</header>
			<main>
				<Screen board={board} />
				<br />
				<button onClick={() => (start ? setStart(false) : setStart(true))}>
					{start ? "pause" : "start"}
				</button>
			</main>
		</div>
	);
}
