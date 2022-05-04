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
	const [eatenFood, setEatenFood] = useState(null);
	const [dir, setDir] = useState("ArrowRight");
	const [start, setStart] = useState(false);

	const makeMove = useCallback(() => {
		// generate next snake move
		const updatedState = runGame(snake, food, eatenFood, dir, setStart);
		const updatedBoard = updatedState.board;
		const updatedSnake = updatedState.snake;
		const updatedFood = updatedState.food;
		const updatedEatenFood = updatedState.eatenFood;
		// update the board with the new move
		setBoard(updatedBoard);
		setSnake(updatedSnake);
		setFood(updatedFood);
		setEatenFood(updatedEatenFood);
	}, [snake, food, eatenFood, dir]);

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
			const initSnake = generateInitSnake();
			const initFood = generateFood(initSnake, 10);
			const initBoard = generateInitBoard(initSnake, initFood, 10);
			setSnake(initSnake);
			setFood(initFood);
			setBoard(initBoard);
		}
	}, [board]);

	useEffect(() => {
		let timer;
		if (start) {
			// we set timer to update a board every 1/2 second
			timer = setTimeout(makeMove, 250);
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
				<hr />
			</header>
			<main>
				<Screen board={board} />
				<br />
				<button onClick={() => (start ? setStart(false) : setStart(true))}>
					{start ? "pause" : "start"}
				</button>
			</main>
			<br />
			<hr />
			<footer>
				<p>
					created by{" "}
					<a
						href="https://github.com/vadimgierko"
						target="_blank"
						rel="noreferrer"
					>
						Vadim Gierko
					</a>{" "}
					| 2022
				</p>
				<p>
					<a
						href="https://github.com/vadimgierko/snake-game-react"
						target="_blank"
						rel="noreferrer"
					>
						source code on GitHub
					</a>{" "}
					|{" "}
					<a href="" target="_blank" rel="noreferrer">
						CodeSandbox demo
					</a>
				</p>
				<p>
					The game was written in React entirely by me for entertainment and
					learning purposes. I have not used any tutorial to be able to test
					myself in writing logic & handle timer & event listeners.
				</p>
			</footer>
		</div>
	);
}
