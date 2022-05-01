import "./App.css";
import { useEffect, useState } from "react";
import Screen from "./components/Screen";
import generateInitBoard from "./logic/generateInitBoard";
import runGame from "./logic/runGame";

export default function App() {
	const [board, setBoard] = useState();
	const [dir, setDir] = useState("ArrowRight");

	useEffect(() => {
		if (!board || (board && !board.length)) {
			const initBoard = generateInitBoard(10);
			setBoard(initBoard);
		}
	}, [board, dir]);

	useEffect(() => {
		if (board) {
			// we set timer to update a board every second
			const timer = setTimeout(() => {
				// generate next snake move
				const updatedBoard = runGame(board, dir);
				// update the board with the new move
				setBoard(updatedBoard);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [board]);

	useEffect(() => {
		const handleKeyDown = window.addEventListener("keydown", (e) => {
			const key = e.code;
			setDir(key);
		});
		//cleanup this component
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

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
