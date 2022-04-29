import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Screen from "./components/Screen";
import generateInitBoard from "./logic/generateInitBoard";
import game from "./logic/game";

export default function App() {
	const [board, setBoard] = useState();
	const [dir, setDir] = useState("right"); // direction of the move ("left", "up", "down")
	const [start, setStart] = useState(true); // is game running (bool)

	useEffect(() => {
		if (!board || (board && !board.length)) {
			const initBoard = generateInitBoard(10);
			console.log("generated init board:", initBoard);
			setBoard(initBoard);
		}
		console.log("board:", board);
	}, [board]);

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
